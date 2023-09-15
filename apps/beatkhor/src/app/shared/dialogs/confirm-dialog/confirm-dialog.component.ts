import {Component, Inject, Optional} from '@angular/core'
import {MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'bk-confirm-dialog',
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content class="mat-typography">
      <p>{{ data.message }}</p>
    </div>

    <div mat-dialog-actions>
      <div class="px-4 mb-4">
        <button mat-flat-button color="primary" [mat-dialog-close]="true">Confirm</button>
        <button mat-flat-button [mat-dialog-close]="false">Cancel</button>
      </div>
    </div>
  `,
})
export class ConfirmDialogComponent {
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {}
}
