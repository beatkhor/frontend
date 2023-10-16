import {EnvironmentConfig} from '@workspace/models'
import {messages} from './messages'

export const environment: EnvironmentConfig = {
  production: false,
  siteUrl: 'https://next.beatkhor.com',
  storageKeyPrefix: 'bk',
  authServiceUrl: 'https://next.beatkhor.com/api/auth',
  contentServiceUrl: 'https://next.beatkhor.com/api/content',
  storageServiceUrl: 'https://next.beatkhor.com/api/storage',
  uploaderServiceUrl: 'https://next.beatkhor.com/api/tusd/files/',
  messages,
  seo: {
    title: $localize`Beatkhor [Next]`,
    titleSeparator: ' | ',
    trackImageAltSuffix: $localize`cover art`,
    openGraph: {
      image: {
        src: '/assets/seo/og-logo-1200x1200.png',
        width: 1200,
        height: 1200,
        type: 'image/png',
      },
    },
  },
}
