import {Component} from '@angular/core'

@Component({
  selector: 'bk-index',
  template: `<div class="container mx-auto px-5">
    <bk-notice [mode]="'success'" [message]="'This is a success message'"></bk-notice>
  </div>`,
})
export class IndexComponent {}
