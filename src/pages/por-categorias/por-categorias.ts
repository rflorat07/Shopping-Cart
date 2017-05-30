import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProductosProvider } from './../../providers/productos/productos';

@IonicPage()
@Component({
  selector: 'page-por-categorias',
  templateUrl: 'por-categorias.html',
})
export class PorCategoriasPage {

  categoria: any = {};
  productoPage: string = 'ProductoPage';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productosProvider: ProductosProvider) {

    this.categoria = this.navParams.get("categoria");
    this.productosProvider.cargar_por_categoria(this.categoria.id);
  }

}
