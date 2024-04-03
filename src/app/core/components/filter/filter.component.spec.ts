import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import SpyInstance = jest.SpyInstance;
import { TranslateModule } from '@ngx-translate/core';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterComponent, TranslateModule.forRoot()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSearch', () => {
    let emitSpy: SpyInstance;

    beforeEach(() => {
      emitSpy = jest.spyOn(component.searchValueChange, 'emit');
    });

    it('should emit provided searchTerm value', () => {
      const searchTerm: string = 'test';

      component.onSearch(searchTerm);

      expect(emitSpy).toBeCalledWith(searchTerm);
    });
  });

  describe('resetSearch', () => {
    let emitSpy: SpyInstance;

    beforeEach(() => {
      emitSpy = jest.spyOn(component.resetSearchChange, 'emit');
    });

    it('should emit void value', () => {
      component.resetSearch();

      expect(emitSpy).toBeCalledWith();
    });
  });
});
