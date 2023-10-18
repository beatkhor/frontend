import {Inject, Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {
  Genre,
  CustomResponse,
  EnvironmentConfig,
  ENVIRONMENT_CONFIG,
} from '@workspace/models'

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT_CONFIG) private env: EnvironmentConfig
  ) {}

  read(): Observable<CustomResponse<Genre[]>> {
    return this.http.get<CustomResponse<Genre[]>>(this.env.contentServiceUrl + '/genres')
  }

  create(genres: Genre): Observable<CustomResponse<Genre>> {
    return this.http.post<CustomResponse<Genre>>(
      this.env.contentServiceUrl + '/genres',
      genres
    )
  }

  edit(id: number, genres: Genre): Observable<CustomResponse<Genre>> {
    genres.id = undefined as any
    return this.http.patch<CustomResponse<Genre>>(
      this.env.contentServiceUrl + '/genres/' + id,
      genres
    )
  }

  delete(id: number): Observable<CustomResponse<Genre>> {
    return this.http.delete<CustomResponse<Genre>>(
      this.env.contentServiceUrl + '/genres/' + id
    )
  }
}
