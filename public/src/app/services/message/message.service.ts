import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private firestore: AngularFirestore

  ) { }

  //Crea una nueva categoria
  public createMessage(message: Message) {
    return this.firestore.collection('message').doc(message.message_id).set(message);
  }
}
