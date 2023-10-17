import {Inject, Injectable} from '@angular/core'

import {ENVIRONMENT_CONFIG, EnvironmentConfig, MetaTags} from '@workspace/models'
import {Meta, Title} from '@angular/platform-browser'
import {DOCUMENT} from '@angular/common'

@Injectable()
export class SEOService {
  scriptType = 'application/json+ld'

  orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url: this.env.siteUrl,
    name: this.env.seo.title,
    logo: this.env.siteUrl + this.env.seo.openGraph.image.src,
    contactPoint: {
      '@type': 'ContactPoint',
      email: this.env.seo.email,
      contactType: 'Customer service',
    },
  }

  constructor(
    private meta: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private dom: Document,
    @Inject(ENVIRONMENT_CONFIG) private env: EnvironmentConfig
  ) {
    this.meta.addTag({
      property: 'theme-color',
      content: '#ffc107',
    })
    this.meta.updateTag({
      property: 'og:site_name',
      content: this.env.seo.title,
    })
    this.meta.updateTag({
      property: 'twitter:card',
      content: 'summary',
    })
  }

  updateMeta(metadata: MetaTags) {
    this.setTitle(metadata.title)
    this.setDescription(metadata.description)
    this.setRobots(metadata.noIndex)
    this.setKeywords(metadata.keywords)

    if (metadata.image) {
      this.setImage(this.env.siteUrl + metadata.image.src, metadata.image.type)
    } else {
      this.removeImage()
    }

    if (metadata.canonicalUrl) {
      this.setCanonicalUrl()
    } else {
      this.removeCanonicalUrl()
    }

    if (metadata.schema) {
      this.setSchema(metadata.schema)
    } else {
      this.removeSchema()
    }
  }

  setTitle(title: string): void {
    this.titleService.setTitle(title)
    this.meta.updateTag({
      property: 'og:title',
      content: title,
    })
    this.meta.updateTag({
      property: 'twitter:title',
      content: title,
    })
  }

  setDescription(description: string): void {
    this.meta.updateTag({
      name: 'description',
      content: description,
    })
    this.meta.updateTag({
      property: 'og:description',
      content: description,
    })
    this.meta.updateTag({
      property: 'twitter:description',
      content: description,
    })
  }

  setRobots(noIndex: boolean) {
    this.meta.updateTag({
      name: 'robots',
      content: noIndex ? 'noindex' : 'index, follow',
    })
  }

  setKeywords(keywords: string) {
    this.meta.updateTag({
      name: 'keywords',
      content: keywords,
    })
  }

  setImage(src: string, type?: string) {
    this.meta.updateTag({
      property: 'og:image',
      content: src,
    })
    this.meta.updateTag({
      property: 'og:image:type',
      content: type ?? 'jpeg',
    })
    this.meta.updateTag({
      property: 'twitter:image',
      content: src,
    })
  }

  removeImage() {
    this.meta.removeTag('og:image')
    this.meta.removeTag('og:image:type')
    this.meta.removeTag('twitter:image')
  }

  setSchema(schema: any) {
    this.removeSchema()
    this.insertSchema(schema)
  }

  setCanonicalUrl(url?: string) {
    this.removeCanonicalUrl()
    let canURL = !url ? this.dom.URL : url
    let link: HTMLLinkElement = this.dom.createElement('link')
    link.setAttribute('rel', 'canonical')
    this.dom.head.appendChild(link)
    link.setAttribute('href', canURL)
  }

  removeCanonicalUrl() {
    const element = this.dom.head.querySelector('link[rel="canonical"]')
    if (element) {
      element.remove()
    }
  }

  /**
   * Builds a seo friendly alt for track images
   * @returns image alt string
   */
  buildTrackImageAlt(artist: string, title: string): string {
    return `${artist} - ${title} ${this.env.seo.trackImageAltSuffix}`
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

  removeSchema(): void {
    const els: any[] = []
    ;['structured-data', 'structured-data-org'].forEach(c => {
      els.push(...Array.from(this.dom.head.getElementsByClassName(c)))
    })
    els.forEach(el => this.dom.head.removeChild(el))
  }
}
