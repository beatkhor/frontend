import {ActivatedRoute, NavigationExtras, Router} from '@angular/router'
import {Component, OnInit} from '@angular/core'
import {forkJoin, lastValueFrom} from 'rxjs'

import {PostService} from '@workspace/services/post.service'
import {SEOService} from '@workspace/services/seo.service'
import {CallbackEvents, Post} from '@workspace/models'

@Component({
  selector: 'bk-index-view',
  templateUrl: './index-view.component.html',
})
export class IndexViewComponent implements OnInit {
  readonly callbackEvents = CallbackEvents

  latestRecommendedPost: Post[] = []
  latestDrillPost: Post[] = []
  latestTrapPost: Post[] = []
  notice!: string | null
  loading = false

  pageSize = 10
  demoArr = Array(this.pageSize)

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private seoService: SEOService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.seoService.setDescription(
      $localize`Beatkhor is a community based platform to discover, publish and download free beats. Start browsing or upload your beat right now!`
    )
    this.notice = this.route.snapshot.queryParamMap.get('notice')
    this.getData()
  }

  private async getData() {
    const latestPostReq$ = this.postService.search({
      pageSize: this.pageSize,
      tags: [{slug: 'recommended'}],
    })
    const trapPostReq$ = this.postService.search({
      pageSize: this.pageSize,
      genres: [{slug: 'trap'}],
    })
    const drillPostReq$ = this.postService.search({
      pageSize: this.pageSize,
      genres: [{slug: 'drill'}],
    })
    const req$ = forkJoin([latestPostReq$, trapPostReq$, drillPostReq$])

    try {
      this.loading = true
      const [latestResponse, trapPostResponse, drillPostResponse] = await lastValueFrom(
        req$
      )
      this.latestRecommendedPost = latestResponse.result
      this.latestTrapPost = trapPostResponse.result
      this.latestDrillPost = drillPostResponse.result
      this.loading = false
    } catch (error) {
      this.loading = false
    }
  }

  onCloseNotice() {
    this.notice = null
    const navigationExtras: NavigationExtras = {
      queryParams: {...this.route.snapshot.queryParams, notice: null},
      queryParamsHandling: 'merge',
    }
    this.router.navigate([], navigationExtras)
  }
}
