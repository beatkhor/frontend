import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Subscription, forkJoin, lastValueFrom} from 'rxjs'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material/dialog'
import {Router} from '@angular/router'
import {
  MultiSelectorOption,
  MultiSelectorDialogComponent,
} from '@shared/dialogs/multi-selector-dialog'

import {CustomErrorHandler} from '@workspace/services/error-handler.service'
import {SnackbarService} from '@workspace/services/snackbar.service'
import {CategoryService} from '@workspace/services/category.service'
import {GenresService} from '@workspace/services/genres.service'
import {UtilsService} from '@workspace/services/utils.service'
import {MediaService} from '@workspace/services/media.service'
import {PostService} from '@workspace/services/post.service'
import {TagsService} from '@workspace/services/tags.service'
import {TusdUpload} from '../../core/models/tusd'

import {Category, Genre, Tag, PostStatus, PostReviewStatus, Post} from '@workspace/models'

@Component({
  selector: 'bk-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent implements OnInit, OnDestroy {
  progressSubscription = new Subscription()
  finalizing = false
  uploading = false
  hasError = false
  form!: FormGroup
  loading = false

  audioMediaUpload: TusdUpload | undefined
  imageMediaUpload: TusdUpload | undefined
  categories: Category[] = []

  private genres: MultiSelectorOption<Genre>[] = []
  selectedGenres = ''

  private tags: MultiSelectorOption<Tag>[] = []
  selectedTags = ''

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
        this.categoryService.read(),
        this.genreService.read(),
        this.tagService.read(),
      ])
      const [categoryResult, genreResult, tagResult] = await lastValueFrom(request$)
      this.categories = categoryResult.result

      const mapper = (o: any) => ({
        title: o.title ?? '',
        key: o.id ?? 0,
        value: o,
      })

      this.genres = genreResult.result.map(mapper)
      this.tags = tagResult.result.map(mapper)

      this.loading = false
      this.hasError = false
    } catch (error: any) {
      this.hasError = true
      this.errorHandler.handle(error)
    }
  }

  onGenre(): void {
    const ref = this.dialog.open(MultiSelectorDialogComponent, {
      width: '400px',
      data: {
        title: $localize`Select genres:`,
        options: this.genres,
      },
      autoFocus: false,
    })

    ref.afterClosed().subscribe((result: any) => {
      if (result) {
        this.genres = result
        const selectedGenres = this.genres.filter(g => g.selected).map(g => g.value)
        this.selectedGenres = UtilsService.abbrTitlesText(selectedGenres, 2)
      }
    })
  }

  onTag(): void {
    const ref = this.dialog.open(MultiSelectorDialogComponent, {
      width: '400px',
      data: {
        title: $localize`Select tags:`,
        options: this.tags,
      },
      autoFocus: false,
    })

    ref.afterClosed().subscribe(result => {
      if (result) {
        this.tags = result
        const selectedTags = this.tags.filter(t => t.selected).map(t => t.value)
        this.selectedTags = UtilsService.abbrTitlesText(selectedTags, 2)
      }
    })
  }

  onImageSelected(upload?: TusdUpload) {
    this.imageMediaUpload = upload
    this.imageMediaUpload?.start()
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return this.snackbar.error(
        $localize`PLease review the form and enter the valid information.`
      )
    }

    if (!this.selectedGenres.length) {
      return this.snackbar.error($localize`Please select at least one genre!`)
    }

    if (!this.audioMediaUpload) {
      return this.snackbar.error($localize`Please add an audio for your track.`)
    }

    if (!this.imageMediaUpload) {
      return this.snackbar.error($localize`Please add an image for your track.`)
    }

    this.uploading = true
    this.audioMediaUpload.start()

    this.progressSubscription = this.audioMediaUpload.progress.subscribe(progress => {
      if (progress === 100) {
        this.uploading = false
        this.createPost()
        this.progressSubscription.unsubscribe()
      }
    })
  }

  private async createPost(): Promise<void> {
    if (!this.imageMediaUpload?.uploaded) {
      this.finalizing = false
      this.loading = false
      return this.snackbar.error(
        $localize`Something went wrong while uploading the picture! Try again later.`
      )
    }

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

    let imageMedia: any

    try {
      const response = await lastValueFrom(
        this.mediaService.uploadByURL(
          this.imageMediaUpload?.upload.url,
          this.imageMediaUpload?.file.name ?? ''
        )
      )
      imageMedia = response.result
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
        `${this.form.value.code}-${this.form.value.title}`
      ),
      pictures: [
        {
          original: imageMedia.uuid,
          thumbnail: imageMedia.uuid,
          default: imageMedia.uuid,
        },
      ],
      categories: [selectedCategories],
      genres: this.genres.filter(g => g.selected).map(g => g.value),
      tags: this.tags.filter(t => t.selected).map(t => t.value),
    }

    try {
      await lastValueFrom(this.postService.create(data))
      this.finalizing = false
    } catch (error: any) {
      this.form.enable()
      this.errorHandler.handle(error)
      this.finalizing = false
      return
    }

    this.snackbar.info($localize`Your track submitted successfully!`)
    this.router.navigate(['/'])
  }

  ngOnDestroy(): void {
    if (!this.progressSubscription.closed) {
      this.progressSubscription.unsubscribe()
    }
  }
}
