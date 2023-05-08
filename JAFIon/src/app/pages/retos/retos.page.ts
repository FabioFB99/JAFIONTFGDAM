import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clase } from 'src/app/shared/services/clase';
import { ClasedataService } from 'src/app/shared/services/clasedata.service';
import { UserdataService } from 'src/app/shared/services/userdata.service';

@Component({
  selector: 'app-retos',
  templateUrl: './retos.page.html',
  styleUrls: ['./retos.page.scss'],
})
export class RetosPage implements OnInit {
idUsuario = JSON.parse(localStorage.getItem('user')).uid;;
  usuarioActual;
  clases: any[] = [];
  claseActual: Clase;

  constructor(
    private userData: UserdataService,
    private claseData: ClasedataService,
    private router: Router
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
    this.claseActual = this.clases.filter((clase) => clase.cid === this.usuarioActual.claseActual)[0];
    return this.claseActual;
  }

  nuevoReto(pregunta: string) {
    this.claseData.nuevoRetoService(this.claseActual, pregunta);
  }

  responderReto(respuestaActual: string, indice: number) {
    this.claseActual.retos[indice].respuestas.push({
      respuesta: respuestaActual,
      uid: this.usuarioActual.uid,
      nombreUsuario: this.usuarioActual.displayName
    });
    this.claseData.responderRetoService(this.claseActual);
  }

  borrarReto(indice: number) {
    this.claseActual.retos.splice(indice, 1);
    this.claseData.deleteRetoService(this.claseActual);
  }

  estaRespondido(indice: number) {
    return this.claseActual.retos[indice].respuestas.filter((respuesta) => respuesta.uid === this.usuarioActual.uid).length === 0;
  }

  getRespuesta(indice: number) {
    return this.claseActual.retos[indice].respuestas.filter((respuesta) => respuesta.uid === this.usuarioActual.uid)[0].respuesta;
  }

  deleteRespuesta(indice: number) {
    const index = this.claseActual.retos[indice].respuestas.indexOf(
      this.claseActual.retos[indice].respuestas.filter((respuesta) => respuesta.uid === this.usuarioActual.uid)[0]);

    this.claseActual.retos[indice].respuestas.splice(index, 1);
    this.claseData.deleteRespuestaService(this.claseActual);
  }
}
