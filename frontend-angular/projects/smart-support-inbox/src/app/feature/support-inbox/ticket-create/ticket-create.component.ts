import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgtButtonComponent, NgtInputFieldComponent } from 'ng-base-components';
import { Ticket } from '../ticket.data';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'ssi-ticket-create',
  standalone: true,
  imports: [NgtButtonComponent, NgtInputFieldComponent, MatIconModule],
  templateUrl: './ticket-create.component.html',
  styleUrl: './ticket-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketCreateComponent {
  private ticketService = inject(TicketService);

  close = output<void>();
  created = output<Ticket>();

  subject = signal<string>('');
  from_email = signal<string>('');
  message = signal<string>('');

  submitting = signal<boolean>(false);
  error = signal<string | null>(null);

  private emailOk = computed(() => {
    const v = this.from_email().trim();
    if (!v) return false;
    // Basic email check
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  });

  canSubmit = computed(() => {
    return !this.submitting() &&
      this.subject().trim().length > 0 &&
      this.message().trim().length > 0 &&
      this.emailOk();
  });

  create() {
    if (!this.canSubmit()) {
      this.error.set('Please fill subject, valid email, and message.');
      return;
    }

    this.submitting.set(true);
    this.error.set(null);

    this.ticketService.createTicket({
      subject: this.subject().trim(),
      from_email: this.from_email().trim(),
      message: this.message().trim(),
    }).subscribe({
      next: (t) => {
        this.submitting.set(false);
        this.created.emit(t);
      },
      error: (e) => {
        this.submitting.set(false);
        this.error.set(e?.message ?? 'Failed to create ticket');
      }
    });
  }
}
