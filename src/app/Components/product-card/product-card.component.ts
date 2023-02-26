import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { DeviceInterface } from 'src/app/Interfaces';
import { BrandInterface } from 'src/app/Interfaces';
import { CategoryInterface } from 'src/app/Interfaces';
import categoryData from 'src/assets/data/categories.json';
import brandData from 'src/assets/data/brands.json';
import { ProductTools } from 'src/app/ProductTools';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  private brands: BrandInterface[] = [];
  private categories: CategoryInterface[] = [];

  @Input() product: DeviceInterface = {
    id: 0,
    brand: 0,
    model: '',
    categories: [],
    code: '',
    prices: {
        value: 0,
        discount: 0
    },
    specs: {
      storage: 0,
      ram: 0,
      battery: 0,
      display: 0,
      camera: 0,
      system: '',
      simTray: 0
    },
    description: '',
    preview: {
        image: '',
        alternative:  ''
    },
    colors_available: [],
    stock: 0
  };

  constructor (private _snackBar: MatSnackBar) {
    this.categories = categoryData;
    this.brands = brandData;
  }

  getBrand(): String {
    return this.brands.filter(brand => brand.id === this.product.brand)[0].title;
  }

  getTitle(): String {
    if(this.product.specs.storage != 0) {
      return `${this.product.model} /  ${this.product.specs.ram + 'GB' ?? ''} ${this.getStorageUnit(this.product.specs.storage ?? 0)}`
    }

    return `${this.product.model}`
  }

  getStorageUnit(capacity: Number): String {
    if(capacity == 0) return '';

    if(capacity < 1000) {
      return capacity + 'GB';
    }

    return '1TB';
  }

  getPrice(): String {
    if(this.product.prices.discount) {
      return `&euro; <s>${this.product.prices.value}</s> ${this.calculateDiscount()}`
    }

    return `&euro; ${this.product.prices.value}`
  }

  calculateDiscount(): Number {
    return this.product.prices.value - (this.product.prices.value * (this.product.prices.discount / 100))
  }

  addToCollection(favoriteButton: any, collection: string) {
    let response = ProductTools.addToCollection(collection, favoriteButton.target.dataset.productid)

    this.openSnackBar(response as string)
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 3000
    });
  }
}
