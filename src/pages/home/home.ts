import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProductosProvider } from './../../providers/productos/productos';
import { CarritoProvider } from './../../providers/carrito/carrito';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  productoPage: string = 'ProductoPage';

  constructor(
    public navCtrl: NavController,
    private productosProvider: ProductosProvider,
    private carritoProvider: CarritoProvider) { }

  siguiente_pagina(infiniteScroll) {
    this.productosProvider.cargar_todos().then(() => {
      infiniteScroll.complete()
    })
  }

}
