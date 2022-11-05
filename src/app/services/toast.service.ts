import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  handlerMessage = '';
  roleMessage = '';

  constructor(
    private toastController: ToastController
  ) { }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
        }
      ]
    });

    await toast.present();

  }
}
