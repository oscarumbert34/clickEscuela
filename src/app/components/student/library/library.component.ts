import { MatDialog } from '@angular/material/dialog';
import { LibraryServiceService } from '../../../services/library-service.service';
import { LibraryFile } from '../../../models/library-file';
import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import 'jspdf-autotable';
import * as pdfjsLib from 'pdfjs-dist';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalFrameComponent } from '../modal-frame/modal-frame.component';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  providers: [],
})
export class LibraryComponent implements OnInit {
  @ViewChildren('canvas') canvasDiv: QueryList<ElementRef>;

  canvasList: LibraryFile[];
  currentURL: any;

  constructor(
    private libraryService: LibraryServiceService,
    private sanitazer: DomSanitizer,
    private dialog: MatDialog
  ) {
    this.canvasList = [];
    this.canvasList = libraryService.libraryFiles;
    this.currentURL = '';
  }

  ngOnInit() { console.log('hello'); }

  ngAfterViewInit() {
    for (let i = 0; i < this.canvasList.length; i++) {
      this.getPdf(this.canvasList[i].url, i);
    }
  }

  openFrame(index) {
    console.log(index);
    this.currentURL = this.sanitazer.bypassSecurityTrustResourceUrl(
      this.canvasList[index].url
    );
    console.log(this.currentURL);

    this.dialog.open(ModalFrameComponent, {
      data: this.currentURL,
      width: '530px',
      height: '90%',
      panelClass: 'url-frame',
    });

  }

  getPdf(url: string, ind) {
    const that = this.canvasDiv.filter((index) => index === ind)[0];

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      '//cdn.jsdelivr.net/npm/pdfjs-dist@2.6.347/build/pdf.worker.js';

    const loadingTask = pdfjsLib.getDocument(url);

    loadingTask.promise.then((pdf) => {
      pdf.getPage(1).then((page) => {
        const theViewport = page.getViewport({ scale: 1.5 });

        const canvas = that.nativeElement;
        console.log(canvas);
        const context = canvas.getContext('2d');
        canvas.height = theViewport.height;
        canvas.width = theViewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: theViewport,
        };
        page.render(renderContext);
      });
    });
  }
}
