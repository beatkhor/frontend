import {Component, Inject, Input, LOCALE_ID, OnInit} from '@angular/core'

import {UtilsService} from '../../../../core/services/utils.service'
import {PostService} from '../../../../core/services/post.service'
import {Audio, Picture} from '../../../../core/models/media'
import {Post} from '../../../../core/models/post'

@Component({
  selector: 'bk-post',
  templateUrl: './post.component.html',
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
    this.alt = this.postService.generateFullName(this.post)
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
