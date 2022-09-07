import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicineRoutingModule } from './medicine-routing.module';
import { MedicineComponent } from './medicine.component';


@NgModule({
  declarations: [
    MedicineComponent
  ],
  imports: [
    CommonModule,
    MedicineRoutingModule
  ]
})
export class MedicineModule { }
