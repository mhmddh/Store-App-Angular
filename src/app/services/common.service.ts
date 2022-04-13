import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Product, Brand, Category, User, Paginater } from '../common/models/model';



@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private apiURL = "//127.0.0.1:8000/api";
  private user!: any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  }

  httpUploadOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    })
  }

  constructor(private router: Router, private httpClient: HttpClient) { }


  getPaginatedBrands(paginater: Paginater): Observable<any> {
    return this.httpClient.get<Brand[]>(this.apiURL + '/brands/' + paginater.limit + '/' + paginater.currentPage + '/' + paginater.sortParameters[0] + '/' + paginater.sortParameters[1], this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  searchBrands(paginater: Paginater): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/search-brand/'+ paginater.searchKey + '/' + paginater.searchValue + '/' + paginater.limit + '/' + paginater.currentPage + '/' + paginater.sortParameters[0] + '/' + paginater.sortParameters[1], this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllBrands(): Observable<Brand> {
    return this.httpClient.get<any>(this.apiURL + '/brands', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  createBrand(brand: Brand): Observable<any> {
    return this.httpClient.post<Brand>(this.apiURL + '/create-brand', JSON.stringify(brand), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  deleteBrand(id: number) {
    return this.httpClient.delete<Brand>(this.apiURL + '/delete-brand/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  findBrand(id: number): Observable<Brand> {
    return this.httpClient.get<Brand>(this.apiURL + '/edit-brand/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateBrand(id: number, brand: Brand): Observable<Brand> {
    return this.httpClient.put<Brand>(this.apiURL + '/update-brand/' + id, JSON.stringify(brand), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  uploadBrandFile(id: number, formData: FormData): Observable<any> {
    return this.httpClient.post(this.apiURL + '/upload-brand-file/' + id, formData, this.httpUploadOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getPaginatedProducts(paginater: Paginater): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/products/' + paginater.limit + '/' + paginater.currentPage + '/' + paginater.sortParameters[0] + '/' + paginater.sortParameters[1], this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  searchProducts(paginater: Paginater): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/search-product/'+ paginater.searchKey + '/' + paginater.searchValue + '/' + paginater.limit + '/' + paginater.currentPage + '/' + paginater.sortParameters[0] + '/' + paginater.sortParameters[1], this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  createProduct(product: any): Observable<Product> {
    return this.httpClient.post<Product>(this.apiURL + '/create-product', JSON.stringify(product), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  deleteProduct(id: number) {
    return this.httpClient.delete<Product>(this.apiURL + '/delete-product/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  findProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.apiURL + '/edit-product/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.httpClient.put<Product>(this.apiURL + '/update-product/' + id, JSON.stringify(product), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getPaginatedCategories(paginater: Paginater): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/categories/' + paginater.limit + '/' + paginater.currentPage + '/' + paginater.sortParameters[0] + '/' + paginater.sortParameters[1], this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  searchCategories(paginater: Paginater): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/search-category/'+ paginater.searchKey + '/' + paginater.searchValue + '/' + paginater.limit + '/' + paginater.currentPage + '/' + paginater.sortParameters[0] + '/' + paginater.sortParameters[1], this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllCategories(): Observable<Category> {
    return this.httpClient.get<any>(this.apiURL + '/categories', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  createCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.apiURL + '/create-category', JSON.stringify(category), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  findCategory(id: number): Observable<Category> {
    return this.httpClient.get<Category>(this.apiURL + '/edit-category/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.httpClient.put<Category>(this.apiURL + '/update-category/' + id, JSON.stringify(category), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  deleteCategory(id: number) {
    return this.httpClient.delete<Category>(this.apiURL + '/delete-category/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getUserDetails(id: number) {
    return this.httpClient.get<User>(this.apiURL + '/user/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.httpClient.put<User>(this.apiURL + '/update-user/' + id, JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
