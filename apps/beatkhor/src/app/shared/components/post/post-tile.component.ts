import {Component, Input, OnInit} from '@angular/core'

import {PostService} from '../../../core/services/post.service'
import {UtilsService} from '../../../core/services/utils.service'
import {Picture} from '../../../core/models/media'
import {Post} from '../../../core/models/post'

@Component({
  selector: 'bk-post-tile',
  template: `
    <div
      class="relative rounded flex flex-col items-stretch transition-all ease-in hover:grayscale"
    >
      <div>
        <svg
          width="100%"
          viewBox="0 0 1 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="1" height="1" />
        </svg>

        <div *ngIf="picture" class="absolute inset-y-0 inset-x-0">
          <img
            class="rounded opacity-90"
            width="100%"
            [alt]="alt"
            [src]="picture.default | downloadLink"
          />
        </div>
      </div>

      <div class="py-4 text-neutral-200">
        <div [class.opacity-0]="!title">{{ title || 'Loading...' }}</div>
        <div [class.opacity-0]="!artist" class="text-sm text-neutral-400">
          {{ artist || 'Loading...' }}
        </div>
      </div>
    </div>
  `,
})
export class PostTileComponent implements OnInit {
  @Input() post!: Post
  artist = ''
  alt = ''

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    if (this.post) {
      this.alt = this.postService.generateFullName(this.post)
      this.artist = UtilsService.getArtistName(this.post)
    }
  }

  get picture(): Picture | undefined {
    return this.post?.pictures[0]
  }

  get title(): string | undefined {
    return this.post?.post_meta?.title
  }
}
