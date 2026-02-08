import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiEnvelope, Ticket, TicketListItem, TicketCategory, TicketPriority } from './ticket.data';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.baseUrl}/tickets`;

  listTickets(filters?: { categories?: TicketCategory[]; priorities?: TicketPriority[] }): Observable<TicketListItem[]> {
    let params = new HttpParams();
    // if (filters?.category) params = params.set('category', filters.category);
    // if (filters?.priority) params = params.set('priority', filters.priority);
    for (const c of filters?.categories ?? []) params = params.append('category', c);
    for (const p of filters?.priorities ?? []) params = params.append('priority', p);

    return this.http.get<ApiEnvelope<TicketListItem[]>>(this.baseUrl + '/', { params }).pipe(
      map((res) => {
        if (!res?.success) throw new Error(res?.message || 'Failed to load tickets');
        return res.data ?? [];
      }),
      catchError((e) => {
        const msg = this.humanError(e);
        return throwError(() => new Error(msg));
      })
    );
  }

  getTicket(id: number): Observable<Ticket> {
    return this.http.get<ApiEnvelope<Ticket>>(`${this.baseUrl}/${id}/`).pipe(
      map((res) => {
        if (!res?.success) throw new Error(res?.message || 'Failed to load ticket');
        if (!res.data) throw new Error('Ticket payload missing');
        return res.data;
      }),
      catchError((e) => throwError(() => new Error(this.humanError(e))))
    );
  }

  createTicket(payload: { subject: string; from_email: string; message: string }): Observable<Ticket> {
    return this.http.post<ApiEnvelope<Ticket>>(this.baseUrl + '/', payload).pipe(
      map((res) => {
        if (!res?.success) throw new Error(res?.message || 'Failed to create ticket');
        if (!res.data) throw new Error('Ticket payload missing');
        return res.data;
      }),
      catchError((e) => throwError(() => new Error(this.humanError(e))))
    );
  }

  submitFeedback(id: number, payload: { accepted: boolean; comment?: string }): Observable<Ticket> {
    return this.http.post<ApiEnvelope<Ticket>>(`${this.baseUrl}/${id}/feedback/`, payload).pipe(
      map((res) => {
        if (!res?.success) throw new Error(res?.message || 'Failed to submit feedback');
        if (!res.data) throw new Error('Ticket payload missing');
        return res.data;
      }),
      catchError((e) => throwError(() => new Error(this.humanError(e))))
    );
  }

  // searchTickets(params: { q: string; categories?: TicketCategory[]; priorities?: TicketPriority[]; top_k?: number }): Observable<TicketListItem[]> {
  //   let httpParams = new HttpParams().set('q', params.q);
  //   for (const c of params?.categories ?? []) httpParams.set('category', c);
  //   for (const p of params?.priorities ?? []) httpParams.set('priority', p);
  //   if (params.top_k) httpParams = httpParams.set('top_k', String(params.top_k));

  //   return this.http.get<ApiEnvelope<TicketListItem[]>>(this.baseUrl + '/search/', { params: httpParams }).pipe(
  //     map((res) => {
  //       if (!res?.success) throw new Error(res?.message || 'Failed to search tickets');
  //       return res.data ?? [];
  //     }),
  //     catchError((e) => throwError(() => new Error(this.humanError(e))))
  //   );
  // }

  searchTickets(
    q: string,
    filters?: { categories?: TicketCategory[]; priorities?: TicketPriority[] },
    topK: number = 50
  ) {
    let params = new HttpParams().set('q', q).set('top_k', String(topK));

    for (const c of filters?.categories ?? []) params = params.append('category', c);
    for (const p of filters?.priorities ?? []) params = params.append('priority', p);

    return this.http.get<ApiEnvelope<TicketListItem[]>>(this.baseUrl + '/search/', { params }).pipe(
      map((res) => res.data ?? [])
    );
  }

  private humanError(e: any): string {
    // HttpErrorResponse shape
    if (e?.error?.message) return String(e.error.message);
    if (e?.message) return String(e.message);
    return 'Unexpected error';
  }
}
