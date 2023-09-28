import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
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
  filters: Map<string, string> = new Map()
  genres: Genre[] = []
  tags: Tag[] = []
  loading = false

  selectedGenres: Genre[] = []
  selectedTags: Tag[] = []
  query = ''

  constructor(
    private route: ActivatedRoute,
    private tagsService: TagsService,
    private genreService: GenresService
  ) {}

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
      this.readParams()
      this.loading = false
    } catch (error) {
      this.loading = false
    }
  }

  private readParams() {
    const params = this.route.snapshot.queryParams
    for (const key in params) {
      this.filters.set(key, params[key])
    }

    const genresParam = this.filters.get('genres')?.split(',') || []
    for (const g of this.genres) {
      if (genresParam.find(p => p === g.slug)) {
        this.selectedGenres.push(g)
      }
    }

    const tagsParam = this.filters.get('tags')?.split(',') || []
    for (const t of this.tags) {
      if (tagsParam.find(p => p === t.slug)) {
        this.selectedTags.push(t)
      }
    }

    const queryParam = this.filters.get('q')
    this.query = queryParam ?? ''
  }
}
