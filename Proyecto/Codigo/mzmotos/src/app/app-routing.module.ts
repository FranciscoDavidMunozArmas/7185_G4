import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { ClientsComponent } from './components/clients/clients.component';

import { SalesmanComponent } from './pages/salesman/salesman.component';
import { AgendaComponent } from './pages/subpages/agenda/agenda.component';
import { LoginComponent } from './pages/login/login.component';
import { ManagerComponent } from './pages/manager/manager.component';
import { CatalogueComponent } from './pages/subpages/catalogue/catalogue.component';
import { WarehouseComponent } from './pages/warehouse/warehouse.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'salesman',
    component: SalesmanComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'agenda',
        component: AgendaComponent
      },
      {
        path: 'catalogo',
        component: CatalogueComponent
      },
      {
        path: 'clientes',
        component: ClientsComponent
      },
      {
        path: '',
        redirectTo: 'agenda',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'warehouse',
    component: WarehouseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: ManagerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
