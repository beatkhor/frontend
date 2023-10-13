import {ActivatedRouteSnapshot} from '@angular/router'
import {Inject, Injectable} from '@angular/core'

import {ENVIRONMENT_CONFIG, EnvironmentConfig, RouteData} from '@workspace/models'
import {Title} from '@angular/platform-browser'

@Injectable()
export class SEOService {
  constructor(
    private titleService: Title,
    @Inject(ENVIRONMENT_CONFIG) private env: EnvironmentConfig
  ) {}

  /**
   * Handles router changes and updates the seo information based on
   * activated route snapshot and the configured data for each route
   * @param route Activated route snapshot
   */
  handleRouterEvent(route: ActivatedRouteSnapshot | null): void {
    if (!route) {
      return
    }

    const titleList = [this.env.seo.title, ...this.buildPageTitle(route)].reverse()
    console.log(titleList)
    const title = titleList.join(this.env.seo.titleSeparator)
    this.titleService.setTitle(title)
  }

  /**
   * Builds the page title recursively based on activated route and it's activated children
   * @param snapshot Activated route snapshot
   * @returns
   */
  private buildPageTitle(snapshot: ActivatedRouteSnapshot): string[] {
    const titles: string[] = []
    const data = snapshot.data as RouteData

    if (data.title) {
      titles.push(data.title)
    }

    for (const child of snapshot.children) {
      if (child.routeConfig?.path) {
        titles.push(...this.buildPageTitle(child))
        break
      }
    }

    if (!titles.length) {
      console.warn('No route configuration found for title!')
    }

    return titles
  }
}
