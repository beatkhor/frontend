import {Component} from '@angular/core'

@Component({
  selector: 'bk-post-grid',
  template: `<div class="py-4 grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
    <ng-content></ng-content>
  </div>`,
})
export class PostGridComponent {}
