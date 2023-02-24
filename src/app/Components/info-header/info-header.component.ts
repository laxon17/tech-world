import { Component } from '@angular/core';

@Component({
  selector: 'app-info-header',
  templateUrl: './info-header.component.html',
  styleUrls: ['./info-header.component.css']
})
export class InfoHeaderComponent {
  protected links: {path: string, title: string}[] = [];

  constructor() {
    this.links = [
      {path: '/about', title: 'About'},
      {path: '/contact', title: 'Contact us'},
    ];
  }
}
