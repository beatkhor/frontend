import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {MatDialog} from '@angular/material/dialog'
import {Component, OnInit} from '@angular/core'
import {forkJoin, lastValueFrom} from 'rxjs'

import {GenreSelectorDialogComponent} from '../shared/genre-selector-dialog.component'
import {TagSelectorDialogComponent} from '../shared/tag-selector-dialog.component'
import {CustomErrorHandler} from '../core/services/error-handler.service'
import {CategoryService} from '../core/services/category.service'
import {PostReviewStatus, PostStatus} from '../core/models/post'
import {GenresService} from '../core/services/genres.service'
import {UtilsService} from '../core/services/utils.service'
import {TagsService} from '../core/services/tags.service'
import {Category} from '../core/models/category'
import {Genre} from '../core/models/genres'
import {Tag} from '../core/models/tags'

@Component({
  selector: 'bk-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent implements OnInit {
  finalizing = false
  hasError = false
  form!: FormGroup
  loading = false
  sending = false

  selectedGenres: Genre[] = []
  categories: Category[] = []
  selectedTags: Tag[] = []
  genres: Genre[] = []
  tags: Tag[] = []

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private tagService: TagsService,
    private genreService: GenresService,
    private errorHandler: CustomErrorHandler,
    private categoryService: CategoryService
  ) {
    this.createForm()
  }

  ngOnInit(): void {
    this.getData()
  }

  private createForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      code: [UtilsService.generatePostCode(), Validators.required],
      price: [0],
      description: [''],
      status: [PostStatus.Draft],
      review_status: [PostReviewStatus.None],
    })
  }

  private async getData(): Promise<void> {
    try {
      this.hasError = false
      this.loading = true
      const request$ = forkJoin([
        this.categoryService.getCategories(),
        this.genreService.getGenres(),
        this.tagService.getTags(),
      ])
      const [categoryResult, genreResult, tagResult] = await lastValueFrom(request$)
      this.categories = categoryResult.result
      this.genres = genreResult.result
      this.tags = tagResult.result
      this.loading = false
      this.hasError = false
    } catch (error: any) {
      this.hasError = true
      this.errorHandler.handle(error)
    }
  }

  onGenre(): void {
    const ref = this.dialog.open(GenreSelectorDialogComponent, {
      width: '400px',
      data: {
        genres: this.genres,
        selectedGenres: this.selectedGenres,
      },
      autoFocus: false,
    })

    ref.afterClosed().subscribe((res: any) => {
      if (res?.submit) {
        this.selectedGenres = res.result || []
      }
    })
  }

  selectedGenresText(count: number): string {
    return UtilsService.abbrTitlesText(this.selectedGenres, count)
  }

  onTag(): void {
    const ref = this.dialog.open(TagSelectorDialogComponent, {
      width: '400px',
      data: {
        tags: this.tags,
        selectedTags: this.selectedTags,
      },
      autoFocus: false,
    })

    ref.afterClosed().subscribe(res => {
      if (res?.submit) {
        this.selectedTags = res.result || []
      }
    })
  }

  selectedTagsText(count: number): string {
    return UtilsService.abbrTitlesText(this.selectedTags, count)
  }

  onAudioFileInputChange(event: any): void {}
}
