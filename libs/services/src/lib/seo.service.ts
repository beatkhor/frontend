import {ActivatedRouteSnapshot} from '@angular/router'
import {Inject, Injectable} from '@angular/core'

import {ENVIRONMENT_CONFIG, EnvironmentConfig, RouteData} from '@workspace/models'
import {Meta, Title} from '@angular/platform-browser'

@Injectable()
export class SEOService {
  constructor(
    private meta: Meta,
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
    const title = titleList.join(this.env.seo.titleSeparator)
    this.setTitle(title)

    const descriptionList = this.buildPageDescription(route).reverse()
    const description = descriptionList.join(this.env.seo.titleSeparator)
    this.setDescription(description)
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

    return titles
  }

  /**
   * Builds the page description recursively based on activated route and it's activated children
   * @param snapshot Activated route snapshot
   * @returns
   */
  private buildPageDescription(snapshot: ActivatedRouteSnapshot): string[] {
    const description: string[] = []
    const data = snapshot.data as RouteData

    if (data.description) {
      description.push(data.description)
    }

    for (const child of snapshot.children) {
      if (child.routeConfig?.path) {
        description.push(...this.buildPageDescription(child))
        break
      }
    }

    return description
  }

  /**
   * Updates the title of the page
   * @param title title of the page
   */
  setTitle(title: string): void {
    this.titleService.setTitle(title)
  }

  /**
   * Updates the description of the page
   * @param description description of the page
   */
  setDescription(description: string): void {
    this.meta.updateTag({
      name: 'description',
      content: description,
    })
  }

  /**
   * Builds a seo friendly alt for track images
   * @returns image alt string
   */
  buildTrackImageAlt(artist: string, title: string): string {
    return `${artist} - ${title} ${this.env.seo.trackImageAltSuffix}`
  }
}
