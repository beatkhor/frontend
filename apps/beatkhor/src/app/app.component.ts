import {ActivatedRoute, NavigationEnd, Router} from '@angular/router'
import {Component, OnInit} from '@angular/core'

import {SEOService} from '@workspace/services/seo.service'
import {filter} from 'rxjs'

@Component({
  selector: 'bk-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.handleTitle()
  }

  private handleTitle() {
    const events$ = this.router.events
    events$.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.seoService.handleRouterEvent(this.route.root.snapshot.firstChild)
    })
  }
}
