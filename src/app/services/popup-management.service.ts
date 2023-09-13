import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupManagementService {

  popupErrorEmit: EventEmitter<any> = new EventEmitter();
  popupSuccesEmit: EventEmitter<any> = new EventEmitter();

  constructor() { }

  errorEmit(errorMassage: string){
    this.popupErrorEmit.emit(errorMassage)
  }

  succesEmit(doneMassage: string){
    this.popupSuccesEmit.emit(doneMassage)
  }
}
