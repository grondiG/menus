import { BanWordsValidator } from './ban-words.directive';

describe('BanWordsDirective', () => {
  it('should create an instance', () => {
    const directive: BanWordsValidator = new BanWordsValidator();
    expect(directive).toBeTruthy();
  });
});
