import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, LayoutRoutingModule,ReactiveFormsModule],
})
export class LayoutModule {}
