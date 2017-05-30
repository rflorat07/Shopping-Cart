import { Injectable } from '@angular/core';
import { AlertController, Platform, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { UsuarioProvider } from './../usuario/usuario';

@Injectable()
export class CarritoProvider {

  items: any[] = [];

  constructor(
    public http: Http,
    private storage: Storage,
    private platform: Platform,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private usuarioProvider: UsuarioProvider) {
    this.cargar_storage();
  }

  ver_carrito() {
    let modal: any;

    if (this.usuarioProvider.token) {
      //mostar pagina del carrito
      modal = this.modalCtrl.create("CarritoPage");
    } else {
      // mostrar el login
      modal = this.modalCtrl.create("LoginPage");
    }

    modal.present()

    modal.onDidDismiss((abrirCarrito) => {
      if (abrirCarrito) {
        this.modalCtrl.create("CarritoPage").present();
      }
    });

  }

  agregar_carrito(articulo: any) {
    for (let item of this.items) {
      if (item.codigo == articulo.codigo) {
        this.alertCtrl.create({
          title: "Item existe",
          subTitle: articulo.producto + ", ya se encuentra en su carrito de compras.",
          buttons: ["OK"]
        }).present();

        return;
      }
    }
    this.items.push(articulo);
    this.guardar_storage();
  }

  private guardar_storage() {
    if (this.platform.is('cordova')) {
      //dispositivo
      this.storage.set("items", this.items);
    } else {
      // computadora
      localStorage.setItem("items", JSON.stringify(this.items));
    }
  }

  cargar_storage() {

    let promesa = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        //dispositivo
        this.storage.ready()
          .then(() => {
            this.storage.get("items").then(items => {
              if (items) {
                this.items = items;
              }
              resolve();
            })
          })

      } else {
        //computadora
        if (localStorage.getItem("items")) {
          //Existen items en el localstorage
          this.items = JSON.parse(localStorage.getItem("items"));
        }
        resolve();
      }
    });

    return promesa;

  }



}
