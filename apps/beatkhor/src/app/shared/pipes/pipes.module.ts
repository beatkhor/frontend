import {NgModule} from '@angular/core'

import {DownloadLinkPipe} from './download-link.pipe'
import {PostLinkPipe} from './post-link.pipe'
import {UserNamePipe} from './user-name.pipe'

@NgModule({
  declarations: [PostLinkPipe, UserNamePipe, DownloadLinkPipe],
  exports: [PostLinkPipe, UserNamePipe, DownloadLinkPipe],
})
export class PipesModule {}
