import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertController, IonicModule } from '@ionic/angular';

import { CuentaPageRoutingModule } from './cuenta-routing.module';

import { CuentaPage } from './cuenta.page';
import { EditdataComponent } from 'src/app/componentes/editdata/editdata.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CuentaPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [CuentaPage, EditdataComponent],
  providers: [AlertController]
})
export class CuentaPageModule {}
