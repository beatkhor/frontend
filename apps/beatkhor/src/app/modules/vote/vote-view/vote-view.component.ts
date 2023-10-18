import {Component, OnInit} from '@angular/core'
import {lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '@workspace/services/error-handler.service'
import {VoteService} from '@workspace/services/review.service'
import {Vote, Post} from '@workspace/models'

@Component({
  selector: 'bk-vote',
  templateUrl: './vote-view.component.html',
})
export class VoteComponent implements OnInit {
  postVotes = new Map<number, number | undefined>()
  votes: Vote[] = []
  posts: Post[] = []
  loading = false
  p = 1

  constructor(
    private reviewService: VoteService,
    private errHandler: CustomErrorHandler
  ) {}

  ngOnInit(): void {
    this.getData()
  }

  getPostVote(post: Post): number | undefined {
    return this.postVotes.get(post.id ?? 0)
  }

  async getData(): Promise<void> {
    try {
      this.loading = true
      const result = await lastValueFrom(this.reviewService.readVotePosts())

      this.posts = result.result.posts
      this.votes = result.result.user_votes

      for (const post of this.posts) {
        const found = this.votes.filter(r => r.post_id === post.id)
        if (found.length) {
          this.postVotes.set(post.id ?? 0, found[0].vote)
        }
      }

      this.loading = false
    } catch (error: any) {
      this.loading = false
      this.errHandler.handle(error)
    }
  }

  onVoteChange(postId: number | undefined, vote: number | undefined) {
    if (!postId) {
      return
    }

    this.postVotes.set(postId, vote)
  }
}
