import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Clase } from 'src/app/shared/services/clase';
import { ClasedataService } from 'src/app/shared/services/clasedata.service';
import { UserdataService } from 'src/app/shared/services/userdata.service';

@Component({
  selector: 'app-editdata',
  templateUrl: './editdata.component.html',
  styleUrls: ['./editdata.component.scss'],
})
export class EditdataComponent implements OnInit{
  public nombre = '';
  public clase = '';
  public image: any;
  idUsuario = JSON.parse(localStorage.getItem('user')).uid;
  usuarioActual: any;
  clases: any = [];
  clasesUsuario: Clase[];

  constructor(
    public authSvc: AuthService,
    private userData: UserdataService,
    private claseData: ClasedataService,
    private alertCtrl: AlertController,
  ) {
  }

  getClaseActual() {
    return this.clases.filter((clase) => clase.cid === this.usuarioActual.claseActual)[0];
  }

  async ngOnInit() {
    this.claseData.getClases().subscribe((clases) => {
      this.clases = [];
      clases.forEach((clase) => {
        this.clases.push(clase.payload.doc.data());
      });
    });
    this.userData.getUserById(this.idUsuario).subscribe((user) => {
      this.usuarioActual = user.payload.data();
      this.nombre = this.usuarioActual.displayName;
      this.clasesUsuario = [];
      if (this.usuarioActual) {
        if (!this.usuarioActual.clases) {
          this.usuarioActual.clases = [];
        }

        this.usuarioActual.clases.forEach((idClase) => {
          this.clasesUsuario.push(this.clases.filter((clase) => clase.cid === idClase)[0]);
        });
      }
    });
  }

  async guardarNombre() {
    this.usuarioActual.displayName = this.nombre;
    await this.userData.onSaveUser(this.usuarioActual, this.usuarioActual.uid);
  }

  async cambiarFoto() {
    this.usuarioActual.photoURL = this.userData.downloadURL;
    if (this.usuarioActual.photoURL) {
      await this.userData.onSaveUser(this.usuarioActual, this.usuarioActual.uid);
    }
  }

  async handleImage(event: any) {
    this.image = event.target.files[0];
    await this.userData.uploadImage(this.image, this.usuarioActual.uid);
  }

  agregarClase() {
    if (this.clase !== '') {
      const idclase = this.claseData.afs.createId();
      this.claseData.nuevaClase({
        cid: idclase,
        nombre: this.clase,
        mensajes: [],
        admin: this.usuarioActual.uid,
        retos: [],
      });
      this.usuarioActual.clases.push(idclase);
      this.usuarioActual.claseActual = idclase;
      this.userData.onSaveUser(this.usuarioActual, this.usuarioActual.uid);
    }
  }

  async desvincularClase(idClase: string) {
    const alert = this.alertCtrl.create({
      header: '¿Estas seguro que quieres salir de esta clase?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Si',
          handler: async () => {
            const index = this.usuarioActual.clases.indexOf(idClase);
            this.usuarioActual.clases.splice(index, 1);
            if (this.usuarioActual.claseActual === idClase) {
              this.usuarioActual.claseActual = this.usuarioActual.clases[0] || '';
            }
            await this.userData.onSaveUser(this.usuarioActual, this.usuarioActual.uid);
          }
        }
      ]
    });
    (await alert).present();
  }

  async accederClase(idClase: string) {
    if (this.clases.filter((clase) => clase.cid === idClase).length > 0) {
      this.usuarioActual.claseActual = idClase;
      if (this.usuarioActual.clases.filter((item) => item === idClase).length === 0) {
        this.usuarioActual.clases.push(idClase);
      }
      await this.userData.onSaveUser(this.usuarioActual, this.usuarioActual.uid);
    }
    else {
      const alert = this.alertCtrl.create({
        header: 'No se encuentra la clase',
        subHeader: 'Revisa bien el código de la clase y intentalo de nuevo',
        buttons: ['Aceptar']
      });
      (await alert).present();
    }
  }
}
