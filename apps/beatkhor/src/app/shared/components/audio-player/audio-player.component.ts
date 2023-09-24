import {Component} from '@angular/core'

@Component({
  selector: 'bk-audio-player',
  templateUrl: './audio-player.component.html',
})
export class AudioPlayerComponent {
  playing = false
  progress = 0

  onToggle() {
    this.playing = !this.progress
  }
}
