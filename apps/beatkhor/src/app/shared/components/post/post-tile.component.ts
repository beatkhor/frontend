import {Component, Input, OnInit} from '@angular/core'

import {UtilsService} from '@workspace/services/utils.service'
import {SEOService} from '@workspace/services/seo.service'
import {Picture, Post} from '@workspace/models'

@Component({
  selector: 'bk-post-tile',
  template: `
    <div
      class="relative rounded flex flex-col items-stretch transition-all duration-100 ease-in hover:bg-neutral-800 p-4"
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

        <div *ngIf="picture" class="absolute inset-y-4 inset-x-4">
          <img
            class="rounded opacity-80"
            width="100%"
            [alt]="alt"
            [src]="picture.default | downloadLink"
          />
        </div>
      </div>

      <div class="pt-4 text-neutral-200">
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

  constructor(private seoService: SEOService) {}

  ngOnInit(): void {
    if (this.post) {
      this.artist = UtilsService.getPostArtistName(this.post)
      this.alt = this.seoService.buildTrackImageAlt(
        this.artist,
        this.post.post_meta.title
      )
    }
  }

  get picture(): Picture | undefined {
    return this.post?.pictures[0]
  }

  get title(): string | undefined {
    return this.post?.post_meta?.title
  }
}
