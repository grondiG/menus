import { FormInputErrorPipe } from './form-input-error-required.pipe';

describe('FormInputErrorRequiredPipe', () => {
  it('create an instance', () => {
    const pipe = new FormInputErrorPipe();
    expect(pipe).toBeTruthy();
  });
});
