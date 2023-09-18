import {Component} from '@angular/core'

import {UtilsService} from '../core/services/utils.service'
import {Genre} from '../core/models/genres'
import {Tag} from '../core/models/tags'

@Component({
  selector: 'bk-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent {
  loading = false

  selectedGenres: Genre[] = []
  genres: Genre[] = []

  selectedTags: Tag[] = []
  tags: Tag[] = []

  onGenre(): void {}

  selectedGenresText(count: number): string {
    return UtilsService.abbrTitlesText(this.selectedGenres, count)
  }

  onTag(): void {}

  selectedTagsText(count: number): string {
    return UtilsService.abbrTitlesText(this.selectedTags, count)
  }

  onAudioFileInputChange(event: any): void {}
}
