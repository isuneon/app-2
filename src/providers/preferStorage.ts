import { Injectable } from '@angular/core';

@Injectable()
export class PreferStorage {

    server = "/proxy";
    // server = "https://cors-anywhere.herokuapp.com/https://webservicesappcoordenadas.herokuapp.com";

    constructor(){ }

    dict = {
        "servicioCoordenadas": {
            "urlServicio":  this.server + "/coordenadas"
        }
    }

}
