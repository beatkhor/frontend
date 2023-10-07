import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core'
import {DomSanitizer, SafeHtml} from '@angular/platform-browser'
import {ActivatedRoute} from '@angular/router'
import {lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '@workspace/services/error-handler.service'
import {PageService} from '@workspace/services/page.service'

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
    private errHandler: CustomErrorHandler,
    @Inject(LOCALE_ID) public localeId: string
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadPage(params['key'] + '-page-' + this.localeId)
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
