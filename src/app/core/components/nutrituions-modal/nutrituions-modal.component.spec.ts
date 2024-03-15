import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrituionsModalComponent } from './nutrituions-modal.component';
import { mockDish } from '../../../../mock-data/mock-data';

describe('NutrituionsModalComponent', () => {
  let component: NutrituionsModalComponent;
  let fixture: ComponentFixture<NutrituionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutrituionsModalComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutrituionsModalComponent);
    component = fixture.componentInstance;
    component.dish = mockDish;
    component.id = 'test';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
