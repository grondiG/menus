import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ROUTER_DATA, RouterData } from '../../../app-routing.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  routerData: RouterData[] = inject(ROUTER_DATA);
}
