export type TicketCategory = 'Billing' | 'Bug' | 'Feature' | 'Account' | 'Other';
export type TicketPriority = 'Low' | 'Medium' | 'High';

export interface TicketListItem {
  id: number;
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  created_at: string; // ISO timestamp
}

export interface Ticket extends TicketListItem {
  from_email: string;
  message: string;
  summary: string;
  suggested_reply: string;
  feedback_accepted: boolean | null;
  feedback_comment: string;
  feedback_at: string | null;
}

export interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  message?: string;
}
