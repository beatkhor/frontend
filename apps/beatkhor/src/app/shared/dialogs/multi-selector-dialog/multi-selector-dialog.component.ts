import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {Component, Inject, OnInit, Optional} from '@angular/core'

import {MultiSelectorOption} from './multi-selector-dialog.model'

@Component({
  selector: 'multi-selector-dialog',
  templateUrl: './multi-selector-dialog.component.html',
})
export class MultiSelectorDialogComponent<T> implements OnInit {
  filteredOptions: MultiSelectorOption<T>[] = []
  options: MultiSelectorOption<T>[] = []
  query = ''

  constructor(
    public dialogRef: MatDialogRef<MultiSelectorDialogComponent<T>>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string
      options: MultiSelectorOption<T>[]
    }
  ) {
    this.options = JSON.parse(JSON.stringify(this.data.options))
  }

  ngOnInit(): void {
    this.onQueryChange()
  }

  onQueryChange(): void {
    this.filteredOptions = this.options.filter(o =>
      o.title.toLowerCase().includes(this.query)
    )
  }

  onSelectionChange(selectedOption: MultiSelectorOption<T>, selected: boolean): void {
    for (const option of this.options) {
      if (option.key === selectedOption.key) {
        option.selected = selected
      }
    }
  }
}
