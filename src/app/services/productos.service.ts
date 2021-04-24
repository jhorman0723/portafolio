import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: any[] = [];
  cargando = true;
  productoFiltrado: any [] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  // tslint:disable-next-line: typedef
  private cargarProductos(){
    return new Promise<void> ( ( resolve, reject ) => {
      this.http.get('https://udemy-72e2c-default-rtdb.firebaseio.com/productos_idx.json')
      // tslint:disable-next-line: deprecation
      .subscribe( (resp: any) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
        // console.log(this.productos);
      });
    });
  }

  // tslint:disable-next-line: typedef
  getProducto(id: string){
    return this.http.get(`https://udemy-72e2c-default-rtdb.firebaseio.com/productos/${ id }.json`);
  }

  // tslint:disable-next-line: typedef
  buscarProducto( termino: string ) {
    if ( this.productos.length === 0 ) {
      this.cargarProductos().then( () => {
        this.filtrarProductos ( termino );
      });
    }else {
      this.filtrarProductos ( termino );
    }
  }

  // tslint:disable-next-line: typedef
  private filtrarProductos( termino: string ) {
    this.productoFiltrado = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if ( prod.categoria.indexOf( termino ) >= 0  || tituloLower.indexOf( termino ) >= 0) {
        this.productoFiltrado.push( prod );
      }
    });
  }

}
