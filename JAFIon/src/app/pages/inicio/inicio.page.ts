import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clase } from 'src/app/shared/services/clase';
import { ClasedataService } from 'src/app/shared/services/clasedata.service';
import { UserdataService } from 'src/app/shared/services/userdata.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss']
})
export class InicioPage implements OnInit {
  idUsuario = JSON.parse(localStorage.getItem('user')).uid;;
  usuarioActual;
  clases: any[] = [];
  claseActual: Clase;

  constructor(
    private userData: UserdataService,
    private claseData: ClasedataService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.userData.getUserById(this.idUsuario).subscribe((user) => {
      this.usuarioActual = user.payload.data();
      this.getClaseActual();
    });
    this.claseData.getClases().subscribe((clases) => {
      this.clases = [];
      clases.forEach((clase) => {
        this.clases.push(clase.payload.doc.data());
      });
      this.getClaseActual();
    });
  }

  getClaseActual() {
    this.claseActual = this.clases.filter((clase) => clase.cid === this.usuarioActual.claseActual)[0];
    return this.clases.filter((clase) => clase.cid === this.usuarioActual.claseActual)[0];
  }

}
