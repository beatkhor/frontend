import {EnvironmentConfig} from '@workspace/models'
import {messages} from './messages'

export const environment: EnvironmentConfig = {
  production: true,
  storageKeyPrefix: 'bk',
  siteUrl: 'https://www.beatkhor.com',
  authServiceUrl: 'https://www.beatkhor.com/api/auth',
  contentServiceUrl: 'https://www.beatkhor.com/api/content',
  storageServiceUrl: 'https://www.beatkhor.com/api/storage',
  uploaderServiceUrl: 'https://www.beatkhor.com/api/tusd/files/',
  messages,
  seo: {
    title: $localize`Beatkhor`,
    titleSeparator: ' | ',
    trackImageAltSuffix: $localize`cover art`,
    email: 'support@beatkhor.com',
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
