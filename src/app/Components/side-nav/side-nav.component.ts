import { Component, EventEmitter, Output } from '@angular/core';
import { BrandInterface } from 'src/app/Interfaces';
import { CategoryInterface } from 'src/app/Interfaces';
import brands from 'src/assets/data/brands.json';
import categories from 'src/assets/data/categories.json';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  @Output() brandChanged: EventEmitter<any> = new EventEmitter();
  @Output() categoryChanged: EventEmitter<any> = new EventEmitter();
  @Output() sortOrderChanged: EventEmitter<any> = new EventEmitter();
  @Output() discountChanged: EventEmitter<any> = new EventEmitter();
  @Output() clearFiltersEmit: EventEmitter<any> = new EventEmitter();

  public selectedBrands: Number[] = [];
  public selectedCategories: Number[] = [];

  protected brandFilters: BrandInterface[] = [];
  protected categoryFilters: CategoryInterface[] = [];
  protected isChecked: Boolean = false;

  constructor() {
    this.brandFilters = brands;
    this.categoryFilters = categories;
  }

  sendSortOrder(order: String): void {
    this.sortOrderChanged.emit(order)
  }

  sendSelectedBrands(selected: any): void {
    this.selectedBrands = []

    selected.forEach(( option: { value: Number; } ) => {
      this.selectedBrands.push(option.value)
    });

    this.brandChanged.emit(this.selectedBrands)
  }

  sendDiscountChange(ss: any) {
    this.isChecked = ! this.isChecked

    this.discountChanged.emit(this.isChecked)
  }

  sendSelectedCategories(selected: any): void {
    this.selectedCategories = []

    selected.forEach(( option: { value: Number; } ) => {
      this.selectedCategories.push(option.value)
    });

    this.categoryChanged.emit(this.selectedCategories)
  }

  hasNoFilters() {
    if(this.selectedBrands.length || this.selectedCategories.length || this.isChecked) {
      return false
    }

    return true
  }
}
