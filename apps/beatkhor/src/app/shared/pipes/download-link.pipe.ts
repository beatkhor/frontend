import {environment} from '@environments/environment'
import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
  name: 'downloadLink',
})
export class DownloadLinkPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) {
      return ''
    }

    return environment.storageServiceURL + '/media/download/' + value
  }
}
