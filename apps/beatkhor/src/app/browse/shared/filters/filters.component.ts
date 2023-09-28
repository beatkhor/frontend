import {Component, OnInit} from '@angular/core'
import {forkJoin, lastValueFrom} from 'rxjs'

import {GenresService} from '../../../core/services/genres.service'
import {TagsService} from '../../../core/services/tags.service'
import {Genre} from '../../../core/models/genres'
import {Tag} from '../../../core/models/tags'

@Component({
  selector: 'bk-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit {
  searchEnabled = false
  genres: Genre[] = []
  tags: Tag[] = []
  loading = false

  constructor(private genreService: GenresService, private tagsService: TagsService) {}

  ngOnInit(): void {
    this.getData()
  }

  private async getData() {
    try {
      this.loading = true
      const req$ = forkJoin([this.genreService.getGenres(), this.tagsService.getTags()])
      const result = await lastValueFrom(req$)
      this.genres = result[0].result
      this.tags = result[1].result
      this.loading = false
    } catch (error) {
      this.loading = false
    }
  }

  onSearch() {
    this.searchEnabled = !this.searchEnabled
  }
}
