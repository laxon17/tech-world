import { Component } from '@angular/core';
import { DeviceInterface } from 'src/app/Interfaces';
import { ProductTools } from 'src/app/ProductTools';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  protected favoriteProducts: DeviceInterface[] = []

  ngOnInit() {
    this.favoriteProducts = ProductTools.assignCollection('favorites')
  }

  removeFromFavorites(device: any) {
    this.favoriteProducts = ProductTools.removeFromCollection(device[0].target.dataset.deviceid, device[1])
  }
}
