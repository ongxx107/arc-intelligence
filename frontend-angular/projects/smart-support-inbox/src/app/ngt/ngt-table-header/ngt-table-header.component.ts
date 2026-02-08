import { booleanAttribute, ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, model, OnDestroy, OnInit, Signal } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NgtButtonComponent } from '../ngt-button';

export type NgtTableHeaderColumn = {
  key: string;
  label: Signal<string>;
  // minWidth allows the applying developer to specify a suggested minimum width for a column. The column itself cannot be resized smaller than the minWidth directly. For now, if one or more columns are resized to a very large width, the remaining columns can be shrunk by css so the table does not overflow its container.
  minWidth: number;
  sortable: boolean;
  mandatory: boolean;
};

const menuMoreWidth = 72;

/**
 * Table header component for managing columns, sorting, and resizing.
 *
 * ### Inputs:
 * @param {NgtTableHeaderColumn[]} availableColumns List of all available columns (required).
 * @param {string} resizeMode Resize mode for columns (default: 'scale-left-column').
 * @param {number} resizerZIndex Z-index for the column resizer (default: 100).
 * @param {boolean} fitParentWidth Whether to fit columns to parent width (default: false).
 *
 * ### Model:
 * @param {string[]} visibleColumns List of currently visible columns (required).
 * @param {Record<string, number>} columnWidths Widths for each column (required).
 * @param {string | null} sortColumn Currently sorted column (required).
 * @param {"asc" | "desc"} sortDirection Current sort direction (required).
 *
 * ### Internal:
 * @param {ElementRef} elemRef Reference to the host element.
 *
 * @example <ngt-table-header [availableColumns]="columns" [visibleColumns]="visible" [columnWidths]="widths"></ngt-table-header>
 */
