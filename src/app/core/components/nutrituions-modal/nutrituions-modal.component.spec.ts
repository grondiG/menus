import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrituionsModalComponent } from './nutrituions-modal.component';
import { TranslateModule } from '@ngx-translate/core';

describe('NutrituionsModalComponent', () => {
  let component: NutrituionsModalComponent;
  let fixture: ComponentFixture<NutrituionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutrituionsModalComponent, TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutrituionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
