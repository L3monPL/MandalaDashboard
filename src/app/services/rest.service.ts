import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private PATH = '/api/v1'

  constructor(
    private http: HttpClient
  ) { }

  //------------------------------------------------------------------------//
  // GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET//
  //------------------------------------------------------------------------//

  getRealizationsList(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.PATH + `/list`, {
      observe: 'response',
      responseType: 'json'
    })
  }

  //------------------------------------------------------------------------//

  getRealizationsImage(id: number): Observable<Blob> {
    return this.http.get(this.PATH + `/picture/question/${id}`, { 
      responseType: 'blob' 
    });
  }

  //------------------------------------------------------------------------//

  //------------------------------------------------------------------------//
  // POST POST POST POST POST POST POST POST POST POST POST POST POST POST  //
  //------------------------------------------------------------------------//

  postRealization(
    title: string,
    description: string
  ): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.PATH, {
      title: title,
      description: description
    }, {
      observe: 'response',
      responseType: 'json',
    })
  }

  //------------------------------------------------------------------------//

  postRealizationImage(id: number, image: Blob): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream'
    });
    return this.http.put<any>(this.PATH + `/picture/question/${id}/update`, 
    image
    , {
      headers
    })
  }

  //------------------------------------------------------------------------//

  
}
