import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablonAnunciosPage } from './tablon-anuncios.page';

const routes: Routes = [
  {
    path: '',
    component: TablonAnunciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablonAnunciosPageRoutingModule {}
