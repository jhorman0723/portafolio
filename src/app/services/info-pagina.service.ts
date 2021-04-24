import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info_pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any[] = [];

  constructor( private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
    // leer archivo JSON
    this.http.get('assets/data/data_pagina.json')
      .subscribe( (resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
        // console.log(resp);
      });
  }

  private cargarEquipo(){
    this.http.get('https://udemy-72e2c-default-rtdb.firebaseio.com/equipo.json')
    .subscribe( (resp: any) => {
      this.equipo = resp;
      // console.log(this.equipo);
    });
  }

}
