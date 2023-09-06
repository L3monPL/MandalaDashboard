import { Component, ElementRef, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  private typed?: Typed;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const options = {
      strings: ['dla Twoich potrzeb.', 'dla każdego.', 'do Twoich wymagań.', 'do Twojego stylu.'],
      typeSpeed: 70, // typing speed in milliseconds
      backSpeed: 50, // backspacing speed in milliseconds
      loop: true // loop the animation
    };

    // Initialize Typed.js with the options
    this.typed = new Typed(this.el.nativeElement.querySelector('.typing-element'), options);
  }

}
