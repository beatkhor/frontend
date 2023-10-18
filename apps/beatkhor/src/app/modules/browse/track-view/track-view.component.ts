import {Component, Inject, LOCALE_ID, OnDestroy, OnInit} from '@angular/core'
import {Subject, lastValueFrom, takeUntil} from 'rxjs'
import {ActivatedRoute} from '@angular/router'

import {CustomErrorHandler} from '@workspace/services/error-handler.service'
import {UtilsService} from '@workspace/services/utils.service'
import {PostService} from '@workspace/services/post.service'
import {SEOService} from '@workspace/services/seo.service'
import {environment} from '@environments/environment'
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
    private seoService: SEOService,
    private postService: PostService,
    private errHandler: CustomErrorHandler,
    @Inject(LOCALE_ID) public localeId: string
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.getData(params['link'])
    })
  }

  private async getData(postLink: string) {
    try {
      this.loading = true
      const req = this.postService.readByLink(postLink)
      const result = await lastValueFrom(req)
      this.post = result.result
      this.setupSEO()

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

  setupSEO() {
    const title = UtilsService.getPostTitle(this.post, this.localeId)
    const description = UtilsService.getPostDescription(this.post, this.localeId)
    const keywords = UtilsService.getPostKeywords(this.post, this.localeId)
    this.seoService.updateMeta({
      title: title + environment.seo.titleSeparator + environment.seo.title,
      description,
      noIndex: !environment.production,
      image: environment.seo.openGraph.image,
      keywords,
    })
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
