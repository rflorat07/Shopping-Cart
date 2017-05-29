import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductosProvider } from './../../providers/productos/productos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private productosProvider: ProductosProvider) {

  }

  siguiente_pagina(infiniteScroll) {
    this.productosProvider.cargar_todos().then(() => {
      infiniteScroll.complete()
    })
  }

}
