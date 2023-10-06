import {DomSanitizer, SafeHtml} from '@angular/platform-browser'
import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '@services/error-handler.service'
import {PageService} from '@services/page.service'

@Component({
  selector: 'bk-pages-view',
  templateUrl: './page-view.component.html',
})
export class PageViewComponent implements OnInit {
  content: SafeHtml = ''
  loading = false

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private pageService: PageService,
    private errHandler: CustomErrorHandler
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadPage(params['key'] + '-page')
    })
  }

  private async loadPage(pageKey: string) {
    try {
      this.loading = true
      const result = await lastValueFrom(this.pageService.getContent(pageKey))
      this.loading = false
      this.content = this.sanitizer.bypassSecurityTrustHtml(result.result.value ?? '')
    } catch (error: any) {
      this.loading = false
      this.errHandler.handle(error)
    }
  }
}
