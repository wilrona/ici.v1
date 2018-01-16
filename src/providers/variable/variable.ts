// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the VariableProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VariableProvider {

  public InitTabMaps:boolean = true;

  public InitTabAnnuaire: boolean = true;

  public EMAIL_REGEX = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';

  setInitTabMaps(data){
    this.InitTabMaps = data;
  }

  getInitTabMaps(){
    return this.InitTabMaps
  }


  setInitTabAnnuaire(data){
    this.InitTabAnnuaire = data;
  }

  getInitTabAnnuaire(){
    return this.InitTabAnnuaire;
  }

  getEmailRegexValidator(){
    return this.EMAIL_REGEX;
  }



}
