import {NgModule} from '@angular/core'

import {
  GridHeaderComponent,
  GridHeaderTitleDirective,
  GridHeaderActionsDirective,
} from './grid-header.component'

@NgModule({
  declarations: [
    GridHeaderComponent,
    GridHeaderTitleDirective,
    GridHeaderActionsDirective,
  ],
  exports: [GridHeaderComponent, GridHeaderActionsDirective, GridHeaderTitleDirective],
})
export class GridHeaderModule {}
