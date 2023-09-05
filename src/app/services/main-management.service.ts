import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainManagementService {

  smoothScrollEmit: EventEmitter<any> = new EventEmitter();

  smoothScrollFunc(section: string){
    this.smoothScrollEmit.emit(section)
  }

  constructor() { }
}
