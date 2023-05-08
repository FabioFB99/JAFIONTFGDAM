import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { finalize, map } from 'rxjs/operators';
import { User } from './user';
import { getFirestore, collection, doc, getDoc, query, where, getDocs  } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  users: Observable<User[]>;
  user: User;
  filePath: any;
  downloadURL: string;
  private usersCollection: AngularFirestoreCollection<User>;
  private firestore = initializeApp(environment.firebase);
  private db = getFirestore(this.firestore);
  constructor(
    private readonly afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.usersCollection = afs.collection<User>('users');
    this.getUsers();
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      this.getUserById(JSON.parse(localStorage.getItem('user')).uid);
    }
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

  onSaveUser(contactForm: User, userId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = userId || this.afs.createId();
        const data = { id, ...contactForm };
        const result = await this.usersCollection.doc(id).set(data);
        resolve(result);
      } catch (error) {
        reject(error.message);
      }
    });
  }

  /* onDeleteUser(userId: string): Promise<void>{
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.usersCollection.doc(userId).delete();
        resolve(result);
      } catch (error) {
        reject(error.message);
      }
    });
  } */
  getUserById(userId: string) {
    return this.afs.collection('users').doc(userId).snapshotChanges();
  }


  private getUsers(): void {
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as User))
    );
  }

}
