import { UserData, UserDataDto } from '../../core/models/authentication';

export class UserUtils {
  static mapUserDataDtoToUserData(dto: UserDataDto): UserData {
    return {
      id: dto.id,
      login: dto.login,
      mail: dto.mail,
      restaurantAddress: dto.restaurantAddress,
      restaurantName: dto.restaurantName
    }
  }
}
