import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {interval, Subscription, take} from "rxjs";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent {
  public timerValue: number = 0;
  private interval$!: Subscription;

  constructor(private cdr: ChangeDetectorRef) {
  }

  public createTimer(min: number): void {
    if(this.interval$) {
      this.interval$.unsubscribe();
    }
    this.timerValue = min * 60;

    this.interval$ = interval(1000).pipe(
      take(this.timerValue)).subscribe(() => {
      this.timerValue--;
      this.cdr.detectChanges();
    });
  }
}
