import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterData } from "../../models/router-data.model";
import { ROUTER_DATA } from "../../../app.config";

export interface Route {
  path: string;
  title: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  routes: RouterData[] = inject(ROUTER_DATA);
}
