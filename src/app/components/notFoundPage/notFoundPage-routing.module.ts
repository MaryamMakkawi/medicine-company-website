import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { notFoundPageComponent } from './notFoundPage.component';

const routes: Routes = [{ path: '', component: notFoundPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class notFoundPageRoutingModule { }
