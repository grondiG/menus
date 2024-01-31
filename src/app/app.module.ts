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
import { ProfileEffects } from "./store/profile/profile.effects";
import { appReducers } from "./app.store";

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
    EffectsModule.forRoot([ ProfileEffects ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
