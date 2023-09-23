import {ActivatedRoute, NavigationExtras, Router} from '@angular/router'
import {Component, OnInit} from '@angular/core'

import {CallbackEvents} from '../../core/models/callback-events'

@Component({
  selector: 'bk-index-view',
  templateUrl: './index-view.component.html',
})
export class IndexViewComponent implements OnInit {
  readonly callbackEvents = CallbackEvents
  notice!: string | null

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.notice = this.route.snapshot.queryParamMap.get('notice')
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
