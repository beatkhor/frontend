import {
  Input,
  Component,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core'
import {Subscription, interval} from 'rxjs'

import {UtilsService} from '@workspace/services/utils.service'

@Component({
  selector: 'bk-audio-player',
  templateUrl: './audio-player.component.html',
})
export class AudioPlayerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('player') player!: ElementRef<HTMLAudioElement>
  subscription = new Subscription()
  interval$ = interval(1000)
  timeStamp = '00:00'
  @Input() src = ''

  sliderMax = 100
  playing = false
  ready = false
  progress = 0
  step = 0.001

  ngAfterViewInit(): void {
    this.player.nativeElement.ontimeupdate = this.onCurrentTimeChange.bind(this)
    this.player.nativeElement.addEventListener('canplay', this.onAudioReady.bind(this))
  }

  onToggle(): void {
    this.playing = !this.playing

    if (this.playing) {
      this.player.nativeElement.play()
      this.subscription = this.interval$.subscribe(() => {
        this.timeStamp = UtilsService.secondsToMinutesAndSeconds(
          Math.floor(this.player.nativeElement.currentTime)
        )
      })
    } else {
      this.player.nativeElement.pause()
      this.subscription.unsubscribe()
    }
  }

  private onAudioReady(): void {
    this.ready = true
  }

  private onCurrentTimeChange(): void {
    this.progress =
      (this.player.nativeElement.currentTime / this.player.nativeElement.duration) * 100
  }

  onDragEnd(event: any): void {
    const time = this.player.nativeElement.duration * (event.value / 100)
    this.player.nativeElement.currentTime = time
    this.timeStamp = UtilsService.secondsToMinutesAndSeconds(Math.floor(time))
  }

  onStop() {
    this.playing = false
    this.timeStamp = '00:00'
    this.player.nativeElement.pause()
    this.player.nativeElement.currentTime = 0
    this.subscription.unsubscribe()
  }

  ngOnDestroy(): void {
    if (!this.subscription.closed) {
      this.subscription.unsubscribe()
    }
  }
}
