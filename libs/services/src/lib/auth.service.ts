import {Inject, Injectable, InjectionToken} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {CustomResponse, LoginResponseDTO, StorageKeys, User} from '@workspace/models'

import {LocalStorageService} from './local-storage.service'

export const AUTH_SERVICE_URL_CONFIG = new InjectionToken<string>(
  'AUTH_SERVICE_URL_CONFIG'
)

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    @Inject(AUTH_SERVICE_URL_CONFIG) private url: string
  ) {}

  /**
   * Checks if the user is currently logged in and has a user
   * @returns true if the user is logged in
   */
  isLoggedIn(): boolean {
    return Boolean(this.localStorageService.read(StorageKeys.Token))
  }

  /**
   * Collects the current logged in user data
   * @returns the user data as `User`
   */
  getUser(): User | null {
    const user = this.localStorageService.read(StorageKeys.User)

    if (!user) {
      return null
    }

    try {
      return JSON.parse(user) as User
    } catch (error) {
      console.warn('There was an error while parsing user data!')
    }

    return null
  }

  /**
   * Sets user information in local storage
   * @param user information to be stored
   */
  putUser(user: User): void {
    this.localStorageService.write('user', JSON.stringify(user))
  }

  /**
   * Set authorization token used for sending http requests
   * @param token received from backend
   */
  setToken(token: string): void {
    this.localStorageService.write(StorageKeys.Token, token)
  }

  /**
   * Read authorization token from storage
   */
  getToken(): string | null {
    return this.localStorageService.read(StorageKeys.Token)
  }

  /**
   * Send the credentials and receive the auth token and user profile
   * @param identifier The username or the email
   * @param password  User's password
   * @returns `Observable` login http request
   */
  login(
    identifier: string,
    password: string
  ): Observable<CustomResponse<LoginResponseDTO>> {
    return this.http.post<CustomResponse<LoginResponseDTO>>(`${this.url}/auth/login`, {
      identifier,
      password,
    })
  }

  /**
   * Registers the user and sends the account activation link
   * @param email Email to be used for registration
   * @param password password to be used for account creation
   * @returns http register request as observable
   */
  register(email: string, password: string): Observable<CustomResponse<void>> {
    return this.http.post<CustomResponse<void>>(`${this.url}/auth/register`, {
      email,
      password,
    })
  }

  /**
   * Sends a reset password link to the email if the account exists
   * @param email User's email if exists
   * @returns http password recovery request as observable
   */
  requestResetPassword(email: string): Observable<CustomResponse<void>> {
    return this.http.post<CustomResponse<void>>(
      `${this.url}/auth/reset-password/request`,
      {email}
    )
  }

  /**
   * Sets the new password for user's account
   * @param password New password entered by user
   * @param token A token received from the backend
   * @returns reset password http request as observable
   */
  resetPassword(password: string, token: string): Observable<CustomResponse<void>> {
    return this.http.post<CustomResponse<void>>(`${this.url}/auth/reset-password/reset`, {
      password,
      token,
    })
  }

  /**
   * Check if a username exists
   * @param username Chosen username by the user
   * @returns check username http request as observable
   */
  checkUsernameAvailability(username: string) {
    return this.http.get<CustomResponse<any>>(
      `${this.url}/users/check/username/` + username
    )
  }

  /**
   * Get all the current user's profile information
   */
  getMe(): Observable<CustomResponse<User>> {
    return this.http.get<CustomResponse<User>>(`${this.url}/users/me`)
  }

  /**
   * Update my account details
   */
  updateMe(
    first_name: string,
    last_name: string,
    username: string
  ): Observable<CustomResponse<void>> {
    return this.http.patch<CustomResponse<void>>(`${this.url}/users/me`, {
      username,
      first_name,
      last_name,
    })
  }

  /**
   * Clears the current user's authorization token & information
   */
  reset(): void {
    this.localStorageService.clear()
  }
}
