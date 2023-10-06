import {InjectionToken} from '@angular/core'

export interface EnvironmentConfig {
  production: boolean
  authServiceUrl: string
  storageKeyPrefix: string
  contentServiceUrl: string
  storageServiceUrl: string
  uploaderServiceUrl: string
  messages: {[key: string]: string}
}

export const ENVIRONMENT_CONFIG = new InjectionToken<EnvironmentConfig>(
  'ENVIRONMENT_CONFIG'
)
