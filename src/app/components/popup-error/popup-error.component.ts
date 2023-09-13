import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { PopupManagementService } from 'src/app/services/popup-management.service';

@Component({
  selector: 'app-popup-error',
  templateUrl: './popup-error.component.html',
  styleUrls: ['./popup-error.component.scss'],
  animations: [
    trigger('animInImage', [
      state('void', style({
        opacity: 0,
      })),
      transition(':enter', [
        animate('0.7s', keyframes([
          style({opacity: 0}),
          style({opacity: 0}),
          style({opacity: 1}),
          style({opacity: 1}),
          
        ]))
      ]),
      transition(':leave', [
        animate('0.7s', keyframes([
          style({opacity: 1}),
          style({opacity: 0.8}),
          style({opacity: 0}),
          style({opacity: 0}),
          
        ]))
      ])
    ]),
  ]
})
export class PopupErrorComponent implements OnInit{

  popupList: any = []

  constructor(
    private popupService: PopupManagementService
  ){ }

  ngOnInit(): void {
    // console.log("emiter popup")
    this.errorEmitSubscribe()
  }

  errorEmitSubscribe(){
    this.popupService.popupErrorEmit.subscribe(res => {
      // console.log("STWORZONY popup")
      this.popupList!.push(
        {
          message: res
        }
      )
      setTimeout(() => {
        this.popupList!.splice(0, 1)
      }, 6000);
    })
  }

  close(id: number){
    this.popupList.splice(id, 1)
  }

}

