import { Component } from '@angular/core';
import { PageLoaderService } from 'src/app/shared/page-loader.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.css']
})
export class PageLoaderComponent {
  constructor(private pageLoaderService: PageLoaderService) { }

  protected loading: boolean = false;
  protected message: string = '';
  protected progressValue: number = 0;
  protected progressValueStyle: string = '';
  private _subscribed: boolean = true;

  ngOnInit(): void {
    this.subscribe();
  }

  private subscribe() {
    this.pageLoaderService.state
      .pipe(takeWhile(() => this._subscribed))
      .subscribe(loading => {
        this.loading = loading;
      });

    this.pageLoaderService.message
      .pipe(takeWhile(() => this._subscribed))
      .subscribe(message => {
          if (!!message) {
            this.message = message;
          }
      });

    this.pageLoaderService.progressValue
      .pipe(takeWhile(() => this._subscribed))
      .subscribe(progressValue => {
        if (!!progressValue) {
          this.progressValue = progressValue;
          this.progressValueStyle = `${progressValue}%`;
        }
    });
  }

  ngOnDestroy() {
    this._subscribed = false;
  }
}
