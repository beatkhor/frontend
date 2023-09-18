import {environment} from '@environments/environment'
import {BehaviorSubject} from 'rxjs'

declare var tus: any

export class TusdUpload {
  upload: any
  file: File
  inProgress = new BehaviorSubject<any>({})
  progress = new BehaviorSubject<any>({})
  code: string
  parent: string

  constructor(file: File, code: string) {
    this.file = file
    this.code = code
    this.parent = ''
  }

  start() {
    this.inProgress.next(true)
    this.upload = new tus.Upload(this.file, {
      chunkSize: 2000_000,
      endpoint: environment.uploaderServiceURL,
      retryDelays: [0],
      metadata: {
        filename: this.file.name,
        filetype: this.file.type,
      },
      onError: (err: any) => {
        this.progress.error(err)
        this.inProgress.next(false)
      },
      onProgress: (bytesUploaded: number, bytesTotal: number) => {
        const percentage = (bytesUploaded / bytesTotal) * 100
        const uploadProgress = Math.round(percentage)
        this.progress.next(uploadProgress)
      },
      onSuccess: () => {
        this.progress.next(100)
        this.inProgress.next(false)
      },
    })
    this.upload.start()
  }
}
