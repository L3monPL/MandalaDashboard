import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { PopupManagementService } from 'src/app/services/popup-management.service';

@Component({
  selector: 'app-popup-done',
  templateUrl: './popup-done.component.html',
  styleUrls: ['./popup-done.component.scss'],
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

export class PopupDoneComponent implements OnInit{

  popupList: any = []

  constructor(
    private popupService: PopupManagementService
  ){ }

  ngOnInit(): void {
    this.succesEmitSubscribe()
  }

  succesEmitSubscribe(){
    this.popupService.popupSuccesEmit.subscribe(res => {
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
