import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetosPage } from './retos.page';

const routes: Routes = [
  {
    path: '',
    component: RetosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetosPageRoutingModule {}
