import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDocs, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { finalize, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Clase } from './clase';
import { User } from './user';
import { UserdataService } from './userdata.service';

@Injectable({
  providedIn: 'root'
})
export class ClasedataService {

  claseactual: Clase;
  usuarioActual;
  idUsuario;
  chatActual: Observable<any>;
  private db = getFirestore(initializeApp(environment.firebase));
  filePath: any;
  downloadURL: string;

  constructor(
    public afs: AngularFirestore,
    private userData: UserdataService,
     private storage: AngularFireStorage
  ) {
    this.userData.getUserById(this.idUsuario).subscribe((user) => this.usuarioActual = user.payload.data());
    this.idUsuario = JSON.parse(localStorage.getItem('user')).uid;

  }

  getClases() {
    return this.afs.collection('clases').snapshotChanges();
  }

  nuevaClase(clase: Clase) {
    const claseRef: AngularFirestoreDocument<any> = this.afs.doc(
      `clases/${clase.cid}`
    );
    const claseData: Clase = {
      cid: clase.cid,
      nombre: clase.nombre,
      mensajes: clase.mensajes,
      admin: clase.admin,
      retos: clase.retos
    };
    return claseRef.set(claseData, {
      merge: true,
    });
  }
   
 async uploadImage(image: any, name: string) {
    this.filePath = `images/${name}`;
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
  getClaseActualServicio(cid: string) {
    return this.afs.collection('clases').doc(cid).snapshotChanges();
  }

  nuevoMensajeService(clase: Clase, menssage: string,user: User,imagen ?:string) {
    const claseRef: AngularFirestoreDocument<any> = this.afs.doc(
      `clases/${clase.cid}`
    );
    const claseData: Clase = {
      cid: clase.cid,
      nombre: clase.nombre,
      mensajes: clase.mensajes,
      admin: clase.admin,
      retos: clase.retos
    };
    claseData.mensajes.push({ mensaje: menssage,imagen:imagen,usuarioNombre: user.displayName, usuarioId: user.uid, fecha: new Date().getTime(), });
    return claseRef.set(claseData, {
      merge: true,
    });
  }

  nuevoRetoService(clase: Clase, reto: string,) {
    const claseRef: AngularFirestoreDocument<any> = this.afs.doc(
      `clases/${clase.cid}`
    );
    const claseData: Clase = {
      cid: clase.cid,
      nombre: clase.nombre,
      mensajes: clase.mensajes,
      admin: clase.admin,
      retos: clase.retos
    };
    claseData.retos.push({ pregunta: reto, respuestas: [] });
    return claseRef.set(claseData, {
      merge: true,
    });
  }

  responderRetoService(clase: Clase) {
    const claseRef: AngularFirestoreDocument<any> = this.afs.doc(
      `clases/${clase.cid}`
    );
    const claseData: Clase = {
      cid: clase.cid,
      nombre: clase.nombre,
      mensajes: clase.mensajes,
      admin: clase.admin,
      retos: clase.retos
    };
    return claseRef.set(claseData, {
      merge: true,
    });
  }

  deleteRespuestaService(clase: Clase) {
    const claseRef: AngularFirestoreDocument<any> = this.afs.doc(
      `clases/${clase.cid}`
    );
    const claseData: Clase = {
      cid: clase.cid,
      nombre: clase.nombre,
      mensajes: clase.mensajes,
      admin: clase.admin,
      retos: clase.retos
    };
    return claseRef.set(claseData, {
      merge: true,
    });
  }

  deleteRetoService(clase: Clase) {
    const claseRef: AngularFirestoreDocument<any> = this.afs.doc(
      `clases/${clase.cid}`
    );
    const claseData: Clase = {
      cid: clase.cid,
      nombre: clase.nombre,
      mensajes: clase.mensajes,
      admin: clase.admin,
      retos: clase.retos
    };
    return claseRef.set(claseData, {
      merge: true,
    });
  }


}
