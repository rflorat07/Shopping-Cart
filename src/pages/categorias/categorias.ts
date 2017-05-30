import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProductosProvider } from './../../providers/productos/productos';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  porCategorias = 'PorCategoriasPage';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productosProvider: ProductosProvider) {
  }

}
