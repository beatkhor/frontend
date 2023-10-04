import {Component} from '@angular/core'

import {UtilsService} from '../../services/utils.service'

@Component({
  selector: 'bk-wrapper',
  template: `
    <bk-navbar (menu)="toggle()"></bk-navbar>
    <mat-sidenav-container
      class="!absolute top-0 bottom-0 left-0 right-0 overscroll-contain !bg-neutral-900"
    >
      <mat-sidenav
        class="w-56 pt-14 !bg-neutral-900"
        mode="over"
        [autoFocus]="false"
        [(opened)]="isSidenavOpen"
      >
        <mat-nav-list class="wrapper-nav-list">
          <a mat-list-item routerLink="/" (click)="toggle()">
            <mat-icon class="text-neutral-400 mr-4">home</mat-icon>
            <span>Beatkhor</span>
          </a>
          <mat-divider></mat-divider>
          <a mat-list-item routerLink="/browse" (click)="toggle()">
            <mat-icon class="text-neutral-400 mr-4">list</mat-icon>
            <span>Browse</span>
          </a>
          <mat-divider></mat-divider>
          <a mat-list-item routerLink="/page/about" (click)="toggle()">
            <mat-icon class="text-neutral-400 mr-4">info</mat-icon>
            <span>About Us</span>
          </a>
          <mat-divider></mat-divider>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <div
          infiniteScroll
          [infiniteScrollDistance]="2"
          [infiniteScrollThrottle]="50"
          [scrollWindow]="false"
          (scrolled)="onScroll()"
          class="custom-wrapper h-full flex flex-col overflow-y-scroll pt-14"
        >
          <div class="flex-grow">
            <router-outlet></router-outlet>
          </div>
          <bk-footer></bk-footer>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
})
export class WrapperComponent {
  isSidenavOpen = false

  toggle(): void {
    this.isSidenavOpen = !this.isSidenavOpen
  }

  onScroll() {
    UtilsService.contentScrollToEnd$.next()
  }
}
