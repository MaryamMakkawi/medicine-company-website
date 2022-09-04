import { Component, OnInit } from '@angular/core';

import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  team: AnimationOptions = {
    path: '../../../../assets/lottieFiles/team-blue.json',
  };
  aboutUs: AnimationOptions = {
    path: '../../../../assets/lottieFiles/about-us.json',
  };
}
