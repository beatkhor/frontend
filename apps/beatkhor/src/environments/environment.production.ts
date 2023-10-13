import {EnvironmentConfig} from '@workspace/models'
import {messages} from './messages'

export const environment: EnvironmentConfig = {
  production: true,
  storageKeyPrefix: 'bk',
  authServiceUrl: 'https://www.beatkhor.com/api/auth',
  contentServiceUrl: 'https://www.beatkhor.com/api/content',
  storageServiceUrl: 'https://www.beatkhor.com/api/storage',
  uploaderServiceUrl: 'https://www.beatkhor.com/api/tusd/files/',
  messages,
  seo: {
    title: $localize`Beatkhor`,
    titleSeparator: ' | ',
    trackImageAltSuffix: $localize`cover art`,
  },
}
