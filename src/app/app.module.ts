import { isDevMode, NgModule } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
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

const HttpLoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json');

const I18N_CONFIG = {
  defaultLanguage: 'en',
  availableLanguages: [ 'en', 'pl' ],
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [ HttpClient ]
  }
};

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
    FormsModule,
    TranslateModule.forRoot(I18N_CONFIG)
  ],
  providers: [
    provideHttpClient(
      withInterceptors([ authorizationInterceptor ])
    ),
    TranslatePipe
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
