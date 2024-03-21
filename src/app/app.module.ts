import { isDevMode, NgModule } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.store';
import { UserEffects } from './store/user/user.effects';
import { CartEffects } from './store/cart/cart.effects';
import { authorizationInterceptor } from './core/interceptors/authorization.interceptor';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { CheckoutModule } from './pages/checkout/checkout.module';
import { OrderEffects } from './store/order/order.effects';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './app.component';
import { LoadingComponent } from './core/components/loading/loading/loading.component';

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
        EffectsModule.forRoot([ UserEffects, CartEffects, OrderEffects ]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: isDevMode() }),
        BrowserAnimationsModule,
        LoadingComponent,
        CheckoutModule,
        FormsModule
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
