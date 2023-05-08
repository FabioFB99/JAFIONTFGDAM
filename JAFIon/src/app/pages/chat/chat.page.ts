import { Component, OnInit,ViewChild } from '@angular/core';
import { ClasedataService } from 'src/app/shared/services/clasedata.service';
import { UserdataService } from 'src/app/shared/services/userdata.service';
import { IonContent } from '@ionic/angular';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  idUsuario = JSON.parse(localStorage.getItem('user')).uid;
  usuarioActual;
  newMsg='';
  claseActual;
   pid = '';
  public image: any;

   public isEmojiPickerVisible: boolean;

  constructor(
    private userData: UserdataService,
    private claseData: ClasedataService
) { }
    public addEmoji(event) {
      this.newMsg = `${this.newMsg}${event.emoji.native}`;
      this.isEmojiPickerVisible = false;
    }
  ngOnInit() {
    //this.content.scrollToBottom(300);
    this.userData.getUserById(this.idUsuario).subscribe((user) => {
      this.usuarioActual = user.payload.data();
      this.getClaseActual(this.usuarioActual.claseActual);

    });

  }

  getClaseActual(idClase: string) {
    this.claseData.getClaseActualServicio(idClase).subscribe((clase) => {
      this.claseActual = clase.payload.data();
      if (this.claseActual) {
        this.content.scrollToBottom(400);
      }

    });


  }
  myMessage() {
    if (this.claseActual.mensajes.usuarioId === this.idUsuario) {
      return true;

    }
    else {
      return false;
    }

  }
 async handleImage(event: any) {
    this.pid = this.claseData.afs.createId();
    this.image = event.target.files[0];
    await this.claseData.uploadImage(this.image, this.pid);
  }
  nuevoMensaje() {
    console.log(this.newMsg);

    if (this.newMsg!==''){
      this.claseData.nuevoMensajeService(this.claseActual, this.newMsg, this.usuarioActual,this.claseData.downloadURL || null);
    }
    this.newMsg = '';
 }

}
