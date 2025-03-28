export interface LoginData {
  login: string;
  password: string;
}

export interface RegisterData {
  login: string;
  mail: string;
  restaurantName: string;
  restaurantAddress: string;
  password: string;
  confirmPassword: string;
}

export interface UserDataDto {
  id: string;
  login: string;
  mail: string;
  restaurantName: string;
  restaurantAddress: string;
}

// Define an interface for the entire response object
export interface ResponseDataDto {
  data: UserDataDto;
  token: string;
}

// also possible name UserDataVM, IUserData, EcnUserData, AppUserData
export interface UserData {
  id: string;
  login: string;
  mail: string;
  restaurantName: string;
  restaurantAddress: string;
}
