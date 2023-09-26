import {Component, Directive, ViewEncapsulation} from '@angular/core'

@Component({
  selector: 'bk-grid-header',
  template: ` <div class="post-grid-header flex items-center mb-6 lg:min-h-[36px]">
    <ng-content select="[bk-grid-header-title]"></ng-content>
    <div class="flex grow-[10] h-[.02rem] bg-neutral-800"></div>
    <div
      class="[&_a]:hidden md:[&_a]:flex md:[&_a]:no-underline md:[&_a]:items-center md:[&_a]:justify-center md:[&_a]:text-[.87rem]"
    >
      <ng-content select="[bk-grid-header-actions]"></ng-content>
    </div>
  </div>`,
  styleUrls: ['./grid-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GridHeaderComponent {}

@Directive({
  selector: '[bk-grid-header-actions]',
})
export class GridHeaderActionsDirective {}

@Directive({
  selector: '[bk-grid-header-title]',
})
export class GridHeaderTitleDirective {}
