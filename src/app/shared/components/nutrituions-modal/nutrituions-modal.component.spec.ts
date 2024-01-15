import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrituionsModalComponent } from './nutrituions-modal.component';

describe('NutrituionsModalComponent', () => {
  let component: NutrituionsModalComponent;
  let fixture: ComponentFixture<NutrituionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NutrituionsModalComponent]
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
