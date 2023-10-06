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
    @Inject(ENVIRONMENT_CONFIG) private config: EnvironmentConfig
  ) {}

  getGenres(): Observable<CustomResponse<Genre[]>> {
    return this.http.get<CustomResponse<Genre[]>>(
      this.config.contentServiceUrl + '/genres'
    )
  }

  createGenres(genres: Genre): Observable<CustomResponse<Genre>> {
    return this.http.post<CustomResponse<Genre>>(
      this.config.contentServiceUrl + '/genres',
      genres
    )
  }

  editGenres(id: number, genres: Genre): Observable<CustomResponse<Genre>> {
    genres.id = undefined as any
    return this.http.patch<CustomResponse<Genre>>(
      this.config.contentServiceUrl + '/genres/' + id,
      genres
    )
  }

  deleteGenres(id: number): Observable<CustomResponse<Genre>> {
    return this.http.delete<CustomResponse<Genre>>(
      this.config.contentServiceUrl + '/genres/' + id
    )
  }
}