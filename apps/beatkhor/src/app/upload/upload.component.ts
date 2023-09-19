import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {MatDialog} from '@angular/material/dialog'
import {Component, OnInit} from '@angular/core'
import {forkJoin, lastValueFrom} from 'rxjs'
import {Router} from '@angular/router'

import {GenreSelectorDialogComponent} from '../shared/genre-selector-dialog.component'
import {TagSelectorDialogComponent} from '../shared/tag-selector-dialog.component'
import {CustomErrorHandler} from '../core/services/error-handler.service'
import {Post, PostReviewStatus, PostStatus} from '../core/models/post'
import {SnackbarService} from '../core/services/snackbar.service'
import {CategoryService} from '../core/services/category.service'
import {GenresService} from '../core/services/genres.service'
import {UtilsService} from '../core/services/utils.service'
import {MediaService} from '../core/services/media.service'
import {PostService} from '../core/services/post.service'
import {TagsService} from '../core/services/tags.service'
import {Category} from '../core/models/category'
import {TusdUpload} from '../core/models/tusd'
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
  uploading = false

  audioMediaUpload: TusdUpload | undefined
  selectedGenres: Genre[] = []
  categories: Category[] = []
  selectedTags: Tag[] = []
  genres: Genre[] = []
  tags: Tag[] = []

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private tagService: TagsService,
    private postService: PostService,
    private snackbar: SnackbarService,
    private mediaService: MediaService,
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

  onAudioFileInputChange(event: any): void {
    if (event?.target?.files?.length) {
      const file = event?.target?.files[0]
      const upload = new TusdUpload(file, UtilsService.generatePostCode())
      this.audioMediaUpload = upload
    }
  }

  onRemoveAudioFile(inputEl: HTMLInputElement) {
    inputEl.value = ''
    this.audioMediaUpload = undefined
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return this.snackbar.error(
        'PLease review the form and enter the valid information.'
      )
    }

    if (!this.selectedGenres.length) {
      return this.snackbar.error('Please select at least one genre!')
    }

    if (!this.audioMediaUpload) {
      return this.snackbar.error('Please add an audio for your track.')
    }

    this.uploading = true
    this.audioMediaUpload.start()
    const progressSubscription = this.audioMediaUpload.progress.subscribe(progress => {
      if (progress === 100) {
        this.uploading = false
        this.createPost()
        progressSubscription.unsubscribe()
      }
    })
  }

  private async createPost() {
    this.finalizing = true
    this.form.disable()
    let audioMedia: any

    try {
      const response = await lastValueFrom(
        this.mediaService.uploadByURL(
          this.audioMediaUpload?.upload.url,
          this.audioMediaUpload?.file.name ?? ''
        )
      )
      audioMedia = response.result
    } catch (error: any) {
      this.form.enable()
      this.errorHandler.handle(error)
      this.finalizing = false
      this.loading = false
      return
    }

    const selectedCategories = this.categories.find(c => c.slug === 'beat')

    if (!selectedCategories) {
      return
    }

    const data: Post = {
      id: 0,
      post_meta: {
        id: 0,
        description: this.form.value.description,
        price: this.form.value.price,
        title: this.form.value.title,
        code: this.form.value.code,
        status: this.form.value.status,
        review_status: this.form.value.review_status,
      },
      audios: [
        {
          title: audioMedia.name,
          original: audioMedia.uuid,
        },
      ],
      link: UtilsService.sanitizeForLink(
        `${this.form.value.code} ${this.form.value.title}`
      ),
      pictures: [],
      categories: [selectedCategories],
      genres: this.selectedGenres,
      tags: this.selectedTags,
    }

    try {
      await lastValueFrom(this.postService.createPost(data))
      this.finalizing = false
    } catch (error: any) {
      this.form.enable()
      this.errorHandler.handle(error)
      this.finalizing = false
      return
    }

    this.snackbar.info('Your track submitted successfully!')
    this.router.navigate(['/'])
  }
}
