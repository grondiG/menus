import { NotFoundComponent } from './pages/not-found/not-found.component';
import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './pages/home/home.component';
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { UserEffects } from "./store/user/user.effects";
import { appReducers } from "./app.store";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { authorizationInterceptor } from "./core/interceptors/authorization.interceptor";
import { LoadingComponent } from "./core/components/loading/loading/loading.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([ UserEffects ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    LoadingComponent
  ],
  providers: [
    provideHttpClient(
      withInterceptors([authorizationInterceptor])
    )
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
