import {Component, Input} from '@angular/core'
import {Post} from '../core/models/post'

import {UtilsService} from '../core/services/utils.service'

@Component({
  selector: 'bk-review-post-item',
  template: ` <div class="flex items-center py-6">
    <div class="flex flex-grow flex-col items-stretch">
      <div class="flex justify-between items-end mb-4">
        <div class="flex flex-col">
          <div>{{ post?.post_meta?.title }}</div>
          <div class="text-sm text-neutral-300">
            {{ post?.post_meta?.overridden_artist_name || userFullName }}
          </div>
        </div>

        <div class="flex">
          <button mat-icon-button>
            <mat-icon>thumb_down</mat-icon>
          </button>
          <button mat-icon-button>
            <mat-icon>thumb_up</mat-icon>
          </button>
        </div>
      </div>

      <audio
        class="w-full"
        controls
        preload="none"
        [src]="post.audios?.[0]?.original | downloadLink"
      ></audio>
    </div>
  </div>`,
})
export class ReviewPostItemComponent {
  @Input() post!: Post

  constructor(private utilsService: UtilsService) {}

  get userFullName() {
    return this.utilsService.getFullName(this.post?.user)
  }
}
