import {Component, OnInit} from '@angular/core'
import {Post} from '../../core/models/post'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'bk-browse-view',
  templateUrl: './browse-view.component.html',
})
export class BrowseViewComponent implements OnInit {
  posts: Post[] = []
  loading = false

  page = 0
  pageSize = 16
  demoArr = Array(this.pageSize)

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
