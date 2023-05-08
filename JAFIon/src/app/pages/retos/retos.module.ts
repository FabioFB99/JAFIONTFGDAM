import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetosPageRoutingModule } from './retos-routing.module';

import { RetosPage } from './retos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetosPageRoutingModule
  ],
  declarations: [RetosPage]
})
export class RetosPageModule {}
