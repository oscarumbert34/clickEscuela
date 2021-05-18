import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-configuration",
  templateUrl: "./configuration.component.html",
  styleUrls: ["./configuration.component.scss"],
})
export class ConfigurationComponent implements OnInit {
  selectedMenu: boolean;
  selectedOption: number;

  constructor() {
    this.selectedOption = 0;
  }

  selectMenuOption(opt: number) {
    this.selectedMenu = true;
    this.selectedOption = opt;
  }

  goToMainMenu() {
    this.selectedMenu = false;
    this.selectedOption = 0;
  }

  ngOnInit() {}
}
