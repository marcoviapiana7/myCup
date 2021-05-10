import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private dbPath;
  playerRef: AngularFireList<Player>;
  public afAuth: AngularFireAuth;
  _playerRef: AngularFireObject<Player>;

  constructor(private db: AngularFireDatabase, private afStorage: AngularFireStorage, private authService: AuthService) {
    let user = this.authService.getUser();
    this.dbPath = user.email.split('@')[0] + '/calciatori';
    this.playerRef = db.list(this.dbPath);
  }

  getPlayers(): AngularFireList<Player> {
    return this.playerRef;
  }

  createPlayer(player: Player): any {
    return this.playerRef.set(this.getPlayerId(player), player);

  }

  update(player: Player, playerVecchio: Player) {
    //controllo se esiste il giocatore
    let exist: boolean;
    this.db.database.ref(this.dbPath).child(this.getPlayerId(player)).once('value', function (snapshot) {
      if (snapshot.exists()) {
        exist = true;
      }
      else {
        exist = false;
      }
    });

    if (exist) {
      this._playerRef = this.db.object(this.dbPath + '/' + this.getPlayerId(player))
      this._playerRef.update({
        nome: player.nome,
        cognome: player.cognome,
        soprannome: player.soprannome,
        valore: player.valore,
        ruolo: player.ruolo,
        foto: player.foto,
        id: this.getPlayerId(player)
      });
    }
    else {
      this._playerRef = this.db.object(this.dbPath + '/' + this.getPlayerId(player))
      this.deletePlayer(playerVecchio);
      this.createPlayer(player);
    }
  }

  deletePlayer(player: Player) {
    if (player.foto) {
      const filePath = '/profilePicture/' + player.id + '/';
      var storageRef = this.afStorage.ref(filePath);
      storageRef.delete();
    }
    this._playerRef = this.db.object(this.dbPath + '/' + this.getPlayerId(player));
    this._playerRef.remove();
  }

  deleteAllPlayers(): Promise<void> {
    return this.playerRef.remove();
  }

  getPlayerId(player: Player) {
    return player.nome.replace(' ', '') + player.cognome.replace(' ', '');
  }

}