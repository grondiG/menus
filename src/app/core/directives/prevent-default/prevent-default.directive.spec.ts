import { PreventDefaultDirective } from './prevent-default.directive';
import { TestBed } from '@angular/core/testing';

describe('PreventDefaultDirective', () => {
  let directive: PreventDefaultDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreventDefaultDirective]
    });
    directive = TestBed.inject(PreventDefaultDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should prevent default event', () => {
      const event: Event = new Event('submit');
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

      directive.onSubmit(event);

      expect(preventDefaultSpy).toBeCalled();
    });
  });
});
