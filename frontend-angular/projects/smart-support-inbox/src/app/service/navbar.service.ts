import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class NavbarService {

  expanded = signal(true);

}
