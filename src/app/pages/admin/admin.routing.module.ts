import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { AddProductsComponent } from './add-products/add-products.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'manage-products',
        component: ManageProductsComponent
      },
      {
        path: 'add-products',
        component: AddProductsComponent
      }
    ]
  },

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AdminRoutingModule { }
