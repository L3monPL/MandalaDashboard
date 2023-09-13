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

  indexFirstImageSelected?: number|null

  getRealizationList(){
    this.realizationListEmit.emit()
  }

}
