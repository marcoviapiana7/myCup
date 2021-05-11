import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Cup } from '../models/cup.models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CupService {
  private dbPath;
  cupRef: AngularFireList<Cup>;
  _cupRef: AngularFireObject<Cup>;

  constructor(private db: AngularFireDatabase, private afStorage: AngularFireStorage, private authService: AuthService) {
    let user = this.authService.getUser();
    this.dbPath = user.email.split('@')[0] + '/cups';
    this.cupRef = this.db.list(this.dbPath);
  }

  addCup(cup: Cup) {
    if (!this.esiste(cup)) {
      cup.id = this.getCupId(cup);
      this.cupRef.set(cup.id, cup);
      return true;
    }
    else {
      return false;
    }
  }

  deleteCup(cup: Cup) {
    this._cupRef = this.db.object(this.dbPath + '/' + this.getCupId(cup));
    this._cupRef.remove();
  }

  updateCup(cupVecchio: Cup, cupNuovo: Cup) {
    if (this.esiste(cupVecchio)) {
      this._cupRef = this.db.object(this.dbPath + '/' + this.getCupId(cupVecchio))
      // this._cupRef.update({
      //   id: this.getCupId(cupNuovo),
      //   nome: cupNuovo.nome,
      //   partite: cupVecchio.partite
      // })
      cupNuovo.partite = cupVecchio.partite;
      this.deleteCup(cupVecchio);
      this.addCup(cupNuovo);
      return true;
    }
    else {
      return false;
    }
  }

  getCups(): AngularFireList<Cup> {
    return this.cupRef;
  }


  async getCupsId() {

    let cupsId: string[] = [];
    return this.db.database.ref(this.dbPath).once('value').then(function (snap) {
      snap.forEach(child => {
        cupsId.push(child.key);
      });
      return cupsId;
    });

  }

  getCup(id: string): AngularFireList<Cup> {
    this.cupRef = this.db.list(this.dbPath + '/' + id);
    return this.cupRef;
  }

  getCupId(cup: Cup) {
    return cup.nome.replace(' ', '');
  }

  esiste(cup: Cup) {
    let exist: boolean;
    this.db.database.ref(this.dbPath).child(this.getCupId(cup)).once('value', function (snapshot) {
      if (snapshot.exists()) {
        exist = true;
      }
      else {
        exist = false;
      }
    });
    return exist;
  }
}
