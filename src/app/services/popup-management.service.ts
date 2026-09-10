import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PopupManagementService {

  popupErrorEmit:   EventEmitter<string> = new EventEmitter();
  popupSuccesEmit:  EventEmitter<string> = new EventEmitter();
  popupWarningEmit: EventEmitter<string> = new EventEmitter();

  errorEmit(message: string):   void { this.popupErrorEmit.emit(message); }
  succesEmit(message: string):  void { this.popupSuccesEmit.emit(message); }
  warningEmit(message: string): void { this.popupWarningEmit.emit(message); }
}
