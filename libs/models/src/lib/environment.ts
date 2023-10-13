import {InjectionToken} from '@angular/core'

export interface SEOEnvironmentConfig {
  title: string
  titleSeparator: string
  trackImageAltSuffix: string
}

export interface EnvironmentConfig {
  production: boolean
  authServiceUrl: string
  storageKeyPrefix: string
  contentServiceUrl: string
  storageServiceUrl: string
  uploaderServiceUrl: string
  messages: {[key: string]: string}
  seo: SEOEnvironmentConfig
}

export const ENVIRONMENT_CONFIG = new InjectionToken<EnvironmentConfig>(
  'ENVIRONMENT_CONFIG'
)
