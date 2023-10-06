import {Component, EventEmitter, Input, Output} from '@angular/core'

import {UtilsService} from '../../core/services/utils.service'
import {TusdUpload} from '../../core/models/tusd'

@Component({
  selector: 'bk-upload-file-picker',
  template: ` <div>
    <h2 class="text-2xl">{{ title }}</h2>
    <p class="text-neutral-400">{{ subtitle }}</p>
    <input
      type="file"
      [accept]="accept"
      #filePicker
      style="display: none"
      (change)="onInputChange($event)"
    />
    <button
      *ngIf="!selectedFile"
      class="my-7"
      mat-stroked-button
      color="primary"
      (click)="filePicker.click()"
    >
      <mat-icon>add</mat-icon>
      <span i18n> Choose file </span>
    </button>

    <div *ngIf="selectedFile" class="inline-block my-7">
      <div class="flex items-center bg-neutral-700 rounded px-3">
        <span>{{ selectedFile.file.name }}</span>
        <button class="ml-3" mat-button color="warn" (click)="onRemove(filePicker)" i18n>
          Delete
        </button>
      </div>
    </div>
  </div>`,
})
export class FilePickerComponent {
  @Output() fileChange = new EventEmitter<TusdUpload | undefined>()
  @Input() subtitle = ''
  @Input() title = ''
  @Input() accept = ''

  selectedFile: TusdUpload | undefined

  onInputChange(event: any): void {
    if (event?.target?.files?.length) {
      const file = event?.target?.files[0]
      const upload = new TusdUpload(file, UtilsService.generatePostCode())
      this.selectedFile = upload
      this.fileChange.emit(this.selectedFile)
    }
  }

  onRemove(inputEl: HTMLInputElement) {
    inputEl.value = ''
    this.selectedFile = undefined
    this.fileChange.emit(undefined)
  }
}
