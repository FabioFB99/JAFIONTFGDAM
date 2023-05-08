import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Clase } from 'src/app/shared/services/clase';
import { ClasedataService } from 'src/app/shared/services/clasedata.service';
import { UserdataService } from 'src/app/shared/services/userdata.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
  providers: [UserdataService]
})
export class CuentaPage implements OnInit {
  idUsuario = JSON.parse(localStorage.getItem('user')).uid;;
  usuarioActual;
  clases: any[] = [];
  claseActual: Clase;

  constructor(
    private userData: UserdataService,
    public authSrv: AuthService,
    private claseData: ClasedataService
  ) {
  }

  ngOnInit() {
    this.userData.getUserById(this.idUsuario).subscribe((user) => this.usuarioActual = user.payload.data());
    this.claseData.getClases().subscribe((clases) => {
      this.clases = [];
      clases.forEach((clase) => {
        this.clases.push(clase.payload.doc.data());
      });
    });
  }

  getClaseActual() {
    return this.clases.filter((clase) => clase.cid === this.usuarioActual.claseActual)[0];
  }

  async cerrarSesion() {
    await this.authSrv.signOut();
    this.usuarioActual = null;
    this.claseActual = null;
  }
}
