import { Component } from '@angular/core';
import { DeviceInterface } from 'src/app/Interfaces';
import { ProductTools } from 'src/app/ProductTools';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  protected cartProducts: DeviceInterface[] = []

  ngOnInit() {
    this.cartProducts = ProductTools.assignCollection('cart')
  }

  emptyCart() {
    ProductTools.emptyCollection('cart')

    this.cartProducts = ProductTools.assignCollection('cart')
  }

  removeFromCart(device: any) {
    this.cartProducts = ProductTools.removeFromCollection(device[0].target.dataset.deviceid, device[1])
  }

  quantityChanged(input: any) {
    if(input.target.value <= 0) {
      input.target.value = 1
    }

    this.cartProducts = ProductTools.updateQuantity(input.target.dataset.productid, input.target.value)
  }

  calculateTotal() {
    let price = 0

    for(let product of this.cartProducts) {
      price += (this.calculatePrice(product.prices) * product.quantity!)
    }

    return price || 0
  }

  calculatePrice(priceObj: any) {
    if(priceObj.discount != 0) {
      return priceObj.value - (priceObj.value * (priceObj.discount / 100))
    }

    return priceObj.value
  }
}
