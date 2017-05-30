import { Injectable } from '@angular/core';
import { AlertController, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class CarritoProvider {

  items: any[] = [];

  constructor(
    public http: Http,
    private storage: Storage,
    private platform: Platform,
    private alertCtrl: AlertController) { 
      this.cargar_storage();
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
