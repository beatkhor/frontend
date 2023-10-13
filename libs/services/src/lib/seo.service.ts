import {Inject, Injectable} from '@angular/core'

import {ENVIRONMENT_CONFIG, EnvironmentConfig} from '@workspace/models'

@Injectable()
export class SEOService {
  constructor(@Inject(ENVIRONMENT_CONFIG) private env: EnvironmentConfig) {}

  handleTitle() {}
}
