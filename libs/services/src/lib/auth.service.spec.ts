import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import {TestBed} from '@angular/core/testing'

import {CustomResponse, LoginResponseDTO} from '@workspace/models'
import {AUTH_SERVICE_URL_CONFIG, AuthService} from './auth.service'
import {LocalStorageService} from './local-storage.service'

describe('AuthService', () => {
  let service: AuthService
  let httpTestingController: HttpTestingController
  let localStorageServiceMock: LocalStorageService
  const authServiceUrl = 'example.com'

  beforeEach(() => {
    localStorageServiceMock = {read: jest.fn(), clear: jest.fn(), write: jest.fn()} as any

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: LocalStorageService,
          useValue: localStorageServiceMock,
        },
        {
          provide: AUTH_SERVICE_URL_CONFIG,
          useValue: authServiceUrl,
        },
      ],
    })
    service = TestBed.inject(AuthService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should read info using storage service', () => {
    service.isLoggedIn()
    expect(localStorageServiceMock.read).toHaveBeenCalled()
  })

  it('should read user data using storage service', () => {
    service.getLoggedInUser()
    expect(localStorageServiceMock.read).toHaveBeenCalledTimes(6)
  })

  it('should read user data using storage service', () => {
    service.putLoggedInUser({})
    expect(localStorageServiceMock.write).toHaveBeenCalledTimes(6)
  })

  it('should login using credentials', () => {
    const mockResponse: CustomResponse<LoginResponseDTO> = {
      ok: true,
      code: 200,
      result: {
        token: '',
        user: {
          id: 1,
          first_name: 'First',
          last_name: 'Last',
          role_id: 2,
          status: 3,
          username: 'example',
          profile_completed: false,
        },
      },
    }

    service.login('username', 'password').subscribe(result => {
      expect(JSON.stringify(result)).toBe(JSON.stringify(mockResponse))
    })

    const req = httpTestingController.expectOne(authServiceUrl + '/auth/login')
    expect(req.request.method).toBe('POST')

    req.flush(mockResponse)
  })

  it('should call clear() from local storage service', () => {
    service.reset()
    expect(localStorageServiceMock.clear).toHaveBeenCalled()
  })
})
