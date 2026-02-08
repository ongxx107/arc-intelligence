import { Directive, ElementRef, inject, input, Renderer2 } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { NgtStatus } from '@corporate/ng-base-components/src/lib/ngt-utilities';

@Directive({
  selector: '[ngtBadge]',
  hostDirectives: [
    {
      directive: MatBadge,
      inputs: [
        'matBadge:ngtBadge',
        'matBadgePosition:badgePosition',
        'matBadgeSize:badgeScale',
        'matBadgeOverlap:badgeOverlap'
      ]
    }
  ]
})
export class NgtBadgeDirective {
  status = input<NgtStatus>("neutral");

  elRef = inject(ElementRef);
  renderer = inject(Renderer2);

  ngAfterViewInit(){
    const badge = this.elRef.nativeElement.getElementsByClassName('mat-badge-content')[0];
    this.renderer.addClass(badge, "ngt-status-"+this.status());
  }
}
