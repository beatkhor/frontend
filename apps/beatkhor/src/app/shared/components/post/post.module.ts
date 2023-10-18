import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {PostGridComponent} from './post-grid.component'
import {PostTileComponent} from './post-tile.component'
import {PipesModule} from '../../pipes/pipes.module'

@NgModule({
  declarations: [PostGridComponent, PostTileComponent],
  imports: [CommonModule, PipesModule],
  exports: [PostGridComponent, PostTileComponent],
})
export class PostModule {}
