import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SwiperModule } from 'swiper/angular';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}
@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    SwiperModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [SwiperModule, LottieModule]
})
export class SharedModule {}
