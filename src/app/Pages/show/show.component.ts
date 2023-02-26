import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandInterface, DeviceInterface } from 'src/app/Interfaces';
import deviceData from 'src/assets/data/devices.json'
import brands from 'src/assets/data/brands.json';
import categoryData from 'src/assets/data/categories.json';
import { ProductTools } from 'src/app/ProductTools';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {
  public id: string = '';

  protected brand: BrandInterface = {
    id: 0,
    title: '',
    logo: {
      image: '',
      alternative: ''
    }
  };

  protected product: DeviceInterface  = {
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

  protected headers: string[] = [];

  constructor(private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') as string;

    deviceData.forEach(device => {
      if(device.id as unknown == this.id) {
        this.product = device
      }
    })

    this.brand = this.getBrand()
    this.headers = Object.keys(this.product.specs)
  }

  getBrand() {
    return brands.filter(brand => brand.id === this.product.brand)[0] as any;
  }

  getCategories() {
    let categoriesString = ''

    for(let index = 0; index < categoryData.length; index++) {
      if(this.product.categories.includes(categoryData[index].id)) {
        categoriesString += categoryData[index].title + ' '
      }
    }

    return categoriesString
  }

  getSavingsValue() {
    return this.getStorePrice() - this.getPrice()
  }

  getStorePrice(): any {
    return this.product.prices.value * 1.3
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

  getPrice(): any {
    if(this.product.prices.discount) {
      return this.calculateDiscount()
    }

    return this.product.prices.value
  }

  calculateDiscount(): Number {
    return this.product.prices.value - (this.product.prices.value * (this.product.prices.discount / 100))
  }

  exists(): boolean {
    let exists = false
    let currentId = this.id as unknown as number

    for(let device of deviceData) {
      if(device.id == currentId) exists = true
    }
    
    return exists
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
