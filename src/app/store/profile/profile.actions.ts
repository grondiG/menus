import { createAction } from "@ngrx/store";
import {ProfileState} from "./profile.reducer";
import {RegisterData} from "../../core/models/register-data";
import {LoginData} from "../../core/models/login-data";


export const register = createAction("[Profile] Register",
  (data: RegisterData) => ({ data }));
export const loadProfile = createAction("[Profile] Load Profile",
  (data: LoginData) => ({ data }));
export const loadProfileSuccess: any = createAction("[Profile] Load Profile Success",
  (data: ProfileState) => ({ data }));
export const logout = createAction("[Profile] Logout");
