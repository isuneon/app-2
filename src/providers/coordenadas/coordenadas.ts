import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PreferStorage } from '../../providers/preferStorage';

@Injectable()
export class CoordenadasProvider {

	constructor(public http: HttpClient,
				public _preferStorage: PreferStorage) {
		
	}


	obtenerDispositivos() {
		return new Promise(resolve => {
			this.http.get(`${this._preferStorage.dict.servicioCoordenadas.urlServicio}`).subscribe(data => {
				resolve(data);
			}, err => {
				console.log(err);
			});
		});
	}


	nuevoRegistro(data){
		return new Promise(resolve => {
			this.http.post(`${this._preferStorage.dict.servicioCoordenadas.urlServicio}/registroCoordenadas`, data).subscribe(data => {
				resolve(data);
			}, err => {
				console.log(err);
			});
		});
	}


	actualizarRegistro(data){
		return new Promise(resolve => {
			this.http.post(`${this._preferStorage.dict.servicioCoordenadas.urlServicio}/actualizarCoordenadas`, data).subscribe(data => {
				resolve(data);
			}, err => {
				console.log(err);
			});
		});
	}
}
