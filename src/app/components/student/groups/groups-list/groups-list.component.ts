import { of } from 'rxjs/internal/observable/of';
import { WorkGroupService } from './../../../../services/work-group.service';
import { History } from './../../../../models/History';

import { Comment } from './../../../../models/Comment';
import { WorkGroup } from './../../../../models/WorkGroup';
import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/commons/confirm-dialog/confirm-dialog.component';
const THUMBUP_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.` +
  `44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5` +
  `1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
  </svg>
`;
const IN_TIME =
  '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 255.62 261.04">' +
  '<path fill="#9acd8d"; d="M145.35,275.87c-70.47,0-127.81-58.55-127.81-130.52S74.88,14.83,145.35,14.83,273.16,73.38,273.16,145.35,215.82,275.87,145.35,275.87Zm0-251c-65,0-117.81,54.06-117.81,120.52S80.39,265.87,145.35,265.87s117.81-54.06,117.81-120.52S210.31,24.83,145.35,24.83Z" transform="translate(-17.54 -14.83)"/>' +
  '<path fill="#9acd8d" d="M207.45,153.47h-62.1a5,5,0,0,1-5-5V66a5,5,0,0,1,10,0v77.47h57.1a5,5,0,0,1,0,10Z" transform="translate(-17.54 -14.83)"/>' +
  '</svg>'

const OVER_TIME =
  '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 255.62 261.04">' +
  '<path fill="#fc0000" d="M261.71,91.38a11.14,11.14,0,0,1-1.92.17A10.9,10.9,0,0,1,252,88.33l-6.7-6.7a121.82,121.82,0,0,1,17.85,63.72c0,66.46-52.85,120.52-117.81,120.52S27.54,211.81,27.54,145.35,80.39,24.83,145.35,24.83A115.07,115.07,0,0,1,206.8,42.56a11,11,0,0,1,.37-11.42,125,125,0,0,0-61.82-16.31c-70.47,0-127.81,58.55-127.81,130.52S74.88,275.87,145.35,275.87s127.81-58.55,127.81-130.52A132.06,132.06,0,0,0,261.71,91.38Z" transform="translate(-17.54 -14.83)"/>' +
  '<path fill="#fc0000" d="M207.45,153.47h-62.1a5,5,0,0,1-5-5V66a5,5,0,0,1,10,0v77.47h57.1a5,5,0,0,1,0,10Z" transform="translate(-17.54 -14.83)"/>' +
  '<path fill="#fc0000" d="M263.32,77a5,5,0,0,1-3.53,8.53,5.47,5.47,0,0,1-.9-.08,5.09,5.09,0,0,1-2.64-1.38L238.08,65.92l-2.28,2.29L219.92,84.09A5,5,0,1,1,212.85,77l16.29-16.3L231,58.85,212.85,40.68a5,5,0,0,1-.52-6.45,4.38,4.38,0,0,1,.52-.62,5,5,0,0,1,7.07,0l18.16,18.17,18.17-18.17a5,5,0,0,1,7.07,7.07L245.16,58.85Z" transform="translate(-17.54 -14.83)"/>' +
  '</svg>'

const TO_DO =
  '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 232.55 232.55">'
  + '  <path class="cls-1" d="M242.34,261.63h-194a19.32,19.32,0,0,1-19.29-19.29v-194A19.32,19.32,0,0,1,48.36,29.07h194a19.32,19.32,0,0,1,19.29,19.29v194A19.32,19.32,0,0,1,242.34,261.63ZM48.36,38.28A10.09,10.09,0,0,0,38.28,48.36v194a10.09,10.09,0,0,0,10.08,10.08h194a10.09,10.09,0,0,0,10.08-10.08v-194a10.09,10.09,0,0,0-10.08-10.08Z" transform="translate(-29.07 -29.07)"/>'
  + '</svg>'

const REALIZED =
  '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 264.35 265.52">'
  + ' <path class="cls-1" d="M271.61,39.13l-10,13.68V250.68a11,11,0,0,1-10.95,10.95H40a11,11,0,0,1-11-10.95V40a11,11,0,0,1,11-11H250.68c.34,0,.67,0,1,.05L258,20.4a20.89,20.89,0,0,0-7.36-1.33H40a21,21,0,0,0-21,21V250.68a21,21,0,0,0,21,20.95H250.68a21,21,0,0,0,20.95-20.95V40C271.63,39.72,271.62,39.43,271.61,39.13Z" transform="translate(-19.07 -6.11)"/>'
  + '  <path class="cls-1" d="M282.47,14.05,269.79,31.44l-8.16,11.19-140,192a5,5,0,0,1-3.72,2h-.32a5,5,0,0,1-3.63-1.57L45.57,162.56a5,5,0,1,1,7.28-6.86l64.23,68.19L257.44,31.41l5.89-8.08L274.39,8.16a5,5,0,0,1,8.08,5.89Z" transform="translate(-19.07 -6.11)"/>'
  + '</svg>'






@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit {



  @Input() group: WorkGroup;
  @Input() currentIndex: number;
  @ViewChild('fileLoader') attachs: ElementRef;
  @ViewChild('previewThumb') thumb: ElementRef;

  selectedFiles: any[]

  currentSender: string;
  selectedTab: number;



  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private workGroupService: WorkGroupService, public dialog: MatDialog) {
    iconRegistry.addSvgIconLiteral('thumbs-up', sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON));
    iconRegistry.addSvgIconLiteral('in-time', sanitizer.bypassSecurityTrustHtml(IN_TIME));
    iconRegistry.addSvgIconLiteral('over-time', sanitizer.bypassSecurityTrustHtml(OVER_TIME));

    iconRegistry.addSvgIconLiteral('to-do', sanitizer.bypassSecurityTrustHtml(TO_DO));
    iconRegistry.addSvgIconLiteral('realized', sanitizer.bypassSecurityTrustHtml(REALIZED));
    this.currentSender = "Nicolas Lencinas"
    this.selectedTab = 1;
    this.selectedFiles = []
  }

  changeSelectedTab(num: number) {
    this.selectedTab = num;
  }

  addComment(index, comment) {
    this.workGroupService.addComment(index, this.currentSender, comment)
  }

  addHistory(index, history) {
    this.workGroupService.addHistory(index, this.currentSender, history)
  }



  ngOnInit() {
  }

  getConsigns() {
    let wordReturn = ""
    let numberindex = 0;
    for (let consign of this.group.consigns) {
      numberindex++
      wordReturn += numberindex + ")" + consign + '\n\n';
    }
    return wordReturn
  }

  getFileName() {
    return this.selectedFiles[0].name;
  }

  //funcion nula
  unused() { return null }

  showThumbs() {
    this.selectedFiles = []
    this.selectedFiles.push(this.attachs.nativeElement.files[0])

    console.log(this.selectedFiles)

    let input = this.selectedFiles[0]
    let reader = new FileReader()


    reader.onload = () => {
      this.thumb.nativeElement.src = reader.result

      //Esta parte del codigo switchea los distintos tipos y elige la imagen correcta
      switch (this.selectedFiles[0].type) {
        case 'application/pdf':
          this.thumb.nativeElement.src = "../../../../../assets/images/thumbs/pdf.svg"
          break;
        case 'text/html':
          this.thumb.nativeElement.src = "../../../../../assets/images/thumbs/html.svg";
          break
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          this.thumb.nativeElement.src = "../../../../../assets/images/thumbs/xls.svg";
          break
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          this.thumb.nativeElement.src = "../../../../../assets/images/thumbs/doc.svg";
          break

        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
          this.thumb.nativeElement.src = "../../../../../assets/images/thumbs/ppt.svg";
          break

        case 'text/css':
          this.thumb.nativeElement.src = "../../../../../assets/images/thumbs/css.svg";
          break

        case 'text/plain':
          this.thumb.nativeElement.src = "../../../../../assets/images/thumbs/txt.svg";
          break

        case 'application/postscript':
          this.thumb.nativeElement.src = "../../../../../assets/images/thumbs/ai.svg";
          break

        case 'text/xml':
          this.thumb.nativeElement.src = "../../../../../assets/images/thumbs/xml.svg";
          break

        //En algunos casos el type sale vacio se obtiene la extension mediante el nombre completo del archivo
        case '':
          let splitWord = this.selectedFiles[0].name.split(".")
          console.log(splitWord)

          if (splitWord[splitWord.length - 1] == "php")
            this.thumb.nativeElement.src = "../../../../../assets/images/thumbs/php.svg";

          if (splitWord[splitWord.length - 1] == "scss")
            this.thumb.nativeElement.src = "../../../../../assets/images/thumbs/css.svg";

          if (splitWord[splitWord.length - 1] == "psd")
            this.thumb.nativeElement.src = "../../../../../assets/images/thumbs/ps.svg";

          else
            this.thumb.nativeElement.src = "../../../../../assets/images/thumbs/unknown.svg";

          break


        //El caso defualt se contemplan extensiones de archivos no esperadas pero se comprueba que no sea una imagen por que estas ya tienen miniaturas
        default:
          if (this.selectedFiles[0].type.split("/")[0] != "image")
            this.thumb.nativeElement.src = "../../../../../assets/images/thumbs/unknown.svg";
          if (this.selectedFiles[0].type.split("/")[0] == "video")
            this.thumb.nativeElement.src = "../../../../../assets/images/thumbs/video.svg";
          break
      }
    }

    if (input) {

      reader.readAsDataURL(input)


    } else {
      this.thumb.nativeElement.src = "";

    }


  }

  deleteAttach() {
    this.selectedFiles = []
  }



  loadAttachs() {
    let cantArch = this.selectedFiles.length > 1 ? ' archivos' : " archivo"
    this.addHistory(this.currentIndex, "Ah adjuntado " + this.selectedFiles.length + cantArch)
    this.deleteAttach()
  }

}




