import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceInterface } from 'src/app/Interfaces';
import { ProductTools } from 'src/app/ProductTools';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  protected favoriteProducts: DeviceInterface[] = []

  constructor( private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.favoriteProducts = ProductTools.assignCollection('favorites')
  }

  emptyFavorites() {
    ProductTools.emptyCollection('favorites')

    this.favoriteProducts = ProductTools.assignCollection('favorites')
  }

  removeFromFavorites(device: any) {
    this.favoriteProducts = ProductTools.removeFromCollection(device[0].target.dataset.deviceid, device[1])
  }

  addToCollection(product: any, collection: string) {
    let response = ProductTools.addToCollection(collection, product.target.dataset.productid)

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
