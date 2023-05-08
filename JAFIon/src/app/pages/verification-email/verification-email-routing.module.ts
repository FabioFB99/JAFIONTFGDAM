import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationEmailPage } from './verification-email.page';

const routes: Routes = [
  {
    path: '',
    component: VerificationEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationEmailPageRoutingModule {}
