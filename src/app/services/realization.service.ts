import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RealizationService {

  constructor() { }

  objectRealizationCreate = {
    title: '',
    description: '',
    imagesArray: new Array()
  }

}
