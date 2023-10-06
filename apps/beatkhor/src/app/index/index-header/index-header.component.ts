import {Component, Inject, LOCALE_ID} from '@angular/core'

@Component({
  selector: 'bk-header',
  templateUrl: './index-header.component.html',
  styleUrls: ['./index-header.component.scss'],
})
export class IndexHeaderComponent {
  constructor(@Inject(LOCALE_ID) public localeId: string) {}
}
