import {Inject, Injectable} from '@angular/core'

import {ENVIRONMENT_CONFIG, EnvironmentConfig, MetaTags} from '@workspace/models'
import {Meta, Title} from '@angular/platform-browser'
import {DOCUMENT} from '@angular/common'

@Injectable()
export class SEOService {
  scriptType = 'application/json+ld'

  constructor(
    private meta: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private dom: Document,
    @Inject(ENVIRONMENT_CONFIG) private env: EnvironmentConfig
  ) {
    this.meta.updateTag({
      property: 'og:site_name',
      content: this.env.seo.title,
    })
  }

  updateMeta(metadata: MetaTags) {
    // Update all tags and remove them if they don't exists
  }

  /**
   * Updates the title of the page
   * @param title title of the page
   */
  setTitle(title: string): void {
    this.titleService.setTitle(title)
    this.meta.updateTag({
      property: 'og:title',
      content: title,
    })
  }

  /**
   * Updates the open graph image of the page
   * @param src source of the image
   * @param type type of the image
   */
  setImage(src: string, type?: string) {
    this.meta.addTag({
      property: 'og:image',
      content: src,
    })
    this.meta.updateTag({
      property: 'og:image:type',
      content: type ?? 'jpeg',
    })
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
    this.meta.updateTag({
      property: 'og:description',
      content: description,
    })
  }

  /**
   * Updates the page schema
   * @param schema page schema
   */
  setSchema(schema: any) {
    this.removeStructuredData()
    this.insertSchema(schema)
  }

  setCanonicalURL(url?: string) {
    let canURL = !url ? this.dom.URL : url
    let link: HTMLLinkElement = this.dom.createElement('link')
    link.setAttribute('rel', 'canonical')
    this.dom.head.appendChild(link)
    link.setAttribute('href', canURL)
  }

  /**
   * Builds a seo friendly alt for track images
   * @returns image alt string
   */
  buildTrackImageAlt(artist: string, title: string): string {
    return `${artist} - ${title} ${this.env.seo.trackImageAltSuffix}`
  }

  buildOrgSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      url: this.env.siteUrl,
      name: this.env.seo.title,
      logo: this.env.siteUrl + this.env.seo.openGraph.image.src,
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@beatkhor.com',
        contactType: 'Customer service',
      },
    }
  }

  private insertSchema(schema: Record<string, any>, className = 'structured-data'): void {
    let script: any
    let shouldAppend = false
    if (this.dom.head.getElementsByClassName(className).length) {
      script = this.dom.head.getElementsByClassName(className)[0]
    } else {
      script = this.dom.createElement('script')
      shouldAppend = true
    }
    script.setAttribute('class', className)
    script.type = this.scriptType
    script.text = JSON.stringify(schema)
    if (shouldAppend) {
      this.dom.head.appendChild(script)
    }
  }

  private removeStructuredData(): void {
    const els: any[] = []
    ;['structured-data', 'structured-data-org'].forEach(c => {
      els.push(...Array.from(this.dom.head.getElementsByClassName(c)))
    })
    els.forEach(el => this.dom.head.removeChild(el))
  }
}
