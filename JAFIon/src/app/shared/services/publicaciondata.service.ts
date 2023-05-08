import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { finalize, map } from 'rxjs/operators';
import { User } from './user';
import { getFirestore, collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Publicacion } from './publicacion';

@Injectable({
  providedIn: 'root'
})
export class PublicaciondataService {
  publicacion: Observable<Publicacion[]>;
  user: User;
  filePath: any;
  downloadURL: string;
  private usersCollection: AngularFirestoreCollection<User>;
  private firestore = initializeApp(environment.firebase);
  private db = getFirestore(this.firestore);
  constructor(
    public afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {

  }

  getPublicaciones() {
    return this.afs.collection('publicaciones').snapshotChanges();
  }

  nuevaPublicacion(publicacion: Publicacion) {
    const claseRef: AngularFirestoreDocument<any> = this.afs.doc(
      `publicaciones/${publicacion.pid}`
    );
    const publicacionData: Publicacion = {
      pid: publicacion.pid,
      userid: publicacion.userid,
      fecha: publicacion.fecha,
      texto: publicacion.texto,
      photoURL: publicacion.photoURL,
      photoUser: publicacion.photoUser,
      nameUser: publicacion.nameUser,
    };
    return claseRef.set(publicacionData, {
      merge: true,
    });
  }
  async uploadImage(image: any, name: string) {
    this.filePath = `publicaciones/${name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    await task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(urlImage => {
          this.downloadURL = urlImage;
        });
      })
    ).subscribe();
    return this.downloadURL;
  }

}
