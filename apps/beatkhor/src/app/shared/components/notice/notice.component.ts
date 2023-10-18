import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
  selector: 'bk-notice',
  template: `<div
    class="flex items-center justify-between border border-neutral-800 my-5 rounded"
  >
    <div class="flex p-4">
      <div class="h-6 ml-2 mr-5 md:mr-3 !w-20 sm:!w-11">
        <mat-icon *ngIf="mode === 'success'" class="text-accent-400">done</mat-icon>
        <mat-icon *ngIf="mode === 'info'" class="text-neutral-300">info</mat-icon>
        <mat-icon *ngIf="mode === 'error'" class="text-red-400">error</mat-icon>
      </div>
      <p class="text-neutral-300 leading-relaxed min-w-[83%]">{{ message }}</p>
    </div>

    <button class="mr-2 my-1 self-start" mat-icon-button (click)="onClose()">
      <mat-icon class="text-neutral-400">close</mat-icon>
    </button>
  </div>`,
})
export class NoticeComponent {
  @Input() mode: 'success' | 'info' | 'error' = 'success'
  @Input() message = 'N/A'
  @Output() close = new EventEmitter<void>()

  onClose() {
    this.close.emit()
  }
}
