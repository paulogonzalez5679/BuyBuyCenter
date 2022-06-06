import { Component, OnInit } from '@angular/core';
import { NoveltyService } from 'app/services/novelty/novelty.service';
import swal from "sweetalert2";
import * as firebase from "firebase/app";
declare var $: any;
export interface DataTable {
  headerRow: string[];
  footerRow?: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-novelties',
  templateUrl: './novelties.component.html',
  styleUrls: ['./novelties.component.css']
})
export class NoveltiesComponent implements OnInit {

  public dataTable: DataTable;
  public novelty: Novelty;
  public arrayNovelty: Novelty[];
  public documentId = null;
  public isEdit = false;
  public tablaDatos;
  public imageFile: any;
  public imageSrc: any;

  constructor(private noveltyService: NoveltyService) {}

  ngOnInit(): void {
    this.novelty = {};
    this.dataTable = {
      headerRow: [
        "#",
        "ID",
        "Categoria",
        "Descripción",
        "Imagen",
        "Editar",
        "Eliminar",
      ],
      dataRows: [],
    };
    this.tablaDatos = $("#datatablesNovelty").DataTable({});
    this.getCategories();
  }

  /**
   * *** Envio para cargar imagen ***.
   * @param event.
   */
  public onChangeImage(event) {
    const files = event.srcElement.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(files[0]);
    }
    this.upload(event);
  }

  /**
   * *** Recibimos el archivo y lo enviamos a subir al storage ***
   * @param event
   */
  public upload(event): void {
    const file = event.target.files[0];
    this.imageFile = file;
    this.uploadDocumentToStorage();
  }

  /**
   * *** Optenemos el id de la nueva categoria ***
   * llenamos el objeto
   */
  newNovelty() {
    this.isEdit = false;
    var id = new Date().getTime();
    this.novelty = {
      id: id.toString(),
      url: "",
      description: "",
      nombre: "",
    };
  }

  /**
   * metodo para agregar categorias
   * @param novelty
   * @param valid
   */
  addNovelty(novelty: Novelty, valid: boolean) {
    if (valid) {
      this.noveltyService.createNovelty(novelty).then(() => {
        swal("OK", "Registro Exitoso", "success");
        this.novelty = {};
        $("#modalNovelty").modal("hide");
      });
    }
  }

  /**
   * *** Optenemos todas las categorias de la DB ***
   */
  async getCategories() {
    await this.noveltyService.getCategories().subscribe((noveltySnapshot) => {
      this.arrayNovelty = [];
      noveltySnapshot.forEach((noveltyData) => {
        this.arrayNovelty.push(noveltyData.payload.doc.data());
        if (noveltySnapshot.length == this.arrayNovelty.length) {
          this.initDataTable();
        }
      });
    });
  }

  /**
   * *** Seleccionamos una categoria para la edicion ***
   * @param novelty 
   */
  selectNovelty(novelty: Novelty) {
    this.isEdit = true;
    this.novelty = novelty;
  }

  /**
   * 
   * @param id 
   */
  public editNovelty(id) {
    let editSubscribe = this.noveltyService
      .getNovelty(id)
      .subscribe((categoria) => {
        editSubscribe.unsubscribe();
      });
  }

  public deleteNovelty(id) {
    this.noveltyService.deleteNovelty(id).then(
      () => {},
      (error) => {
        console.error(error);
      }
    );
  }

  initDataTable() {
    let aaa = this.tablaDatos;
    $("#datatablesNovelty").DataTable().destroy();
    setTimeout(function () {
      /*
       * Opciones del datatable
       */
      aaa = $("#datatablesNovelty").DataTable({
        paging: true,
        ordering: true,
        info: true,
        pagingType: "full_numbers",
        lengthMenu: [
          [10, 25, 50, -1],
          [10, 25, 50, "All"],
        ],
        responsive: true,
        language: {
          search: "INPUT",
          searchPlaceholder: "Buscar",
        },
      });
    }, 10);
  }

  uploadDocumentToStorage() {
    // let serviceGlobal = this.registerService;
    let noveltyLocal = this.novelty;
    var storageService = firebase.storage();
    var refStorage = storageService.ref("/novelty").child(this.novelty.id);
    var uploadTask = refStorage.put(this.imageFile);
    uploadTask.on(
      "state_changed",
      null,
      function (error) {},
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          noveltyLocal.url = downloadURL;
          swal({
            title: "Muy bien",
            text: "Información adicional guardada correctamente",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-fill btn-success",
            type: "success",
          }).catch(swal.noop);
        });
      }
    );
  }

}
