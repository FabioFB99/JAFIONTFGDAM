import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { Publicacion } from 'src/app/shared/services/publicacion';
import { PublicaciondataService } from 'src/app/shared/services/publicaciondata.service';
import { UserdataService } from 'src/app/shared/services/userdata.service';
@Component({
  selector: 'app-tablon-anuncios',
  templateUrl: './tablon-anuncios.page.html',
  styleUrls: ['./tablon-anuncios.page.scss'],
})
export class TablonAnunciosPage implements OnInit {
  idUsuario = JSON.parse(localStorage.getItem('user')).uid;
  usuarioActual: any;
  lsPublicaciones: any[];
  pid = '';
  public image: any;
  constructor(
    private userData: UserdataService,
    private publicacionSrv: PublicaciondataService
  ) {

  }

  ngOnInit() {
    this.userData.getUserById(this.idUsuario).subscribe((user) => {
      this.usuarioActual = user.payload.data();
    });

    this.publicacionSrv.getPublicaciones().subscribe((publicaciones) => {
      this.lsPublicaciones = [];

      publicaciones.forEach((publicacion) => {
        this.lsPublicaciones.push(publicacion.payload.doc.data());
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.lsPublicaciones.sort((a: Publicacion, b: Publicacion) => b.fecha - a.fecha);
    });
  }
  async handleImage(event: any) {
    this.pid = this.publicacionSrv.afs.createId();
    this.image = event.target.files[0];
    await this.publicacionSrv.uploadImage(this.image, this.pid);
  }

  publicarPublicacion(textoPublicacion: string) {
    if (textoPublicacion !== '') {
      this.publicacionSrv.nuevaPublicacion({
        pid: this.pid || this.publicacionSrv.afs.createId(),
        userid: this.usuarioActual.uid,
        fecha: new Date().getTime(),
        texto: textoPublicacion,
        photoURL: this.publicacionSrv.downloadURL || null,
        photoUser: this.usuarioActual.photoURL,
        nameUser: this.usuarioActual.displayName
      });
    }
  }
}
