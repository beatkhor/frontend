import {Component, Inject, Input, LOCALE_ID, OnInit} from '@angular/core'

import {UtilsService} from '@workspace/services/utils.service'
import {PostService} from '@workspace/services/post.service'

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
    private postService: PostService,
    @Inject(LOCALE_ID) public localeId: string
  ) {}

  ngOnInit(): void {
    this.alt = 'alt'
    this.artist = UtilsService.getArtistName(this.post)
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
