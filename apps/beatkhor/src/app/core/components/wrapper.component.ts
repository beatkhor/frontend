import {Component} from '@angular/core'

@Component({
  selector: 'bk-wrapper',
  template: `<bk-navbar (menu)="onMenu()"></bk-navbar> <router-outlet></router-outlet>`,
})
export class WrapperComponent {
  isSidenavOpen = false

  onMenu(): void {
    this.isSidenavOpen = !this.isSidenavOpen
  }
}
