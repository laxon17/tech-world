import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class PageLoaderService {
  constructor() { }

  private loading$: Subject<boolean> = new BehaviorSubject(false)
  private message$: Subject<string> = new BehaviorSubject('')
  private progressValue$: Subject<number> = new BehaviorSubject(0)

  show(message: string = null!, progressValue: number = null!) {
    this.loading$.next(true)
    this.message$.next(message)
    this.progressValue$.next(progressValue)
  }

  hide() {
    this.loading$.next(false)
    this.message$.next(null!)
    this.progressValue$.next(null!)
  }

  get state() {
    return this.loading$.asObservable()
  }
  get message() {
    return this.message$.asObservable()
  }
  get progressValue() {
    return this.progressValue$.asObservable()
  }

  setMessage(value: string) {
    this.message$.next(value)
  }

  setProgressValue(value: number) {
    this.progressValue$.next(value)
  }
}
