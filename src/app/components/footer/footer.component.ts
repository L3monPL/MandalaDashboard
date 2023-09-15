import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  openMap(){
    window.open(`https://www.google.com/maps/place/Wakacyjna+19%2F2,+60-185+Sk%C3%B3rzewo/@52.40076,16.785775,17z/data=!3m1!4b1!4m5!3m4!1s0x470445d1098716c1:0x6fe452cc4c29acf5!8m2!3d52.40076!4d16.785775?entry=ttu`)
  }
}
