export interface Clase {
  cid: string;
  nombre: string;
  admin: string;
  mensajes: [{
    mensaje: string;
    imagen ?: string;
    usuarioNombre: string;
    usuarioId: string;
    fecha: number;
  }?];
  retos: [{
    pregunta: string;
    respuestas: [{
      respuesta: string;
      uid: string;
      nombreUsuario: string;
    }?];
  }?];
}
