import {User} from './user'

export interface LoginResponseDTO {
  token: string
  user: User
}
