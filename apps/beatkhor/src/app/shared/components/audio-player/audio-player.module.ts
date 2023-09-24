import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {NgModule} from '@angular/core'

import {MatButtonModule} from '@angular/material/button'
import {MatSliderModule} from '@angular/material/slider'
import {MatIconModule} from '@angular/material/icon'

import {AudioPlayerComponent} from './audio-player.component'

@NgModule({
  declarations: [AudioPlayerComponent],
  imports: [CommonModule, MatSliderModule, MatButtonModule, MatIconModule, FormsModule],
  exports: [AudioPlayerComponent],
})
export class AudioPlayerModule {}
