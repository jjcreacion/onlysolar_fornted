import { Component, OnInit } from '@angular/core';
import { Autoplay } from 'swiper';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})
export class SlidesComponent implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 800,
    autoplay: true,
    loop: true,
    pagination: false
  };

  constructor() { }

  ngOnInit() {}

}
