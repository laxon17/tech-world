import { Injectable } from '@angular/core';
import { ProductTools } from '../ProductTools';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  hasCartItems() {
    return ProductTools.getCollection('cart').length ? true : false
  }
}
