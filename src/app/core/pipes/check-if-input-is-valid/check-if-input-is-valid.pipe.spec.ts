import { CheckIfInputIsValidPipe } from './check-if-input-is-valid.pipe';

describe('CheckIfInputIsValidPipe', () => {
  it('create an instance', () => {
    const pipe = new CheckIfInputIsValidPipe();
    expect(pipe).toBeTruthy();
  });
});
