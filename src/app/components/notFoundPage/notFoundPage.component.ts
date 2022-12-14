import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-notFoundPage',
  templateUrl: './notFoundPage.component.html',
  styleUrls: ['./notFoundPage.component.scss'],
})
export class notFoundPageComponent implements OnInit {
  constructor(private locate: Location) {}
  options: AnimationOptions = {
    path: '../../../assets/images/404-not-found.json',
  };
  ngOnInit(): void {}
  goBack() {
    this.locate.back();
  }

  back() {
    this.locate.back();
  }
}
