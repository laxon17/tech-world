import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BrandInterface, DeviceInterface } from 'src/app/Interfaces';
import { ProductTools } from 'src/app/ProductTools';
import brands from 'src/assets/data/brands.json';

@Component({
  selector: 'app-fav-product',
  templateUrl: './fav-product.component.html',
  styleUrls: ['./fav-product.component.css']
})
export class FavProductComponent {
  @Output() itemRemoved: EventEmitter<any> = new EventEmitter();
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
    stock: 0,
    quantity: 0
  };
  @Input() collection: string = ''

  protected brand: BrandInterface = {
    id: 0,
    title: '',
    logo: {
      image: '',
      alternative: ''
    }
  };

  removeFromCollection(device: any, collection: string) {
    this.itemRemoved.emit([device, collection])
  }

  ngOnInit() {
    this.brand = this.getBrand()
  }

  getBrand() {
    return brands.filter(brand => brand.id === this.product.brand)[0] as any;
  }

  getTitle(): String {
    return `${this.product.model} /  ${this.product.specs.ram + 'GB' ?? ''} ${this.getStorageUnit(this.product.specs.storage ?? 0)}`
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
}
