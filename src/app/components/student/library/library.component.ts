import { ProxyService } from './../../../services/proxyService.service';
import { element } from 'protractor';
import { Component, OnInit, ElementRef, ViewChildren, QueryList, ViewChild, Renderer2 } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as pdfjsLib from 'pdfjs-dist';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  providers:[ProxyService]
})
export class LibraryComponent implements OnInit {

  @ViewChildren('canvas') canvasDiv: QueryList<ElementRef>
  
  canvasList: string[];



  constructor(private renderer: Renderer2, private proxy: ProxyService) {

    this.canvasList = [];
    this.canvasList.push(
     'http://localhost:4200/assets/pdf/prueba1.pdf?',
     'http://localhost:4200/assets/pdf/prueba2.pdf?',
     'http://localhost:4200/assets/pdf/prueba3.pdf?',
     'http://localhost:4200/assets/pdf/manual.pdf?',
     )
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

    for (let i=0;i<this.canvasList.length;i++){
      this.getPdf(this.canvasList[i],i);
    }
    
  }

  getPdf(url:string,ind) {
    let that = this.canvasDiv.filter((element, index) => index === ind)[0]
    console.log(that)
    //console.log(this.canvasDiv);

    pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdn.jsdelivr.net/npm/pdfjs-dist@2.6.347/build/pdf.worker.js';

    let loadingTask = pdfjsLib.getDocument(url);

    loadingTask.promise.then(function (pdf) {
      pdf.getPage(1).then(function (page) {
        var scale = 1.5;
        var viewport = page.getViewport({ scale: scale, });

        var canvas = that.nativeElement;
        console.log(canvas)
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext);
      })

    })

  }





}
