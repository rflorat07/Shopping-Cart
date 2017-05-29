import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { URL_SERVICIOS } from './../../config/url.servicios';

@Injectable()
export class ProductosProvider {

  pagina: number = 0;
  productos: any[] = [];

  constructor(public http: Http) {
    console.log('Hello ProductosProvider Provider');
  }

  cargar_todos() {
    let url = URL_SERVICIOS + "productos/todos/" + this.pagina;

    this.http.get(url)
    .map((resp) => resp.json())
    .subscribe(data => {
      
      console.log(data);

      if (data.error) {
        //Aqui hay un problema
      } else {
        this.productos.push(...data.productos);
        this.pagina +=1;
      }
    });
  }

}
