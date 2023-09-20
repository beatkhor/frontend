import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import {Component, Inject, OnInit, Optional} from '@angular/core'
import {Subject} from 'rxjs'

import {Tag} from '../core/models/tags'

@Component({
  selector: 'bk-tag-selector-dialog',
  template: `
    <h1 mat-dialog-title>Select Tags</h1>

    <div class="flex flex-col items-stretch">
      <p class="mx-6 mb-3">Click on each tag to select it:</p>
      <mat-form-field class="mx-6">
        <mat-label>Search</mat-label>
        <input matInput [(ngModel)]="query" (ngModelChange)="queryChange()" />
      </mat-form-field>
    </div>

    <div class="!py-0" mat-dialog-content *ngIf="filteredTags.length">
      <mat-selection-list>
        <mat-divider></mat-divider>
        <ng-container *ngFor="let category of filteredTags">
          <mat-list-option
            (selectedChange)="selectionChange(category, $event)"
            [selected]="category._selected"
            [checkboxPosition]="'before'"
            [value]="category"
          >
            <span class="title">{{ category.title }}</span>
          </mat-list-option>
          <mat-divider></mat-divider>
        </ng-container>
      </mat-selection-list>
    </div>

    <div class="!py-2 !mb-3" mat-dialog-content *ngIf="!filteredTags.length || !tags">
      <p>No tags found!</p>
    </div>

    <div mat-dialog-actions>
      <div class="px-4 mb-4">
        <button mat-flat-button color="primary" (click)="close(true, selectedTags)">
          Submit
        </button>
        <button mat-button (click)="close(false)">Cancel</button>
      </div>
    </div>
  `,
})
export class TagSelectorDialogComponent implements OnInit {
  queryChanges: Subject<string> = new Subject<string>()
  filteredTags: Tag[] = []
  selectedTags: Tag[] = []
  tags: Tag[] = []
  loading = false
  query = ''

  constructor(
    public dialogRef: MatDialogRef<TagSelectorDialogComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public initializedData: {
      selectedTags: Tag[]
      tags: Tag[]
    }
  ) {}

  ngOnInit(): void {
    this.selectedTags = JSON.parse(JSON.stringify(this.initializedData.selectedTags))
    console.log(this.selectedTags)
    this.getData()
    this.queryChanges.subscribe(() => {
      let temp = []
      if (!this.query) {
        temp = this.tags.slice(0, 10)
      } else {
        const q = this.query.toLowerCase()
        temp = this.tags
          .filter(c => {
            return (c?.title ?? '').toLowerCase().includes(q)
          })
          .slice(0, 10)
      }

      for (const tempC of temp) {
        for (const selectedC of this.selectedTags) {
          tempC._selected = false
          console.log(tempC)
          if (tempC.id === selectedC.id) {
            tempC._selected = true
            break
          }
        }
      }

      this.filteredTags = temp
    })
  }

  async getData() {
    this.tags = this.initializedData.tags
    this.filteredTags = this.tags.slice(0, 10)
    for (const tempC of this.filteredTags) {
      tempC._selected = false
      for (const selectedC of this.selectedTags) {
        if (tempC.id === selectedC.id) {
          tempC._selected = true
          break
        }
      }
    }
  }

  queryChange() {
    this.queryChanges.next(this.query)
  }

  selectionChange(tag: Tag, value: boolean) {
    if (value) {
      const filtered = this.selectedTags.filter(c => c.id === tag.id)
      if (!filtered.length) {
        this.selectedTags.push(tag)
      }
    } else {
      this.selectedTags = this.selectedTags.filter(c => c.id !== tag.id)
    }
  }

  close(submit: boolean, result?: any) {
    this.dialogRef.close({
      submit,
      result,
    })
  }
}
