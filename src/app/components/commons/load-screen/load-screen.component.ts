import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IconGeneratorService } from 'src/app/services/icon-generator.service';

@Component({
  selector: 'app-load-screen',
  templateUrl: './load-screen.component.html',
  styleUrls: ['./load-screen.component.scss']
})
export class LoadScreenComponent implements OnInit {

  @Input() loadError: string;
  @Input() loadService: string;
  @Input() messageError: string;
  @Input() messageInfo: string;
  @Input() messageInfoClass: string;

  @Output() cancel = new EventEmitter<string>();

  constructor( private iconsService: IconGeneratorService) { }

  ngOnInit() {
    console.log(this.messageInfoClass);
  }

  cancelRequest() {
    this.cancel.emit('Cancelando Evento');
  }

}
