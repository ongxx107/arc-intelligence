import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgtToolbarComponent, NgtTableHeaderComponent, NgtTableHeaderColumn, NgtTableRowComponent, NgtTableCellComponent } from 'ng-base-components';
import { TicketService } from './ticket.service';
import { Ticket, TicketCategory, TicketListItem, TicketPriority } from './ticket.data';
import { TicketSidepanelComponent } from './ticket-sidepanel/ticket-sidepanel.component';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';

@Component({
  selector: 'ssi-support-inbox',
  standalone: true,
  imports: [
    NgtToolbarComponent,
    NgtTableHeaderComponent,
    NgtTableRowComponent,
    NgtTableCellComponent,
    MatProgressBarModule,
    TicketSidepanelComponent,
    TicketCreateComponent,
  ],
  templateUrl: './support-inbox.component.html',
  styleUrl: './support-inbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportInboxComponent {
  private ticketService = inject(TicketService);

  // List state
  tickets = signal<TicketListItem[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Filters
  selectedFilters = signal<string[]>([]);

  // Sidepanel state
  selectedTicket = signal<Ticket | null>(null);
  showSidepanel = computed(() => !!this.selectedTicket() && !this.isCreating());

  // Create state
  isCreating = signal<boolean>(false);

  // Search term
  searchTerm = signal<string>('');

  onSearch(value: string) {
    this.searchTerm.set((value ?? '').trim());
    this.loadTickets();
  }


  // Filter groups
  private readonly categories: TicketCategory[] = ['Billing', 'Bug', 'Feature', 'Account', 'Other'];
  private readonly priorities: TicketPriority[] = ['Low', 'Medium', 'High'];

  filterOptions = signal([
    {
      name: 'Category',
      options: this.categories.map((c) => ({ key: c, label: c })),
    },
    {
      name: 'Priority',
      options: this.priorities.map((p) => ({ key: p, label: p })),
    },
  ]);

  // Derive query params from selected filters
  private activeCategories = computed<TicketCategory[]>(() => {
    const picked = this.selectedFilters();
    return this.categories.filter((c) => picked.includes(c));
  });

  private activePriorities = computed<TicketPriority[]>(() => {
    const picked = this.selectedFilters();
    return this.priorities.filter((p) => picked.includes(p));
  });

  tableColumns: NgtTableHeaderColumn[] = [
    { key: 'subject', label: signal('Subject'), minWidth: 360, sortable: false, mandatory: true },
    { key: 'category', label: signal('Category'), minWidth: 140, sortable: false, mandatory: true },
    { key: 'priority', label: signal('Priority'), minWidth: 120, sortable: false, mandatory: true },
    { key: 'created_at', label: signal('Created'), minWidth: 180, sortable: false, mandatory: true },
  ];

  columnWidths = signal<Record<string, number>>({
    subject: 360,
    category: 140,
    priority: 120,
    created_at: 180,
  });

  visibleColumns = signal(this.tableColumns.filter((c) => c.mandatory).map((c) => c.key));

  constructor() {
    // Reload list when filters change
    effect(() => {
      this.loadTickets();
    });
  }

  private loadTickets() {
    this.loading.set(true);
    this.error.set(null);

    const categories = this.activeCategories();
    const priorities = this.activePriorities();
    const q = this.searchTerm();

    const obs = q
      ? this.ticketService.searchTickets(q, { categories, priorities }, 3)
      : this.ticketService.listTickets({ categories, priorities });

    obs.subscribe({
      next: (items) => {
        this.tickets.set(items);
        this.loading.set(false);
      },
      error: (e) => {
        this.error.set(e?.message ?? 'Failed to load tickets');
        this.loading.set(false);
      },
    });
  }

  async onRowClick(item: TicketListItem) {
    this.loading.set(true);
    this.error.set(null);
    this.ticketService.getTicket(item.id).subscribe({
      next: (t) => {
        this.selectedTicket.set(t);
        this.loading.set(false);
      },
      error: (e) => {
        this.error.set(e?.message ?? 'Failed to load ticket');
        this.loading.set(false);
      },
    });
  }

  closeSidepanel() {
    this.selectedTicket.set(null);
  }

  openCreate() {
    this.isCreating.set(true);
  }

  closeCreate() {
    this.isCreating.set(false);
  }

  onTicketCreated(ticket: Ticket) {
    this.isCreating.set(false);
    // Refresh list then open sidepanel for the new ticket
    this.loadTickets();
    this.selectedTicket.set(ticket);
  }

  onFeedbackUpdated(ticket: Ticket) {
    // Update selection
    this.selectedTicket.set(ticket);
    // Update list item fields if needed
    this.tickets.update((arr) =>
      arr.map((x) =>
        x.id === ticket.id
          ? { id: ticket.id, subject: ticket.subject, category: ticket.category, priority: ticket.priority, created_at: ticket.created_at }
          : x
      )
    );
  }

  formatDate(iso: string): string {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  }
}
