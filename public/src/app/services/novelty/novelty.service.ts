import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NoveltyService {

  constructor(
    private novelty: AngularFirestore

  ) { }

  //Crea una nueva categoria
  public createNovelty(novelty: Novelty) {
    return this.novelty.collection('novelty').doc(novelty.id).set(novelty);
  }
  //Obtiene una nueva categoria
  public getNovelty(documentId: string) {
    return this.novelty.collection('novelty').doc(documentId).snapshotChanges();
  }
  //Obtiene todos las novelty
  public getCategories() {
    return this.novelty.collection('novelty').snapshotChanges();
  }
  //Actualiza una nueva categoria
  public updateNovelty(documentId: string, data: any) {
    return this.novelty.collection('novelty').doc(documentId).set(data);
  }
  //Elimina una nueva categoria
  public deleteNovelty(documentId: string) {
    return this.novelty.collection('novelty').doc(documentId).delete();
  }
}
