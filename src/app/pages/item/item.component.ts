import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto_descripcion.interface';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: any = [];
  id: string = "";

  constructor( private route: ActivatedRoute,
               public productosService: ProductosService ) { }

  ngOnInit(): void {

    this.route.params
        .subscribe( parametros => {          
          //console.log(parametros['id']);
          this.productosService.getProducto(parametros['id'])
              .subscribe((resp: any )=> {
                this.id = parametros['id'];
                this.producto = resp;
                //console.log(this.producto);
                //console.log(this.id);
                });
        });
  }

}