@Component({
  selector: 'ngt-table-header',
  imports: [
    CdkDrag,
    CdkDropList,
    NgtButtonComponent,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  templateUrl: './ngt-table-header.component.html',
  styleUrl: './ngt-table-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgtTableHeaderComponent implements OnInit, OnDestroy {

  elemRef = inject(ElementRef);

  availableColumns = input.required<NgtTableHeaderColumn[]>();
  visibleColumns = model.required<string[]>();
  columnWidths = model.required<Record<string, number>>();
  sortColumn = model.required<string|null>();
  sortDirection = model.required<"asc"|"desc">();

  resizeMode = input<'scale-left-column'|'move-resizer'>('scale-left-column');
  resizerZIndex = input<number>(100);

  fitParentWidth = input(false, { transform: booleanAttribute });

  invisibleColumns = computed(() => {
    const unselected = <string[]>[];
    this.availableColumns().forEach(column => {
      if (!this.visibleColumns().includes(column.key)) {
        unselected.push(column.key);
      }
    });
    return unselected;
  });

  columnMap = computed(() => {
    const map = <Record<string, NgtTableHeaderColumn>>{};
    this.availableColumns().forEach(column => {
      map[column.key] = column;
    });
    return map;
  });

  sortableColumns = computed(() => {
    const columns = new Set<string>();
    this.availableColumns().forEach(column => {
      if (column.sortable) {
        columns.add(column.key);
      }
    });
    return columns;
  });

  minColumnWidths = computed(() => {
    const map = <Record<string, number>>{};
    this.availableColumns().forEach(column => {
      map[column.key] = column.minWidth;
    });
    return map;
  });

  displayedColumnWidths = computed(() => {
    const map = <Record<string, number>>{};
    this.visibleColumns().forEach(key => {
      map[key] = Math.max(this.minColumnWidths()[key], this.columnWidths()[key] || 0);
    });
    return map;
  });

  resizedColumn: string|null = null;
  startSize = 0;
  neighbourColumnStartSize = 0;
  mousePosition: {x: number, y: number}|null = null;
  startMousePosition: {x: number, y: number}|null = null;

  interval: any = null;

  constructor() {
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  ngOnInit(): void {
    this.columnWidths.set(this.displayedColumnWidths());
    this.visibleColumns.set(Array.from(new Set([...this.availableColumns().filter(c => c.mandatory).map(c => c.key), ...this.visibleColumns()])));

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);

    this.interval = setInterval(() => {
      if (this.fitParentWidth() && !this.resizedColumn) {
        this.fitColumnsToParentWidth();
      }
    }, 200);
  }

  ngOnDestroy(): void {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  setColumnEnabled(key: string, enabled: boolean) {
    if (enabled) {
      if (!this.visibleColumns().includes(key)) {
        this.visibleColumns.update(columns => [...columns, key]);
        this.columnWidths.update(widths => {
          widths[key] = this.minColumnWidths()[key];
          if (this.fitParentWidth()) {
            this.fitColumnsToParentWidth();
          }
          return {...widths};
        });
      }
    } else {
      this.visibleColumns.update(columns => columns.filter(c => c !== key));
      if (this.fitParentWidth()) {
        this.fitColumnsToParentWidth();
      }
    }
  }

  onHeaderDropped(event: CdkDragDrop<string[]>) {
    if (event.previousIndex < this.visibleColumns().length && event.currentIndex < this.visibleColumns().length) {
      this.visibleColumns.update(columns => {
        moveItemInArray(columns, event.previousIndex, event.currentIndex);
        return [...columns];
      });
    }
  }

  onSortButtonClicked(columnKey: string) {
    if (this.sortColumn() === columnKey) {
      if (this.sortDirection() === 'asc') {
        this.sortDirection.set('desc');
      } else {
        this.sortColumn.set(null);
        this.sortDirection.set('asc');
      }
    } else {
      this.sortDirection.set('asc');
      this.sortColumn.set(columnKey);
    }
  }

  onResizeBegin(column: string) {
    this.resizedColumn = column;
    this.startSize = this.displayedColumnWidths()[column];
    const neighbourColumn = this.getNeighbourColumn(column);
    if (neighbourColumn !== null) {
      this.neighbourColumnStartSize = this.displayedColumnWidths()[neighbourColumn];
    }
    this.startMousePosition = this.mousePosition;
  }

  onMouseMove(event: MouseEvent) {
    this.mousePosition = {x: event.x, y: event.y};
    if (this.resizedColumn !== null && this.startMousePosition) {
      const neighbourColumn = this.getNeighbourColumn(this.resizedColumn);
      this.columnWidths.update(sizes => {
        const newColumnWidth = this.startSize + (this.mousePosition!.x - this.startMousePosition!.x);
        const delta = Math.max(newColumnWidth, this.minColumnWidths()[this.resizedColumn!]) - this.startSize;
        sizes[this.resizedColumn!] = Math.max(this.minColumnWidths()[this.resizedColumn!], newColumnWidth);
        if (this.resizeMode() === 'move-resizer' && neighbourColumn) {
          sizes[neighbourColumn] = this.neighbourColumnStartSize - delta;
        }
        if (this.fitParentWidth()) {
          this.fitColumnsToParentWidth([this.resizedColumn!, this.resizeMode() === 'move-resizer' ? neighbourColumn : null].filter(col => col != null));
        }
        return {...sizes};
      });
    }
  }

  onMouseUp() {
    this.resizedColumn = null;
  }

  getNeighbourColumn(key: string) {
    const index = this.visibleColumns().findIndex(column => column === key);
    if (index >= 0 && index < this.visibleColumns().length - 1) {
      return this.visibleColumns()[index + 1];
    }
    return null;
  }

  resetColumnWidth(key: string|null) {
    this.columnWidths.update(columns => {
      if (key) {
        columns[key] = this.minColumnWidths()[key];
        return {...columns};
      }
      return {...this.minColumnWidths()};
    });
  }

  // the lockedColumns are locked for this function, meaning their width can't be changed by this function.
  fitColumnsToParentWidth(lockedColumns?: string[]) {
    const parent = (<HTMLElement>this.elemRef.nativeElement).parentElement;
    if (!parent) return;

    const width = parent.getBoundingClientRect().width - menuMoreWidth;
    const lockedColumnsWidth = lockedColumns ? lockedColumns.filter(col => this.visibleColumns().includes(col)).map(col => this.columnWidths()[col]).reduce((prev, curr) => prev + curr, 0) : 0;
    let tableWidth = this.visibleColumns().map(column => this.columnWidths()[column]).reduce((prev, curr) => prev + curr, 0);
    if (tableWidth === 0) {
      this.visibleColumns().forEach(column => this.resetColumnWidth(column));
      tableWidth = this.visibleColumns().map(column => this.columnWidths()[column]).reduce((prev, curr) => prev + curr, 0);
    }
    if (tableWidth === 0) return;

    const factor = (width - lockedColumnsWidth) / (tableWidth - lockedColumnsWidth);
    if (factor === 0) return;

    this.columnWidths.update(widths => {
      let changed = false;
      this.visibleColumns().forEach(column => {
        if ((!lockedColumns || !lockedColumns.includes(column)) && widths[column] !== 0) {
          widths[column] = Math.max(this.minColumnWidths()[column], Math.floor(widths[column] * factor));
          changed = true;
        }
      });
      if (changed) {
        return {...widths};
      }
      return widths;
    });
  }
}
