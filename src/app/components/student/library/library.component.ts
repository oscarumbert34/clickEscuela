import { MatDialog } from '@angular/material/dialog';
import { LibraryServiceService } from './../../../services/libraryService.service';
import { LibraryFile } from '../../../models/library-file';
import { ProxyService } from './../../../services/proxyService.service';
import { element } from 'protractor';
import { Component, OnInit, ElementRef, ViewChildren, QueryList, ViewChild, Renderer2 } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as pdfjsLib from 'pdfjs-dist';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { ModalFrameComponent } from '../modal-frame/modal-frame.component';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  providers:[ProxyService]
})
export class LibraryComponent implements OnInit {

  @ViewChildren('canvas') canvasDiv: QueryList<ElementRef>
  
  canvasList: LibraryFile[];
  currentURL:any;



  constructor(private renderer: Renderer2, private proxy: ProxyService,private libraryService: LibraryServiceService, private sanitazer: DomSanitizer, private dialog: MatDialog) {

    this.canvasList = [];
    this.canvasList=libraryService.libraryFiles
    this.currentURL=""
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

    for (let i=0;i<this.canvasList.length;i++){
      this.getPdf(this.canvasList[i].url,i);
    }
    
  }

  openFrame(index)
  {
    console.log(index)
    this.currentURL=this.sanitazer.bypassSecurityTrustResourceUrl(this.canvasList[index].url)
    console.log(this.currentURL)
    
    

    
    const dialogRef = this.dialog.open(ModalFrameComponent,
      {
        data: this.currentURL,
        width: '530px',
        height: '90%',
        panelClass:"url-frame"
      }
    )

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
     

      }
    });

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
