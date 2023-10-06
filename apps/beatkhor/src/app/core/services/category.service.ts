import {environment} from '@environments/environment'
import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {CustomResponse, Category} from '@workspace/models'

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<CustomResponse<Category[]>> {
    return this.http.get<CustomResponse<Category[]>>(
      environment.contentServiceURL + '/categories'
    )
  }

  createCategory(category: Category): Observable<CustomResponse<Category>> {
    return this.http.post<CustomResponse<Category>>(
      environment.contentServiceURL + '/categories',
      category
    )
  }

  editCategory(id: number, category: Category): Observable<CustomResponse<Category>> {
    category.id = undefined as any
    return this.http.patch<CustomResponse<Category>>(
      environment.contentServiceURL + '/categories/' + id,
      category
    )
  }

  deleteCategory(id: number): Observable<CustomResponse<any>> {
    return this.http.delete<CustomResponse<any>>(
      environment.contentServiceURL + '/categories/' + id
    )
  }
}
