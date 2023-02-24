import { Component } from '@angular/core';
import { DeviceInterface } from '../../Interfaces';
import deviceData from 'src/assets/data/devices.json';
import brandData from 'src/assets/data/brands.json';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  protected devices: DeviceInterface[] = []

  private selectedBrands: Number[] = []
  private selectedCategories: Number[] = []
  private sortOrder: String = ''
  private searchKeyword: String = ''
  private hasDiscount: Boolean = false

  constructor() {
    this.devices = deviceData
    this.sortOrder = 'def'
  }

  setBrands(brands: Number[]): void {
    this.selectedBrands = brands

    this.filtersChanged()
  }

  setCategories(categories: Number[]): void {
    this.selectedCategories = categories

    this.filtersChanged()
  }

  setSortOrder(order: String): void {
    this.sortOrder = order

    this.filtersChanged()
  }

  setKeyword(keyword: String) {
    this.searchKeyword = keyword

    this.filtersChanged()
  }

  setDiscount(hasDiscount: Boolean) {
    this.hasDiscount = hasDiscount

    this.filtersChanged()
  }

  filtersChanged(): void {
    let filteredDevices = deviceData

    // Filter by brands if any
    if(this.selectedBrands.length) {
      filteredDevices = filteredDevices.filter(device => this.selectedBrands.includes(device.brand))
    }

    // Filter by categories if any
    if(this.selectedCategories.length) {
      filteredDevices = filteredDevices.filter(device => this.selectedCategories.some(category => {
        return device.categories.includes(category as number);
      }))
    }

    // Change sort order if requested
    switch(this.sortOrder) {
      case 'pr-as':
        filteredDevices = filteredDevices.sort((prev, next) => {
          return this.calculatePrice(prev.prices) > this.calculatePrice(next.prices) ? 1 : -1
        })
        break
      case 'pr-de':
        filteredDevices = filteredDevices.sort((prev, next) => {
          return this.calculatePrice(prev.prices) < this.calculatePrice(next.prices) ? 1 : -1
        })
        break
      case 'na-as':
        filteredDevices = filteredDevices.sort((prev, next) => {
          return prev.model > next.model ? 1 : -1
        })
        break
      case 'na-de':
        filteredDevices = filteredDevices.sort((prev, next) => {
          return prev.model < next.model ? 1 : -1
        })
        break
      default:
        filteredDevices = filteredDevices
    }

    // Filter by keyword if set
    if(this.searchKeyword) {
      filteredDevices = filteredDevices.filter(device => {
        return device.model.toLowerCase().indexOf(this.searchKeyword.toLowerCase() as string) !== -1 ||
                this.getBrandName(device.brand).indexOf(this.searchKeyword.toLowerCase() as string) !== -1
      })
    }

    // Filter by discount if true
    if(this.hasDiscount) {
      filteredDevices = filteredDevices.filter(device => device.prices.discount !== 0)
    }

    this.devices = filteredDevices
  }

  getBrandName(brandId: number) {
    return brandData.filter(brand => brand.id === brandId)[0].title.toLowerCase()
  }

  calculatePrice(priceObj: { value: Number, discount?: Number | 0 }): number | Number {
    if(priceObj.discount) {
      return priceObj.value as any - (priceObj.value as any * (priceObj.discount as any / 100))
    }

    return priceObj.value
  }
}

