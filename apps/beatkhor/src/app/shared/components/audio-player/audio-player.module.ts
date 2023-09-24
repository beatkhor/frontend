import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {AudioPlayerComponent} from './audio-player.component'

@NgModule({
  declarations: [AudioPlayerComponent],
  imports: [CommonModule],
  exports: [AudioPlayerComponent],
})
export class AudioPlayerModule {}
