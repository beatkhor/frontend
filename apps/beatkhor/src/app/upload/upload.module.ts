import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {UploadRoutingModule} from './upload-routing.module'
import {SharedModule} from '../shared/shared.module'

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, UploadRoutingModule],
})
export class UploadModule {}
