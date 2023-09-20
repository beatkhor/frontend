import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import {Component, Inject, OnInit, Optional} from '@angular/core'
import {Subject} from 'rxjs'

import {Genre} from '../core/models/genres'

@Component({
  selector: 'bk-genre-selector-dialog',
  template: `
    <h1 mat-dialog-title>Select Genres</h1>

    <div class="flex flex-col items-stretch">
      <p class="mx-6 mb-3">Click on each genre to select it:</p>
      <mat-form-field class="mx-6">
        <mat-label>Search</mat-label>
        <input matInput [(ngModel)]="query" (ngModelChange)="queryChange()" />
      </mat-form-field>
    </div>

    <div class="!py-0" mat-dialog-content *ngIf="filteredGenres.length">
      <mat-selection-list>
        <mat-divider></mat-divider>
        <ng-container *ngFor="let genre of filteredGenres">
          <mat-list-option
            (selectedChange)="selectionChange(genre, $event)"
            [selected]="genre._selected"
            [checkboxPosition]="'before'"
            [value]="genre"
          >
            <span class="title">{{ genre.title }}</span>
          </mat-list-option>
          <mat-divider></mat-divider>
        </ng-container>
      </mat-selection-list>
    </div>

    <div class="!py-2 !mb-3" mat-dialog-content *ngIf="!filteredGenres.length || !genres">
      <p>No genre found!</p>
    </div>

    <div mat-dialog-actions>
      <div class="px-4 mb-4">
        <button mat-flat-button color="primary" (click)="close(true, selectedGenres)">
          Submit
        </button>
        <button mat-button (click)="close(false)">Cancel</button>
      </div>
    </div>
  `,
})
export class GenreSelectorDialogComponent implements OnInit {
  queryChanges: Subject<string> = new Subject<string>()
  filteredGenres: Genre[] = []
  selectedGenres: Genre[] = []
  genres: Genre[] = []
  loading = false
  query = ''

  constructor(
    public dialogRef: MatDialogRef<GenreSelectorDialogComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public initializedData: {
      selectedGenres: Genre[]
      genres: Genre[]
    }
  ) {}

  ngOnInit(): void {
    this.selectedGenres = JSON.parse(JSON.stringify(this.initializedData.selectedGenres))
    this.getData()
    this.queryChanges.subscribe(() => {
      let temp = []
      if (!this.query) {
        temp = this.genres.slice(0, 10)
      } else {
        const q = this.query.toLowerCase()
        temp = this.genres
          .filter(c => {
            return (c?.title || '').toLowerCase().includes(q)
          })
          .slice(0, 10)
      }

      for (const tempC of temp) {
        tempC._selected = false
        for (const selectedC of this.selectedGenres) {
          if (tempC.id === selectedC.id) {
            tempC._selected = true
            break
          }
        }
      }

      this.filteredGenres = temp
    })
  }

  async getData() {
    this.genres = this.initializedData.genres
    this.filteredGenres = this.genres.slice(0, 10)
    for (const tempC of this.filteredGenres) {
      tempC._selected = false
      for (const selectedC of this.selectedGenres) {
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

  selectionChange(genre: Genre, value: boolean) {
    if (value) {
      const filtered = this.selectedGenres.filter(c => c.id === genre.id)
      if (!filtered.length) {
        this.selectedGenres.push(genre)
      }
    } else {
      this.selectedGenres = this.selectedGenres.filter(c => c.id !== genre.id)
    }
  }

  close(submit: boolean, result?: any) {
    this.dialogRef.close({
      submit,
      result,
    })
  }
}
