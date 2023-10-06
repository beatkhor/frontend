import {ActivatedRoute, NavigationExtras, Router} from '@angular/router'
import {Component, OnInit} from '@angular/core'
import {forkJoin, lastValueFrom} from 'rxjs'

import {PostService} from '../../../core/services/post.service'
import {CallbackEvents, Post} from '@beatkhor/models'

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
    private postService: PostService
  ) {}

  ngOnInit(): void {
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
