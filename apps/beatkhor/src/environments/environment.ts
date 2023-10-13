import {EnvironmentConfig} from '@workspace/models'
import {messages} from './messages'

export const environment: EnvironmentConfig = {
  production: false,
  storageKeyPrefix: 'bk',
  authServiceUrl: 'https://next.beatkhor.com/api/auth',
  contentServiceUrl: 'https://next.beatkhor.com/api/content',
  storageServiceUrl: 'https://next.beatkhor.com/api/storage',
  uploaderServiceUrl: 'https://next.beatkhor.com/api/tusd/files/',
  messages,
  seo: {
    title: $localize`Beatkhor [Next]`,
    titleSeparator: ' | ',
  },
}
