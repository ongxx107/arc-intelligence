import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgtBadgeDirective } from './ngt-badge.directive';
import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  imports:[NgtBadgeDirective],
  template: `
    <span>x</span>
    <button ngtBadge="10" ></button>
    <span>x</span>
  `
})
class BadgeDirTestHostComponent {}

describe('NgtBadgeDirective', () => {
  let fixture: ComponentFixture<BadgeDirTestHostComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [BadgeDirTestHostComponent, NgtBadgeDirective],
      providers: [provideExperimentalZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeDirTestHostComponent);
    fixture.detectChanges();
  });

  // Automatically created test by angular schematics - injection causes error https://angular.dev/errors/NG0203
  // it('should create an instance', () => {
  //   const directive = new NgtBadgeDirective();
  //   expect(directive).toBeTruthy();
  // });

  it('should create a test host instance with the directive', () => {
    const des = fixture.debugElement.queryAll(By.directive(NgtBadgeDirective));
    expect(des.length).toBe(1);
  });

  it('does set ngt-badge classes to instance', () => {
    const des = fixture.debugElement.query(By.css('.mat-badge-content'));
    expect(des.nativeElement.classList.contains('ngt-status-neutral')).toBe(true);
  });

});
