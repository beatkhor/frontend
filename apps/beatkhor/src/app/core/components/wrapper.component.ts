import {Component} from '@angular/core'

@Component({
  selector: 'bk-wrapper',
  template: `
    <mat-sidenav-container
      class="!absolute top-0 bottom-0 left-0 right-0 overscroll-contain !bg-neutral-900"
    >
      <mat-sidenav
        class="w-56"
        mode="over"
        [autoFocus]="false"
        [(opened)]="isSidenavOpen"
      >
        <mat-nav-list>
          <a mat-list-item routerLink="/" (click)="toggle()">Beatkhor</a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content class="pt-14">
        <bk-navbar (menu)="toggle()"></bk-navbar>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
})
export class WrapperComponent {
  isSidenavOpen = false

  toggle(): void {
    this.isSidenavOpen = !this.isSidenavOpen
  }
}
