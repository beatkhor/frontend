import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {UploadRoutingModule} from './upload-routing.module'
import {SharedModule} from '../shared/shared.module'
import {UploadComponent} from './upload.component'

@NgModule({
  declarations: [UploadComponent],
  imports: [CommonModule, SharedModule, UploadRoutingModule],
})
export class UploadModule {}
