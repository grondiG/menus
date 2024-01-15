import { RestaurantDescriptionPipe } from './restaurant-description.pipe';

describe('RestaurantDescriptionPipe', () => {
  it('create an instance', () => {
    const pipe = new RestaurantDescriptionPipe();
    expect(pipe).toBeTruthy();
  });
});
