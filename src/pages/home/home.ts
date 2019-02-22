import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { PrincipalProvider } from '../../providers/principal';
import { CoordenadasProvider } from '../../providers/coordenadas/coordenadas';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';


@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	arr = [];
	idRegistro:string = "";
	IMEI: any;
	registrado: boolean = false;
	config: BackgroundGeolocationConfig = {
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 30,
        debug: true, //  enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false, // enable this to clear background location settings when the app terminates
	};

	interval:any;
	anio: string;

	constructor(public navCtrl: NavController,
				public geolocation: Geolocation,
				public _principalProvider: PrincipalProvider,
				public _coordenadasProvider: CoordenadasProvider,
				private backgroundGeolocation: BackgroundGeolocation) {

		this.anio = moment().format('YYYY')
  		this.IMEI = localStorage.getItem("IMEI");

  		this.getAllDevices()
  		// this.obtenerCoordenadasBackground()

  	}


	obtenerCoordenadasBackground(){

		this.backgroundGeolocation.configure(this.config).subscribe((location: BackgroundGeolocationResponse) => {

		    // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
		    // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
		    // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
		    this.backgroundGeolocation.finish(); // FOR IOS ONLY

	  	});

		// start recording location
		this.backgroundGeolocation.start();

		// If you wish to turn OFF background-tracking, call the #stop method.
		// this.backgroundGeolocation.stop();
	}

	guardarDatos(){
		this.interval = Observable.interval(300 * 60).subscribe(x => {
			this.geolocation.getCurrentPosition().then(response => {
				if(this.registrado == true){
					this.actualizarRegistro(response)
				}else{
					// aqui esto no deberia ir porque si no esta registrado no deberia enviar sus coordenadas
					this.nuevoRegistro(response)
					this.registrado = true
				}
			}).catch(error =>{
				console.log(error);
			})
		});
	}


	nuevoRegistro(coordenadas){
		let datos = {
			IMEI: this.IMEI,
			latitude: coordenadas['coords']['latitude'],
			longitude: coordenadas['coords']['longitude'],
			Nombre: "Sin especificar",
			Numero: "Sin especificar"
		}

		let loader = this._principalProvider.loading('Guardando datos de la ubicación');
		this._coordenadasProvider.nuevoRegistro(datos).then(data => {
			this.idRegistro = data['data']
			if(data['status'] != 200){
				this._principalProvider.showAlert("Error", "Ocurrió un error al guardar la ubicación del dispositivo.")
			}
		});
		loader.dismiss();
	}


	actualizarRegistro(coordenadas){
		let datos = {
			id: this.idRegistro,
			latitude: coordenadas['coords']['latitude'],
			longitude: coordenadas['coords']['longitude']
		}

		let loader = this._principalProvider.loading('Guardando datos de la ubicación');
		this._coordenadasProvider.actualizarRegistro(datos).then(data => {
			if(data['status'] != 200){
				this._principalProvider.showAlert("Error", "Ocurrió un error al guardar la ubicación del dispositivo.")
			}
		});
		loader.dismiss();
	}


	getAllDevices(){
		this._coordenadasProvider.obtenerDispositivos().then(data => {
            if(data['status'] == 200){
                for(let x in data['data']){
                	if(data['data'][x]['IMEI'] == this.IMEI){
						this.registrado = true
						this.idRegistro = x
					}
                }
            }
        	this.guardarDatos()
        });
	}

}
