import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

export interface RealizationListPaginator{
  listCount: number,
  list: Array<Realization>
}

export interface Realization{
  id: number,
  title: string,
  description: string,
  images: Array<any>,
  created_at: string
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private PATH = '/api'

  constructor(
    private http: HttpClient
  ) { }

  //------------------------------------------------------------------------//
  // GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET//
  //------------------------------------------------------------------------//

  getUserAuth(): Observable<HttpResponse<any>> {
    let token = localStorage.getItem('auth_app_token')
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    return this.http.get<any>(this.PATH + `/users/auth`, {
      observe: 'response',
      responseType: 'json',
      headers: headers
    })
  }

  //------------------------------------------------------------------------//

  getRealizationsListPaginator(page?: number): Observable<HttpResponse<RealizationListPaginator>> {
    let param = new HttpParams();
    if (page) {
      param = param.append('page', page)
    }
    return this.http.get<RealizationListPaginator>(this.PATH + `/realizations/paginator`, {
      observe: 'response',
      responseType: 'json',
      params: param
    })
  }

  //------------------------------------------------------------------------//

  getRealizationsList(): Observable<HttpResponse<Array<Realization>>> {
    return this.http.get<Array<Realization>>(this.PATH + `/realizations`, {
      observe: 'response',
      responseType: 'json'
    })
  }

  //------------------------------------------------------------------------//

  getRealizationImage(id: number): Observable<Blob> {
    return this.http.get(this.PATH + `/realizations/image/${id}`, { 
      responseType: 'blob' 
    });
  }

  //------------------------------------------------------------------------//

  //------------------------------------------------------------------------//
  // POST POST POST POST POST POST POST POST POST POST POST POST POST POST  //
  //------------------------------------------------------------------------//

  postLogin(
    email: string,
    password: string
  ): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.PATH + `/users/login`, {
      email: email,
      password: password
    }, {
      observe: 'response',
      responseType: 'json',
    })
  }

  //------------------------------------------------------------------------//

  postRealization(
    title: string,
    description: string
  ): Observable<HttpResponse<any>> {
    // let token = localStorage.getItem('auth_app_token')
    // const headers = new HttpHeaders({
    //   'Authorization': `${token}`
    // });
    return this.http.post<any>(this.PATH + `/realizations/private/create`, {
      title: title,
      description: description
    }, {
      observe: 'response',
      responseType: 'json',
      // headers: headers
    })
  }

  //------------------------------------------------------------------------//

  postRealizationImage(id: number, position: number, image: File): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream'
    });
    return this.http.post<any>(this.PATH + `/realizations/private/${id}/image/${position}`, 
    image
    , {
      observe: 'response',
      responseType: 'json'
    })
  }

  //------------------------------------------------------------------------//

  postContactEmail(
    name: string,
    email: string,
    text: string
  ): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.PATH + `/message`, {
      name: name,
      email: email,
      text: text
    }, {
      observe: 'response',
      responseType: 'json'
    })
  }

  //------------------------------------------------------------------------//

  //------------------------------------------------------------------------//
  // DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE  //
  //------------------------------------------------------------------------//

  deleteReazlization(
    id: number
  ): Observable<HttpResponse<any>> {
    return this.http.delete<any>(this.PATH + `/realizations/private/${id}`, {
      observe: 'response',
      responseType: 'json',
    })
  }

  //------------------------------------------------------------------------//
}
