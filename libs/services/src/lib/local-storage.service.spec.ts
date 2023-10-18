import {TestBed} from '@angular/core/testing'

import {LocalStorageService} from './local-storage.service'
import {ENVIRONMENT_CONFIG} from '@workspace/models'

describe('StorageService', () => {
  let service: LocalStorageService
  const prefix = 'bk'

  beforeEach(() => {
    Storage.prototype.getItem = jest.fn()
    Storage.prototype.setItem = jest.fn()
    Storage.prototype.clear = jest.fn()
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
        {
          provide: ENVIRONMENT_CONFIG,
          useValue: {
            storageKeyPrefix: prefix,
          },
        },
      ],
    })
    service = TestBed.inject(LocalStorageService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should read item with correct formatted key', () => {
    const mockKey = 'example'
    service.read(mockKey)
    expect(localStorage.getItem).toHaveBeenCalledWith(prefix + '-' + mockKey)
  })

  it('should write item with correct formatted key', () => {
    const mockKey = 'example'
    const value = 'example-value'
    service.write(mockKey, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(prefix + '-' + mockKey, value)
  })

  it('should clear the storage', () => {
    service.clear()
    expect(localStorage.clear).toHaveBeenCalled()
  })
})
