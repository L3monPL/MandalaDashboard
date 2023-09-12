import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RealizationService {

  realizationListEmit: EventEmitter<any> = new EventEmitter();

  constructor() { }

  objectRealizationCreate = {
    title: '',
    description: '',
    imagesArray: new Array(),
  }

  indexFirstImageSelected?: number

  getRealizationList(){
    this.realizationListEmit.emit()
  }

}
