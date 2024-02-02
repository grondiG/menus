import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { userIsLoadingSelector } from "./store/user/user.selectors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private store = inject(Store);
  isLoading$: Observable<boolean> = this.store.select(userIsLoadingSelector);

  title = 'menus';
}
