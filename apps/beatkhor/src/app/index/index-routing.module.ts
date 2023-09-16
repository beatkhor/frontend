import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'

import {IndexComponent} from './index.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: IndexComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
