import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';
import { AdminComponent } from './admin.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminComponent,
    AddProductsComponent,
    ManageProductsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
