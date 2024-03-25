import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorModalComponent } from './error-modal.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('ErrorModalComponent', () => {
  let component: ErrorModalComponent;
  let fixture: ComponentFixture<ErrorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorModalComponent],
      providers: [provideMockStore()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
