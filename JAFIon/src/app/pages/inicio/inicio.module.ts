import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InicioPageRoutingModule} from './inicio-routing.module';

import { InicioPage } from './inicio.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    InicioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}
