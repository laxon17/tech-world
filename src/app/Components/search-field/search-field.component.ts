import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent {
  @Output() keywordChanged: EventEmitter<any> = new EventEmitter();

  @Input() searchKeyword: String = '';

  sendSearch(): void {
    this.keywordChanged.emit(this.searchKeyword)
  }
}
