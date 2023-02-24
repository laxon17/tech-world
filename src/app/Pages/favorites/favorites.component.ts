import { Component } from '@angular/core';
import { ProductTools } from 'src/app/ProductTools';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  protected favoriteProducts: [] = []

  ngOnInit() {
    let ids = ProductTools.getCollection('favorites')

    console.log
  }
}
