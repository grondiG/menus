import { isDevMode, NgModule } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authorizationInterceptor } from './core/interceptors/authorization.interceptor';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './pages/home/home.component';
import { UserEffects } from './store/user/user.effects';
import { appReducers } from './app.store';
import { LoadingComponent } from './core/components/loading/loading/loading.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AppStateEffects } from './store/app-state/app-state.effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([AppStateEffects, UserEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: isDevMode() }),
    BrowserAnimationsModule,
    LoadingComponent
  ],
  providers: [
    provideHttpClient(
      withInterceptors([authorizationInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
