import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { notFoundPageRoutingModule } from './notFoundPage-routing.module';
import { notFoundPageComponent } from './notFoundPage.component';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [notFoundPageComponent],
  imports: [CommonModule, notFoundPageRoutingModule, SharedModule],
})
export class notFoundPageModule {}
