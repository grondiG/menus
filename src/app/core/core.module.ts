import { NgModule } from '@angular/core';
import { HeaderComponent } from './containers/header/header.component';
import { FooterComponent } from './containers/footer/footer.component';
import { SharedModule } from "../shared/shared.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
  ]
})
export class CoreModule { }
