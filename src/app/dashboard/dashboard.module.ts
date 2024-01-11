import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DeshboardLayoutComponent } from './layouts/deshboard-layout/deshboard-layout.component';



@NgModule({
  declarations: [
  
    DeshboardLayoutComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
