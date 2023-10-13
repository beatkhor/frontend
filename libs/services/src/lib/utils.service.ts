import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'

import {AuthService} from './auth.service'
import {Post, User} from '@workspace/models'

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  static contentScrollToEnd$ = new Subject<void>()

  constructor(private authService: AuthService) {}

  static makeStringUrlSafe(str: string) {
    return encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A')
  }

  static abbrTitlesText(source: any[], count: number) {
    if (!source.length) {
      return ''
    }

    let text = ''
    for (let i = 0; i < source.length && i < count; i++) {
      const element = source[i]
      text += element.title

      if (source.length > 1 && i < count - 1) {
        text += ', '
      }
    }

    if (source.length > count) {
      text += ' and ' + (source.length - count) + ' more'
    }
    return text
  }

  static getPostArtistName(post: Post) {
    if (post.post_meta.overridden_artist_name) {
      return post.post_meta.overridden_artist_name
    }

    if (post.user?.first_name || post.user?.last_name) {
      return (post.user?.first_name ?? '') + ' ' + (post.user?.last_name ?? '')
    }

    if (post.user?.username) {
      return post.user?.username
    }

    return 'Unknown'
  }

  static secondsToMinutesAndSeconds(seconds: number) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
    const formattedSeconds =
      remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds

    return `${formattedMinutes}:${formattedSeconds}`
  }

  getPostDisplayName(post: Post): string {
    if (post.post_meta.overridden_artist_name) {
      return post.post_meta.overridden_artist_name
    }

    if (post.user?.nickname) {
      return post.user.nickname
    }

    return this.getFullName(post.user)
  }

  getFullName(user?: User): string {
    let firstName = '',
      lastName = ''
    const u = this.authService.getUser()

    if (!user) {
      if (u) {
        firstName = u.first_name ?? ''
        lastName = u.last_name ?? ''
      }
    } else {
      firstName = user.first_name || ''
      lastName = user.last_name || ''
    }

    if (!firstName && !lastName) {
      return u?.username || 'N/A'
    }

    return `${firstName || ''} ${lastName || ''}`
  }

  static generatePostCode(): string {
    const date = new Date()
    const ms = (+date).toString()
    return `BK${date.getUTCMonth() + 1}T${ms.slice(8)}`
  }

  static sanitizeForLink(input: string) {
    // Replace non-alphanumeric characters with an empty string
    const sanitizedString = input.replace(/[^a-zA-Z0-9آ-ی]/g, '')

    // Optionally, replace spaces with hyphens
    const cleanString = sanitizedString.replace(/\s+/g, '-')

    // Optionally, convert to lowercase
    return cleanString.toLowerCase()
  }
}
