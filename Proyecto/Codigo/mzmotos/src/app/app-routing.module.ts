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
import { UserComponent } from './pages/subpages/user/user.component';
import { ClientComponent } from './pages/subpages/client/client.component';
import { ManagerReportInventoriesComponent } from './pages/subpages/manager-report-inventories/manager-report-inventories.component';
import { ManagerReportSalesComponent } from './pages/subpages/manager-report-sales/manager-report-sales.component';
import { ProductComponent } from './pages/subpages/product/product.component';

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
    canActivate: [AuthGuard],
    children:[
      {
        path:"product",
        component:ProductComponent
      },
      {
        path: '',
        redirectTo: 'product',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'admin',
    component: ManagerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'client',
        component: ClientComponent
      },
      {
        path: 'inventory',
        component: ManagerReportInventoriesComponent
      },
      {
        path: 'order',
        component: ManagerReportSalesComponent
      },
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full'
      }
    ]
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
