import {Component, Input, OnInit} from '@angular/core'

import {PostService} from '../../../core/services/post.service'
import {Picture} from '../../../core/models/media'
import {Post} from '../../../core/models/post'

@Component({
  selector: 'bk-post',
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {
  @Input() post!: Post
  alt = ''

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.alt = this.postService.generateFullName(this.post)
  }

  get picture(): Picture | undefined {
    return this.post?.pictures[0]
  }
}
