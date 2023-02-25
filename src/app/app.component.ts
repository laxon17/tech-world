import { Component } from '@angular/core';
import { PageLoaderService } from './shared/page-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Phone-store';

  constructor(protected pageLoaderService: PageLoaderService) { }

  ngOnInit() {
    this.pageLoadTest()
  }

  pageLoadTest() {
    let progress = 0;
    this.pageLoaderService.show('Loading', 0);

   const increment = setInterval(() => {
     progress++;
     if (progress === 100) {
      this.pageLoaderService.hide();
      clearInterval(increment);
     }

     let msg =
      progress < 50 ? 'Loading started' : 'Almost there';

      this.pageLoaderService.setMessage(msg);
      this.pageLoaderService.setProgressValue(progress);
    }, 20);
   }
}
