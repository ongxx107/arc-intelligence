import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgtButtonComponent, NgtInputFieldComponent } from 'ng-base-components';
import { Ticket } from '../ticket.data';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'ssi-ticket-sidepanel',
  standalone: true,
  imports: [MatIconModule, NgtButtonComponent, NgtInputFieldComponent],
  templateUrl: './ticket-sidepanel.component.html',
  styleUrl: './ticket-sidepanel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketSidepanelComponent {
  private ticketService = inject(TicketService);

  ticket = input.required<Ticket>();
  close = output<void>();
  updated = output<Ticket>();

  submitting = signal<boolean>(false);
  error = signal<string | null>(null);
  comment = signal<string>('');

  constructor() {
    // Keep the comment field in sync when selecting a different ticket.
    effect(() => {
      const t = this.ticket();
      this.comment.set(t.feedback_comment ?? '');
    });
  }

  value(v: unknown) {
    return (v === undefined || v === null || v === '') ? '-' : String(v);
  }

  accept() {
    this.submit(true);
  }

  reject() {
    this.submit(false);
  }

  private submit(accepted: boolean) {
    const t = this.ticket();
    this.submitting.set(true);
    this.error.set(null);

    this.ticketService.submitFeedback(t.id, { accepted, comment: this.comment() }).subscribe({
      next: (updated) => {
        this.submitting.set(false);
        this.updated.emit(updated);
      },
      error: (e) => {
        this.submitting.set(false);
        this.error.set(e?.message ?? 'Failed to submit feedback');
      }
    });
  }
}
