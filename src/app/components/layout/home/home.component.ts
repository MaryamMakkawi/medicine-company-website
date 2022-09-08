import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import SwiperCore, {
  Autoplay,
  Pagination,
  EffectCoverflow,
  Navigation,
} from 'swiper';

SwiperCore.use([Autoplay, Pagination, EffectCoverflow, Navigation]);

import { AnimationOptions } from 'ngx-lottie';
import { ApiService } from 'src/app/services/api.service';
import { Offer } from 'src/app/interfaces/offer.model';
import { OfferDetails } from 'src/app/interfaces/offerDetails.model';

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

  id: number | undefined;
  offer: Offer | undefined;
  offerAll: Offer[] | undefined;
  offerDetails: OfferDetails[] = [];

  options: AnimationOptions = {
    path: '../../../../assets/images/medicine-pills.json',
  };

  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.currentDate = new Date().getDate();
    this.currentDay = new Date().getDay();
    this.currentYear = new Date().getFullYear();
    // All Offer
    this.api
      .get('http://localhost/aphamea_project/web/index.php/offer/get-all')
      .subscribe({
        next: (res: any) => {
          this.offerAll = res.offers;
          console.log(res.offers);
        },
      });
  }

  displayOfferDetails(id: number) {
    // One Offer
    this.api
      .get(`http://localhost/aphamea_project/web/index.php/offer/get?id=${id}`)
      .subscribe({
        next: (res: any) => {
          if (res.status == 'ok') {
            this.offer = res.offer;
            this.offerDetails = res.offerDetails;
            console.log(res);
          }
        },
      });
  }
}
