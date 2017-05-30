import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { URL_SERVICIOS } from './../../config/url.servicios';

@Injectable()
export class ProductosProvider {

  pagina: number = 0;
  lineas: any[] = [];
  productos: any[] = [];
  categoria: any[] = [];
  resultados: any[] = [];

  constructor(public http: Http) {
    this.cargar_todos();
    this.cargar_lineas();
  }

  cargar_todos() {

    let promesa = new Promise((resolve, reject) => {

      let url = URL_SERVICIOS + "/productos/todos/" + this.pagina;

      this.http.get(url)
        .map((resp) => resp.json())
        .subscribe(data => {
          if (data.error) {
            //Aqui hay un problema
          } else {
            this.productos.push(...data.productos);
            this.pagina += 1;
          }
          resolve();
        });

    });

    return promesa;

  }

  cargar_lineas() {
    let url = URL_SERVICIOS + "/lineas";

    this.http.get(url)
      .map(resp => resp.json())
      .subscribe(data => {
        if (data.error) {
          //problemas
        } else {
          this.lineas = data.lineas;
          console.log(this.lineas);
        }
      });
  }

  cargar_por_categoria(categoria: number) {
    let url = URL_SERVICIOS + "/productos/por_tipo/" + categoria;

    this.http.get(url)
      .map(resp => resp.json())
      .subscribe(data => {
        console.log(data.productos);
        this.categoria = data.productos;

      })
  }

  buscar_producto(termino: string) {
    let url = URL_SERVICIOS + "/productos/buscar/" + termino;

    this.http.get(url)
      .subscribe(resp => {
        let data = resp.json();
        this.resultados = data.productos;
      })
  }

}
