import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import SwiperCore, {
  Autoplay,
  Pagination,
  EffectCoverflow,
  Navigation,
} from 'swiper';

SwiperCore.use([Autoplay, Pagination, EffectCoverflow, Navigation]);

import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  currentDate?: number;
  currentDay?: number;
  currentYear?: number;

  options: AnimationOptions = {
    path: '../../../../assets/images/medicine-pills.json',
  };
  
  ngOnInit(): void {
    this.currentDate = new Date().getDate();
    this.currentDay = new Date().getDay();
    this.currentYear = new Date().getFullYear();
  }


}
