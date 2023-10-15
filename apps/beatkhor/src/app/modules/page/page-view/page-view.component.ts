import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core'
import {DomSanitizer, SafeHtml} from '@angular/platform-browser'
import {ActivatedRoute} from '@angular/router'
import {forkJoin, lastValueFrom} from 'rxjs'

import {CustomErrorHandler} from '@workspace/services/error-handler.service'
import {PageService} from '@workspace/services/page.service'
import {SEOService} from '@workspace/services/seo.service'
import {environment} from '@environments/environment'

@Component({
  selector: 'bk-pages-view',
  templateUrl: './page-view.component.html',
})
export class PageViewComponent implements OnInit {
  content: SafeHtml = ''
  loading = false

  constructor(
    private route: ActivatedRoute,
    private seoService: SEOService,
    private sanitizer: DomSanitizer,
    private pageService: PageService,
    private errHandler: CustomErrorHandler,
    @Inject(LOCALE_ID) public localeId: string
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadPage(params['key'] + '-page-')
    })
  }

  private async loadPage(pageKey: string) {
    try {
      this.loading = true

      const req$ = forkJoin([
        this.pageService.read(pageKey + this.localeId),
        this.pageService.read(pageKey + 'description-' + this.localeId),
        this.pageService.read(pageKey + 'title-' + this.localeId),
      ])

      const result = await lastValueFrom(req$)
      this.loading = false
      this.content = this.sanitizer.bypassSecurityTrustHtml(result[0].result.value ?? '')
      this.seoService.setDescription(result[1].result.value ?? '')
      const title = [result[2].result.value ?? '', environment.seo.title].join(
        environment.seo.titleSeparator
      )
      this.seoService.setTitle(title)
    } catch (error: any) {
      this.loading = false
      this.errHandler.handle(error)
    }
  }
}
