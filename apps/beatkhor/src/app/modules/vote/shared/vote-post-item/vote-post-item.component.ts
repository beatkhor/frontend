import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '@workspace/services/error-handler.service'
import {VoteService} from '@workspace/services/review.service'
import {UtilsService} from '@workspace/services/utils.service'

import {Post, Picture, Audio} from '@workspace/models'
import {SEOService} from '@workspace/services/seo.service'

@Component({
  selector: 'bk-vote-post-item',
  templateUrl: './vote-post-item.component.html',
})
export class VotePostItemComponent implements OnInit {
  @Output() voteChange = new EventEmitter<number>()
  @Input() vote: number | undefined
  @Input() post!: Post
  loading = false
  artist = ''
  alt = ''

  constructor(
    private seoService: SEOService,
    private voteService: VoteService,
    private errHandler: CustomErrorHandler
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

  get isUpVote() {
    return this.vote === 1
  }

  get isDownVote() {
    return this.vote === 0
  }

  async onUpVote(): Promise<void> {
    if (!this.post.id) {
      return
    }

    if (this.isUpVote) {
      await lastValueFrom(this.voteService.delete(this.post.id))
      this.voteChange.emit(undefined)
      return
    }

    try {
      this.loading = true
      await lastValueFrom(this.voteService.upVote(this.post.id))
      this.voteChange.emit(1)
      this.loading = false
    } catch (error: any) {
      this.errHandler.handle(error)
      this.loading = false
    }
  }

  async onDownVote(): Promise<void> {
    if (!this.post.id) {
      return
    }

    if (this.isDownVote) {
      await lastValueFrom(this.voteService.delete(this.post.id))
      this.voteChange.emit(undefined)
      return
    }

    try {
      this.loading = true
      this.voteChange.emit(0)
      await lastValueFrom(this.voteService.downVote(this.post.id))
      this.loading = false
    } catch (error: any) {
      this.errHandler.handle(error)
      this.loading = false
    }
  }
}
