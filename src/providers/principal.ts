import { Injectable } from '@angular/core';
import { RequestOptions, Headers, RequestMethod, URLSearchParams } from '@angular/http';
import { LoadingController, AlertController, ToastController  } from 'ionic-angular';


@Injectable()
export class PrincipalProvider {


	constructor(public loadingCtrl: LoadingController,
				public alertCtrl: AlertController,
                public toastCtrl: ToastController) {

    }


	loading(texto) {
        let loader = this.loadingCtrl.create({
            content: texto
        });
        loader.present();

        return loader;
    }


    showAlert(title, texto) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: texto,
            buttons: ['OK']
        });
        alert.present();
    }


    loadingTemp(texto) {
        let loader = this.loadingCtrl.create({
            content: texto,
            duration: 1500
        });
        loader.present();
    }


    presentToast(texto, posicion, tiempo = 3000){
        const toast = this.toastCtrl.create({
            message: texto,
            duration: tiempo,
            position: posicion
        });
        toast.present();
    }


    configurarCabeceraPost() {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
        let options = new RequestOptions({ method: RequestMethod.Post, headers: headers });
        return options
    }


    serializeParams(data){
        let params = new URLSearchParams();
        for(let key in data){
            params.set(key, data[key])
        }
        return params
    }

}
