import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Match } from '../models/match.models';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private dbPath = '/cups/';
  matchRef: AngularFireList<Match>;
  _matchRef: AngularFireObject<Match>;

  constructor(private db: AngularFireDatabase, private afStorage: AngularFireStorage) {
    this.matchRef = this.db.list(this.dbPath);
  }

  addMatch(match: Match, cupId: string): Promise<boolean> {
    return this.esiste(match, cupId).then(esiste => {
      if (esiste !== undefined) {
        if (esiste) {
          return false;
        }
        else {
          this.matchRef = this.db.list(this.dbPath + cupId + '/partite');
          match.id = this.getMatchId(match);
          this.matchRef.set(match.id, match);
          return true;
        }
      }
    })
  }

  deleteMatch(match: string, cupId: string) {
    this._matchRef = this.db.object(this.dbPath + cupId + '/partite/' + match)
    this._matchRef.remove();
  }

  updateMatch(match: Match, cupId: string, matchVecchio: string): Promise<boolean> {
    return this.esiste(match, cupId).then(esiste => {
      if (esiste !== undefined) {
        if (esiste && this.getMatchId(match) === matchVecchio && cupId) {
          this._matchRef = this.db.object(this.dbPath + cupId + '/partite/' + this.getMatchId(match))
          this._matchRef.set(match);
          return true;
        }
        else if (!esiste && cupId) {
          this.addMatch(match, cupId);
          this.deleteMatch(matchVecchio, cupId);
          return true;
        }
        else {
          return false;
        }
      }
    })
  }

  getMatches(cup: string): AngularFireList<Match> {
    this.matchRef = this.db.list(this.dbPath + cup + '/partite');
    return this.matchRef;
  }

  getMatch(id: string): AngularFireList<Match> {
    this.matchRef = this.db.list(this.dbPath + '/' + id);
    return this.matchRef;
  }

  getMatchId(match: Match) {
    const x = match.data.replace(/\//g, "-").replace(', ', ':').replace(/(:\d{2}| [AP]M)$/, "");
    return x;
  }

  async esiste(match: Match, cup: string) {
    let exist: boolean;
    return this.db.database.ref(this.dbPath + cup + '/partite').child(this.getMatchId(match)).once('value').then(function (snapshot) {
      if (snapshot.exists()) {
        exist = true;
      }
      else {
        exist = false;
      }
      return exist;
    });
  }

}
