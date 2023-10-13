import {Component, Inject, Input, LOCALE_ID, OnInit} from '@angular/core'

import {UtilsService} from '@workspace/services/utils.service'
import {SEOService} from '@workspace/services/seo.service'
import {Picture, Post, Audio} from '@workspace/models'

@Component({
  selector: 'bk-track-post',
  templateUrl: './track-post.component.html',
})
export class PostComponent implements OnInit {
  @Input() post!: Post
  artist = ''
  alt = ''

  constructor(
    private seoService: SEOService,
    @Inject(LOCALE_ID) public localeId: string
  ) {}

  ngOnInit(): void {
    this.artist = UtilsService.getPostArtistName(this.post)
    this.alt = this.seoService.buildTrackImageAlt(this.artist, this.post.post_meta.title)
  }

  get picture(): Picture | undefined {
    return this.post?.pictures[0]
  }

  get audio(): Audio | undefined {
    return this.post?.audios[0]
  }

  get title(): string {
    return this.post.post_meta.title
  }
}
