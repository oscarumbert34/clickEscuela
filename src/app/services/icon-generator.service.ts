import { MatIconRegistry } from '@angular/material/icon';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SVG_CONST } from '../components/admin/svg-constants';

@Injectable({
  providedIn: 'root'
})
export class IconGeneratorService {


constructor(
  public sanitizer: DomSanitizer , iconRegister: MatIconRegistry) {
    iconRegister.addSvgIconLiteral('principal-logo', sanitizer.bypassSecurityTrustHtml(SVG_CONST.PRINCIPAL_LOGO));
    iconRegister.addSvgIconLiteral('out-expenses', sanitizer.bypassSecurityTrustHtml(SVG_CONST.EXPENSES));
    iconRegister.addSvgIconLiteral('debtors', sanitizer.bypassSecurityTrustHtml(SVG_CONST.DEBTORS));
    iconRegister.addSvgIconLiteral('csv-icon', sanitizer.bypassSecurityTrustHtml(SVG_CONST.CSV_ICON));
    iconRegister.addSvgIconLiteral('pdf-icon', sanitizer.bypassSecurityTrustHtml(SVG_CONST.PDF_ICON));
    iconRegister.addSvgIconLiteral('daily', sanitizer.bypassSecurityTrustHtml(SVG_CONST.DAILY));
    iconRegister.addSvgIconLiteral('weekly', sanitizer.bypassSecurityTrustHtml(SVG_CONST.WEEKLY));
    iconRegister.addSvgIconLiteral('monthly', sanitizer.bypassSecurityTrustHtml(SVG_CONST.MONTHLY));
    iconRegister.addSvgIconLiteral('custom-date', sanitizer.bypassSecurityTrustHtml(SVG_CONST.CUSTOM_DATE));
    iconRegister.addSvgIcon('user', sanitizer.bypassSecurityTrustResourceUrl('../assets/images/user.svg'));
    iconRegister.addSvgIcon('cancel-error', sanitizer.bypassSecurityTrustResourceUrl('../assets/images/error.svg'));
  }



}
