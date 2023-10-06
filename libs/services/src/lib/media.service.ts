import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpProgressEvent,
  HttpResponse,
} from '@angular/common/http'

import {Inject, Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {
  Media,
  ID3Tags,
  CustomResponse,
  PaginatedResponse,
  EnvironmentConfig,
  UpdateMediaPayload,
  ENVIRONMENT_CONFIG,
} from '@workspace/models'

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT_CONFIG) private config: EnvironmentConfig
  ) {}

  getMedia(pageSize = 10, page = 1, query = ''): Observable<PaginatedResponse<Media[]>> {
    const params = {
      page_size: pageSize,
      q: query,
      page,
    }
    return this.http.get<PaginatedResponse<Media[]>>(
      this.config.storageServiceUrl + '/media',
      {params}
    )
  }

  getMediaById(id: number | string): Observable<CustomResponse<Media>> {
    return this.http.get<CustomResponse<Media>>(
      this.config.storageServiceUrl + '/media/' + id
    )
  }

  getMediaTags(id: number): Observable<CustomResponse<ID3Tags>> {
    return this.http.get<CustomResponse<ID3Tags>>(
      this.config.storageServiceUrl + '/media/' + id + '/id3'
    )
  }

  updateMediaTags(id: number, tags: ID3Tags): Observable<CustomResponse<ID3Tags>> {
    return this.http.patch<CustomResponse<ID3Tags>>(
      this.config.storageServiceUrl + '/media/' + id + '/id3',
      tags
    )
  }

  getMediaCover(id: number): Observable<any> {
    return this.http.get<any>(
      this.config.storageServiceUrl + '/media/' + id + '/id3/picture'
    )
  }

  uploadByFile(file: File): Observable<any> {
    const formData = new FormData()
    formData.append('file', file, file.name)
    const meta = {
      file_name: file.name,
    }
    formData.append('data', JSON.stringify(meta))

    return this.http.post(this.config.storageServiceUrl + '/media', formData, {
      reportProgress: true,
      observe: 'events',
    })
  }

  isHttpResponse<T>(event: HttpEvent<T>): event is HttpResponse<T> {
    return event.type === HttpEventType.Response
  }

  isHttpProgressEvent(event: HttpEvent<unknown>): event is HttpProgressEvent {
    return (
      event.type === HttpEventType.DownloadProgress ||
      event.type === HttpEventType.UploadProgress
    )
  }

  uploadByURL(url: string, fileName: string): Observable<CustomResponse<Media>> {
    const formData = new FormData()
    const uploadMetaData = {
      url,
      file_name: fileName,
    }
    formData.append('data', JSON.stringify(uploadMetaData))
    return this.http.post<CustomResponse<Media>>(
      this.config.storageServiceUrl + '/media',
      formData
    )
  }

  deleteMedia(id: number): Observable<CustomResponse<Media>> {
    return this.http.delete<CustomResponse<Media>>(
      this.config.storageServiceUrl + '/media/' + id
    )
  }

  updateMedia(id: number, media: UpdateMediaPayload): Observable<CustomResponse<Media>> {
    return this.http.patch<CustomResponse<Media>>(
      this.config.storageServiceUrl + '/media/' + id,
      media
    )
  }
}
