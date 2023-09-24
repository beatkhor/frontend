import {Component, OnDestroy, OnInit} from '@angular/core'
import {Subject, lastValueFrom, takeUntil} from 'rxjs'
import {ActivatedRoute} from '@angular/router'

import {CustomErrorHandler} from '../../core/services/error-handler.service'
import {PostService} from '../../core/services/post.service'
import {Post} from '../../core/models/post'

@Component({
  selector: 'bk-track-view',
  templateUrl: './track-view.component.html',
})
export class TrackViewComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>()
  loading = false
  post!: Post

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
      this.loading = false
    } catch (error: any) {
      console.log(error)
      this.errHandler.handle(error)
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
