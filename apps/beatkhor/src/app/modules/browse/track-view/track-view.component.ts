import {Component, OnDestroy, OnInit} from '@angular/core'
import {Subject, lastValueFrom, takeUntil} from 'rxjs'
import {ActivatedRoute} from '@angular/router'

import {CustomErrorHandler} from '@workspace/services/error-handler.service'
import {PostService} from '@workspace/services/post.service'
import {Post} from '@workspace/models'

@Component({
  selector: 'bk-track-view',
  templateUrl: './track-view.component.html',
})
export class TrackViewComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>()
  latestRelatedPost: Post[] = []
  loadingRelatedPosts = false
  loading = false
  post!: Post

  pageSize = 10
  demoArr = Array(5)

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private errHandler: CustomErrorHandler
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.getData(params['link'])
    })
  }

  private async getData(postLink: string) {
    try {
      this.loading = true
      const req = this.postService.getPostByLink(postLink)
      const result = await lastValueFrom(req)
      this.post = result.result

      if (this.post.genres.length) {
        this.getRelatedPosts(this.post.genres[0].slug)
      } else {
        this.getRelatedPosts()
      }

      this.loading = false
    } catch (error: any) {
      console.log(error)
      this.errHandler.handle(error)
    }
  }

  private async getRelatedPosts(genreSlug?: string) {
    const relatedPostReq$ = this.postService.search({
      pageSize: this.pageSize,
      genres: [{slug: genreSlug}],
    })

    try {
      this.loadingRelatedPosts = true
      const relatedPostResponse = await lastValueFrom(relatedPostReq$)
      this.latestRelatedPost = relatedPostResponse.result
      this.loadingRelatedPosts = false
    } catch (error) {
      this.loadingRelatedPosts = false
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
