import {Subject, Subscription, debounceTime, forkJoin, lastValueFrom} from 'rxjs'
import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'

import {GenresService} from '../../../../core/services/genres.service'
import {TagsService} from '../../../../core/services/tags.service'
import {Genre, Tag} from '@workspace/models'

@Component({
  selector: 'bk-browse-filters',
  templateUrl: './browse-filters.component.html',
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() filtersChange = new EventEmitter()
  queryChanges$ = new Subject()

  filters: Map<string, string> = new Map()
  subscription!: Subscription
  genres: Genre[] = []
  tags: Tag[] = []
  loading = false

  selectedGenres: Genre[] = []
  selectedTags: Tag[] = []
  query = ''

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tagsService: TagsService,
    private genreService: GenresService
  ) {}

  ngOnInit(): void {
    this.getData()
    this.subscription = this.queryChanges$.pipe(debounceTime(300)).subscribe(() => {
      this.emitChanges()
    })
  }

  private async getData() {
    try {
      this.loading = true
      const req$ = forkJoin([this.genreService.getGenres(), this.tagsService.getTags()])
      const result = await lastValueFrom(req$)
      this.genres = result[0].result
      this.genres.sort((a, b) => (a.view_order ?? 1) - (b.view_order ?? 1))
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

    const genresParam = this.filters.get('genres')?.split(',') ?? []
    for (const g of this.genres) {
      if (genresParam.find(p => p === g.slug)) {
        this.selectedGenres.push(g)
      }
    }

    const tagsParam = this.filters.get('tags')?.split(',') ?? []
    for (const t of this.tags) {
      if (tagsParam.find(p => p === t.slug)) {
        this.selectedTags.push(t)
      }
    }

    const queryParam = this.filters.get('q')
    this.query = queryParam ?? ''
    this.emitChanges()
  }

  emitChanges(): void {
    const newFilter: any = {
      q: this.query,
      tags: this.selectedTags.map(t => t.slug).join(','),
      genres: this.selectedGenres.map(g => g.slug).join(','),
    }

    Object.keys(newFilter).forEach(k => {
      if (newFilter[k] == '' || (k == 'page' && newFilter[k] == '1')) {
        delete newFilter[k]
      }
    })

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: newFilter,
      replaceUrl: true,
    })

    this.filtersChange.emit({
      genres: this.selectedGenres,
      tags: this.selectedGenres,
      query: this.query,
    })
  }

  ngOnDestroy(): void {
    if (!this.subscription.closed) {
      this.subscription.unsubscribe()
    }
  }
}
