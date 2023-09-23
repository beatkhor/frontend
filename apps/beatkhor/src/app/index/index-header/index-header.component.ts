import {Component} from '@angular/core'

@Component({
  selector: 'bk-header',
  templateUrl: './index-header.component.html',
  styles: [
    `
      .link {
        @apply mr-4 mb-4 no-underline text-[0.87rem];
      }

      @media (min-width: 1024px) {
        .description {
          text-align: unset;
        }
      }
    `,
  ],
})
export class IndexHeaderComponent {}
