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
import { NotifierService } from 'src/app/services/notifier.service';
import { Activity } from 'src/app/interfaces/activity.model';

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

  // Offer
  offer: Offer | undefined;
  offerAll: Offer[] | undefined;
  offerDetails: OfferDetails[] = [];

  // Activity
  articleAll!: Activity[] | undefined;
  articleContent: string = '';
  articleImg: string[] | undefined = [];
  options: AnimationOptions = {
    path: '../../../../assets/images/medicine-pills.json',
  };

  constructor(private api: ApiService, private notify: NotifierService) {}
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
        },
      });
    // All Article
    this.api
      .post('http://localhost/aphamea_project/web/index.php/activity/get-all', {
        type: 1,
        searchFilters: {
          filters: [
            { name: 'title', status: false },
            { name: 'content', status: false },
          ],
          searchText: '',
          platform: 0,
        },
      })
      .subscribe({
        next: (res: any) => {
          if (res.status == 'ok') {
            this.articleAll = res.activities;
            console.log(res);
          }
          // else {
          //   this.notify.errorNotification(res.details);
          // }
        },
      });
  }

  displayOfferDetails(id: number) {
    // One Offer
    this.api
      .get(
        `http://localhost/aphamea_project/web/index.php/offer/get?id=${id}`
      )
      .subscribe({
        next: (res: any) => {
          if (res.status == 'ok') {
            console.log(res);
            this.offer = res.offer;
            this.offerDetails = res.offerDetails;
          }
        },
      });
  }

  onArticle(id: number) {
    // One Article
    this.api
      .get(
        `http://localhost/aphamea_project/web/index.php/activity/get?id=${
          id + 1
        }`
      )
      .subscribe({
        next: (res: any) => {
          if (res.status == 'ok') {
            this.articleContent = res.activity.content;
            this.articleImg = res.activity.imgs;
            console.log(res);
          }
        },
      });
  }
}
