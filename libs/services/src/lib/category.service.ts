import {Inject, Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {
  Category,
  CustomResponse,
  EnvironmentConfig,
  ENVIRONMENT_CONFIG,
} from '@workspace/models'

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT_CONFIG) private config: EnvironmentConfig
  ) {}

  getCategories(): Observable<CustomResponse<Category[]>> {
    return this.http.get<CustomResponse<Category[]>>(
      this.config.contentServiceUrl + '/categories'
    )
  }

  createCategory(category: Category): Observable<CustomResponse<Category>> {
    return this.http.post<CustomResponse<Category>>(
      this.config.contentServiceUrl + '/categories',
      category
    )
  }

  editCategory(id: number, category: Category): Observable<CustomResponse<Category>> {
    category.id = undefined as any
    return this.http.patch<CustomResponse<Category>>(
      this.config.contentServiceUrl + '/categories/' + id,
      category
    )
  }

  deleteCategory(id: number): Observable<CustomResponse<any>> {
    return this.http.delete<CustomResponse<any>>(
      this.config.contentServiceUrl + '/categories/' + id
    )
  }
}
