import {HttpClient} from '@angular/common/http'
import {Inject, Injectable} from '@angular/core'
import {Observable} from 'rxjs'

import {
  Tag,
  CustomResponse,
  EnvironmentConfig,
  ENVIRONMENT_CONFIG,
} from '@workspace/models'

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT_CONFIG) private config: EnvironmentConfig
  ) {}

  read(): Observable<CustomResponse<Tag[]>> {
    return this.http.get<CustomResponse<Tag[]>>(this.config.contentServiceUrl + '/tags')
  }

  create(tag: Tag): Observable<CustomResponse<Tag>> {
    return this.http.post<CustomResponse<Tag>>(
      this.config.contentServiceUrl + '/tags',
      tag
    )
  }

  update(id: number, tag: Tag): Observable<CustomResponse<Tag>> {
    tag.id = undefined as any
    return this.http.patch<CustomResponse<Tag>>(
      this.config.contentServiceUrl + '/tags/' + id,
      tag
    )
  }

  delete(id: number): Observable<CustomResponse<any>> {
    return this.http.delete<CustomResponse<any>>(
      this.config.contentServiceUrl + '/tags/' + id
    )
  }
}
