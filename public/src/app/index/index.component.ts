import { Component, OnInit, Renderer2, ElementRef } from "@angular/core";
import { Location } from "@angular/common";
import { CategoryService } from "app/services/categorias/categorias.service";
import * as firebase from "firebase/app";
import { MessageService } from "app/services/message/message.service";
import { DatesService } from "app/services/dates/dates.service";
import { Pipe, PipeTransform } from '@angular/core';
import swal from "sweetalert2";
import { Router } from '@angular/router'

import { filter } from "rxjs/operators";


declare var $: any;

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"],
})
export class IndexComponent implements OnInit {
  year: Date = new Date();
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;
  public arrayCategory: Category[];
  public arrayCategoryAux: Category[];
  public tests = "test";
  public arrayTest = [];
  public message: Message;
  title = 'NG7Swiper';
  public arrayNovedades: any[];
  public arrayNovedades1: any[];
  public arrayImgUsers: { url: string; }[];
  public seachText = '';
  arraySalesPrimium: { description: string; id: string; nombre: string; url: string; }[];

  constructor(
    location: Location,
    private renderer: Renderer2,
    private element: ElementRef,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private datesService: DatesService,
  ) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
    this.arrayNovedades = [
      { img: '../../assets/img/c1.png' },
      { img: '../../assets/img/c2.png' },
      { img: '../../assets/img/c3.png' },
      { img: '../../assets/img/c3.png' },
    ]
    this.arrayNovedades1 = [
      { img: '../../assets/img/c3.png' },
      { img: '../../assets/img/c2.png' },
      { img: '../../assets/img/c2.png' },
      { img: '../../assets/img/c1.png' },
    ]
    
  }

  ngOnInit(): void {
    this.arrayTest = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    this.arrayCategory = [];
    this.arrayCategoryAux = [];
    this.arraySalesPrimium = [
      {
        description: "COMIDA",
        id: "1601658292347",
        nombre: "COMIDA",
        url:
          "https://firebasestorage.googleapis.com/v0/b/buybuycenter-5d02b.appspot.com/o/category%2F1601658292347?alt=media&token=b07ed81f-ed4d-4841-854c-bbb31e9fc1c3",
      },
    ]
    this.getCategories();
    this.message = {};
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggle")[0];


    

  }


  
  

  /**
   * *** Optenemos todas las categorias de la DB ***
   */
  async getCategories() {
    await this.categoryService.getCategories().subscribe((categorySnapshot) => {
      this.arrayCategory = [];
      this.arrayCategoryAux = [];
      categorySnapshot.forEach((categoryData) => {
        this.arrayCategory.push(categoryData.payload.doc.data());
        this.arrayCategoryAux.push(categoryData.payload.doc.data());
      });
    });
  }

  sidebarOpen() {
    var toggleButton = this.toggleButton;
    var body = document.getElementsByTagName("body")[0];
    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);
    body.classList.add("nav-open");
    this.sidebarVisible = true;
  }
  sidebarClose() {
    var body = document.getElementsByTagName("body")[0];
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    body.classList.remove("nav-open");
  }
  sidebarToggle() {
    if (this.sidebarVisible == false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  isLogin() {
    if (
      this.location.prepareExternalUrl(this.location.path()) === "#/pages/login"
    ) {
      return true;
    }
    return false;
  }

  isRegister() {
    if (
      this.location.prepareExternalUrl(this.location.path()) ===
      "#/pages/register"
    ) {
      return true;
    }
    return false;
  }

  getPath() {
    return this.location.prepareExternalUrl(this.location.path());
  }

  onSaveMessage (message: Message, valid: boolean) {
    message.message_date = this.datesService.getDateCurrent();
    message.message_id = new Date().getTime().toString();
    message.message_time = this.datesService.getTimeCurrent();
    message.message_state = false;
    if (valid) {
      this.messageService.createMessage(message).then(() => {
        swal("OK", "Mensaje enviado correctamente", "success");
        this.message = {};
      });
    }
  }

  onCancelMessage () {
    this.message = {};
  }

  searchCategory () {
    this.arrayCategory = [];
    this.arrayCategoryAux.forEach(element => {
      if (element.nombre.toUpperCase().includes((this.seachText).toUpperCase())) {
        this.arrayCategory.push(element);
      }
    });
  }
}
