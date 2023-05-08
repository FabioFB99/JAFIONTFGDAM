import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

import { InicioPage } from './inicio.page';

export const routesInicio: Routes = [
  {
    path: 'inicio',
    component: InicioPage,
    children: [
      {
        path: 'cuenta',
        loadChildren: () => import('../cuenta/cuenta.module').then(m => m.CuentaPageModule)
      },{
        path: 'tablon',
        loadChildren: () => import('../tablon-anuncios/tablon-anuncios.module').then(m => m.TablonAnunciosPageModule)
      },{
        path: 'chat',
        loadChildren: () => import('../chat/chat.module').then(m => m.ChatPageModule)
      },{
        path: 'retos',
        loadChildren: () => import('../retos/retos.module').then( m => m.RetosPageModule)
      },{
        path: '',
        redirectTo: '/inicio/cuenta',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/inicio/cuenta',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesInicio)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
