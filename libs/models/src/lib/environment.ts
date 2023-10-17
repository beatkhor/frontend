import {InjectionToken} from '@angular/core'

export interface OpenGraphOptions {
  image: {
    src: string
    width: number
    height: number
    type: string
  }
}

export interface SEOEnvironmentConfig {
  title: string
  titleSeparator: string
  trackImageAltSuffix: string
  openGraph: OpenGraphOptions
  email: string
}

export interface EnvironmentConfig {
  production: boolean
  siteUrl: string
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
