import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablonAnunciosPageRoutingModule } from './tablon-anuncios-routing.module';

import { TablonAnunciosPage } from './tablon-anuncios.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablonAnunciosPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [TablonAnunciosPage]
})
export class TablonAnunciosPageModule { }
