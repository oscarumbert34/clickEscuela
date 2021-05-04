import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpensesService } from './../../../services/expenses.service';


import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Student } from 'src/app/models/student';
import { AccountService } from 'src/app/services/account.service';
import { studentService } from 'src/app/services/student.service';
import { ModalFrameComponent } from '../../student/modal-frame/modal-frame.component';
import { table } from 'console';
import { N } from '@angular/cdk/keycodes';
import moment from 'moment';
import { RangeSelectorComponent } from '../../commons/range-selector/range-selector.component';
import { FormControl, FormGroup } from '@angular/forms';


const EXPENSES =
  '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 281.61 278.51">'
  + '  <defs>'
  + '    <style>'
  + '      .cls-1 {'
  + '        fill: #9acd8d;'
  + '      }'
  + '    </style>'
  + '  </defs>'
  + '  <path class="cls-1" d="M266.68,74.48l-13,7.5A124.1,124.1,0,1,1,170,21h35V17A138.51,138.51,0,0,0,145.35,3.52C68.56,3.52,6.09,66,6.09,142.77S68.56,282,145.35,282s139.26-62.47,139.26-139.26A138.38,138.38,0,0,0,266.68,74.48Z" transform="translate(-6.09 -3.52)"/>'
  + '  <path class="cls-1" d="M148.45,230.26a1.25,1.25,0,0,1-1.24-1.24V216.84a7.78,7.78,0,0,0-7.1-7.73c-8.43-.69-16.82-3-23-6.46a1.26,1.26,0,0,1-.59-1.52l1.93-5.37a1.24,1.24,0,0,1,1.76-.67,59.13,59.13,0,0,0,26.86,6.63c16.45,0,27.94-9.7,27.94-23.58,0-15.31-12.87-22.59-25.46-27.73-23.17-9.09-32.19-18.29-32.19-32.86S127.08,91.72,142.73,88a7.7,7.7,0,0,0,5.93-7.54V67.76a1.25,1.25,0,0,1,1.24-1.24h3.86A1.24,1.24,0,0,1,155,67.76h0V79.17a7.74,7.74,0,0,0,7.09,7.73,51.87,51.87,0,0,1,18.08,4.73,1.24,1.24,0,0,1,.6,1.54l-2,5.23a1.25,1.25,0,0,1-1.16.82,1.13,1.13,0,0,1-.51-.12A53.78,53.78,0,0,0,153.9,94c-17.44,0-25.24,10.6-25.24,21.09,0,12.84,9.34,19,27.73,26.65,21.39,8.74,30.12,18.86,30.12,34.94,0,15.22-10.53,27.55-26.83,31.4a7.73,7.73,0,0,0-5.94,7.54V229a1.24,1.24,0,0,1-1.22,1.24Z" transform="translate(-6.09 -3.52)"/>'
  + '  <path class="cls-1" d="M285,52.33,261.46,66l-13,7.52L223,88.15a5.33,5.33,0,0,1-8-4.62V69.78a5.33,5.33,0,0,0-5.33-5.33H164.46a5.32,5.32,0,0,1-5.33-5.33V36.31A5.32,5.32,0,0,1,164.46,31h45.23A5.33,5.33,0,0,0,215,25.65V11.9a5.32,5.32,0,0,1,8-4.61L285,43.1A5.33,5.33,0,0,1,285,52.33Z" transform="translate(-6.09 -3.52)"/>'
  + '</svg>'


const DEBTORS =
  '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 278.52 279.23">'
  + '  <defs>'
  + '    <style>'
  + '      .cls-1 {'
  + '        fill: #9acd8d;'
  + '      }'
  + '    </style>'
  + '  </defs>'
  + '  <path class="cls-1" d="M273.92,89.28a20.34,20.34,0,0,1-13.33,7A124.26,124.26,0,1,1,145.35,18.52,125,125,0,0,1,168,20.58a20.44,20.44,0,0,1,4.5-13.92l.35-.42a139.69,139.69,0,0,0-27.47-2.72C68.56,3.52,6.09,66,6.09,142.77S68.56,282,145.35,282s139.26-62.47,139.26-139.26A138.35,138.35,0,0,0,273.92,89.28Z" transform="translate(-6.09 -2.8)"/>'
  + '  <path class="cls-1" d="M142.32,230.26a1.25,1.25,0,0,1-1.24-1.24V216.84a7.78,7.78,0,0,0-7.1-7.73c-8.43-.69-16.82-3-23-6.46a1.25,1.25,0,0,1-.58-1.52l1.92-5.37a1.24,1.24,0,0,1,1.17-.82,1.2,1.2,0,0,1,.59.15,59.14,59.14,0,0,0,26.87,6.63c16.45,0,27.94-9.7,27.94-23.58,0-15.31-12.88-22.59-25.47-27.73-23.17-9.09-32.18-18.29-32.18-32.86S121,91.72,136.6,88a7.7,7.7,0,0,0,5.93-7.54V67.76a1.25,1.25,0,0,1,1.24-1.24h3.86a1.23,1.23,0,0,1,1.24,1.24h0V79.17A7.75,7.75,0,0,0,156,86.9,51.82,51.82,0,0,1,174,91.63a1.24,1.24,0,0,1,.6,1.54l-2,5.23a1.25,1.25,0,0,1-1.16.82,1.16,1.16,0,0,1-.51-.12A53.78,53.78,0,0,0,147.77,94c-17.44,0-25.24,10.6-25.24,21.09,0,12.84,9.34,19,27.73,26.65,21.4,8.74,30.12,18.86,30.12,34.94,0,15.22-10.53,27.55-26.83,31.4a7.71,7.71,0,0,0-5.93,7.54V229a1.24,1.24,0,0,1-1.23,1.24Z" transform="translate(-6.09 -2.8)"/>'
  + '  <path class="cls-1" d="M198.27,14Q192,11.41,185.54,9.43A10.47,10.47,0,0,1,195,11.35Z" transform="translate(-6.09 -2.8)"/>'
  + '  <path class="cls-1" d="M268.66,78.11a10.52,10.52,0,0,1-10.27,8.3,10.81,10.81,0,0,1-2.46-.29,10.42,10.42,0,0,1-4.12-2l-27-21.73L202.58,88.88a10.5,10.5,0,0,1-16.09-13.5l22-26.21L181.84,27.7a10.51,10.51,0,0,1,3.7-18.27q6.51,2,12.73,4.54L222,33.08l3.48-4.14L244.25,6.55a10.5,10.5,0,1,1,16.08,13.5L241.67,42.29l-3.33,4,21.51,17.33h0L265,67.73A10.47,10.47,0,0,1,268.66,78.11Z" transform="translate(-6.09 -2.8)"/>'
  + '  <path class="cls-1" d="M198.27,14Q192,11.41,185.54,9.43A10.47,10.47,0,0,1,195,11.35Z" transform="translate(-6.09 -2.8)"/>'
  + '</svg>'

const CSV_ICON =

  '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210.94 281.25">'
  + '  <defs>'
  + '    <style>'
  + '      .cls-1 {'
  + '        fill: #9acd8d;'
  + '      }'
  + '    </style>'
  + '  </defs>'
  + '  <path class="cls-1" d="M249.32,65,190.73,6.44a5.86,5.86,0,0,0-4.15-1.71h-123A23.46,23.46,0,0,0,40.1,28.16V262.54A23.46,23.46,0,0,0,63.54,286H227.6A23.46,23.46,0,0,0,251,262.54V69.18A5.83,5.83,0,0,0,249.32,65ZM192.44,24.73,231,63.32H204.16A11.74,11.74,0,0,1,192.44,51.6Zm46.88,237.81a11.74,11.74,0,0,1-11.72,11.72H63.54a11.74,11.74,0,0,1-11.72-11.72V28.16A11.74,11.74,0,0,1,63.54,16.44H180.72V51.6A23.46,23.46,0,0,0,204.16,75h35.16Z" transform="translate(-40.1 -4.73)"/>'
  + '  <g>'
  + '    <path class="cls-1" d="M219.79,97.67H160V87.33A9.44,9.44,0,0,0,148.78,78L69.61,92.89a9.44,9.44,0,0,0-7.72,9.28V211a9.44,9.44,0,0,0,7.71,9.28l79.12,14.84a9,9,0,0,0,1.8.18,9.44,9.44,0,0,0,9.44-9.45V215.53h59.83a9.45,9.45,0,0,0,9.45-9.44v-99A9.46,9.46,0,0,0,219.79,97.67ZM151,225.88a.46.46,0,0,1-.17.35.44.44,0,0,1-.36.08L71.25,211.47a.45.45,0,0,1-.36-.44V102.17a.45.45,0,0,1,.37-.44l79.26-14.86h0a.48.48,0,0,1,.25.1l0,0a.42.42,0,0,1,.15.34Zm69.28-19.79a.45.45,0,0,1-.45.44H160V191.24h10.35a5,5,0,1,0,0-9.9H160v-9.89h10.35a4.95,4.95,0,0,0,0-9.9H160v-9.9h10.35a4.95,4.95,0,1,0,0-9.89H160v-9.9h10.35a5,5,0,0,0,0-9.9H160V106.67h59.83a.45.45,0,0,1,.45.45Z" transform="translate(-40.1 -4.73)"/>'
  + '    <path class="cls-1" d="M200,122h-9.9a4.95,4.95,0,1,0,0,9.9H200a4.95,4.95,0,0,0,0-9.9Z" transform="translate(-40.1 -4.73)"/>'
  + '    <path class="cls-1" d="M200,141.76h-9.9a4.95,4.95,0,1,0,0,9.89H200a4.95,4.95,0,1,0,0-9.89Z" transform="translate(-40.1 -4.73)"/>'
  + '    <path class="cls-1" d="M200,161.55h-9.9a4.95,4.95,0,0,0,0,9.9H200a4.95,4.95,0,0,0,0-9.9Z" transform="translate(-40.1 -4.73)"/>'
  + '    <path class="cls-1" d="M200,181.34h-9.9a4.95,4.95,0,1,0,0,9.9H200a4.95,4.95,0,0,0,0-9.9Z" transform="translate(-40.1 -4.73)"/>'
  + '    <path class="cls-1" d="M118.8,155.26l15.82-20.35a5,5,0,0,0-7.81-6.09l-14.65,18.85L99.81,133.55a4.95,4.95,0,0,0-7.45,6.51L106,155.62,92.18,173.36a4.95,4.95,0,0,0,7.81,6.07l12.62-16.23L127,179.64a4.94,4.94,0,1,0,7.44-6.5Z" transform="translate(-40.1 -4.73)"/>'
  + '  </g>'
  + '</svg>'



const PDF_ICON =
  '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210.94 281.25">'
  + '  <defs>'
  + '    <style>'
  + '      .cls-1 {'
  + '        fill: #9acd8d;'
  + '      }'
  + '    </style>'
  + '  </defs>'
  + '  <g>'
  + '    <path class="cls-1" d="M249.1,65,190.51,6.44a5.85,5.85,0,0,0-4.14-1.71h-123A23.46,23.46,0,0,0,39.88,28.16V262.54A23.46,23.46,0,0,0,63.32,286H227.38a23.46,23.46,0,0,0,23.44-23.43V69.18A5.83,5.83,0,0,0,249.1,65ZM192.22,24.73l38.59,38.59H203.94A11.74,11.74,0,0,1,192.22,51.6ZM239.1,262.54a11.74,11.74,0,0,1-11.72,11.72H63.32A11.74,11.74,0,0,1,51.6,262.54V28.16A11.74,11.74,0,0,1,63.32,16.44H180.51V51.6A23.46,23.46,0,0,0,203.94,75H239.1Z" transform="translate(-39.88 -4.73)"/>'
  + '    <path class="cls-1" d="M175.22,176.74a168.8,168.8,0,0,1-14-12.1c-4.46-4.46-8.44-8.78-11.89-12.9,5.39-16.66,7.75-25.25,7.75-29.83,0-19.45-7-23.44-17.58-23.44-8,0-17.58,4.17-17.58,24,0,8.75,4.79,19.36,14.29,31.7-2.33,7.09-5.06,15.26-8.12,24.48-1.48,4.43-3.08,8.52-4.78,12.31-1.38.61-2.71,1.24-4,1.88-4.66,2.33-9.08,4.43-13.18,6.37C87.4,208.07,75,213.93,75,225.5c0,8.4,9.12,13.6,17.58,13.6C103.51,239.1,120,224.55,132,200c12.47-4.92,28-8.56,40.22-10.84,9.81,7.54,20.64,14.75,25.88,14.75,14.53,0,17.58-8.4,17.58-15.44,0-13.85-15.82-13.85-23.44-13.85A136.88,136.88,0,0,0,175.22,176.74Zm-82.6,50.64a9.26,9.26,0,0,1-5.86-1.88c0-4.16,12.38-10,24.37-15.7l2.31-1.1C104.64,221.46,95.94,227.38,92.62,227.38Zm41-104.91c0-12.28,3.81-12.28,5.86-12.28,4.14,0,5.86,0,5.86,11.72,0,2.47-1.65,8.65-4.66,18.3C136.09,133.13,133.63,127.06,133.63,122.47Zm4.49,63c.37-1,.72-2,1.07-3.09,2.17-6.52,4.13-12.38,5.87-17.66q3.66,4,7.87,8.23c1.1,1.1,3.82,3.57,7.45,6.67C153.15,181.17,145.47,183.12,138.12,185.45Zm65.82,3.05c0,2.63,0,3.72-5.43,3.76-1.6-.34-5.29-2.52-9.84-5.62,1.65-.18,2.87-.27,3.55-.27C200.88,186.37,203.34,187.21,203.94,188.5Z" transform="translate(-39.88 -4.73)"/>'
  + '  </g>'
  + '</svg>'

const DAILY =
  '  <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272.06 272.06">'
  + '  <defs>'
  + '    <style>'
  + '      .cls-1 {'
  + '        fill: #9acd8d;'
  + '      }'
  + ''
  + '      .marked {'
  + '        fill: #0e3004;'
  + '      }'
  + '    </style>'
  + '  </defs>'
  + '  <path class="cls-1" d="M276.07,30.58H248.43V26.32a17,17,0,1,0-34,0v4.26H191.05V26.32a17,17,0,0,0-34,0v4.26H133.66V26.32a17,17,0,0,0-34,0v4.26H76.27V26.32a17,17,0,1,0-34,0v4.26H14.63a5.31,5.31,0,0,0-5.31,5.31V276.07a5.31,5.31,0,0,0,5.31,5.31H276.07a5.31,5.31,0,0,0,5.31-5.31V35.89A5.31,5.31,0,0,0,276.07,30.58Zm-51-4.26a6.38,6.38,0,0,1,12.76,0V49.7a6.38,6.38,0,0,1-12.76,0Zm-57.38,0a6.38,6.38,0,0,1,12.75,0V49.7a6.38,6.38,0,1,1-12.75,0Zm-57.39,0a6.38,6.38,0,0,1,12.75,0V49.7a6.38,6.38,0,1,1-12.75,0Zm-57.39,0a6.38,6.38,0,0,1,12.76,0V49.7a6.38,6.38,0,1,1-12.76,0ZM270.75,90.09H169.26a5.32,5.32,0,0,0,0,10.63H270.75v170H20v-170H121.44a5.32,5.32,0,0,0,0-10.63H20V41.2H42.27v8.5a17,17,0,1,0,34,0V41.2H99.65v8.5a17,17,0,1,0,34,0V41.2H157v8.5a17,17,0,1,0,34,0V41.2h23.38v8.5a17,17,0,1,0,34,0V41.2h22.32Z" transform="translate(-9.32 -9.32)"/>'
  + '  <path class="cls-1" d="M246.31,119.84H44.39a5.32,5.32,0,0,0-5.31,5.32V246.31a5.31,5.31,0,0,0,5.31,5.31H246.31a5.31,5.31,0,0,0,5.31-5.31V125.16A5.32,5.32,0,0,0,246.31,119.84ZM89.62,241H49.7V211.24H89.62Zm0-40.39H49.7V170.86H89.62Zm0-40.38H49.7V130.47H89.62ZM140.1,241H100.25V211.24H140.1Zm0-40.39H100.25V170.86H140.1Zm0-40.38H100.25V130.47H140.1ZM190.58,241H150.73V211.24h39.85Zm0-40.39H150.73V170.86h39.85Zm0-40.38H150.73V130.47h39.85ZM241,241H201.21V211.24H241Zm0-40.39H201.21V170.86H241Zm0-40.38H201.21V130.47H241Z" transform="translate(-9.32 -9.32)"/>'
  + '  <rect class="marked" x="40.38" y="121.15" width="39.92" height="29.76"/>'
  + '  <path class="cls-1" d="M145.35,100.72a5.31,5.31,0,1,0-3.76-1.56A5.36,5.36,0,0,0,145.35,100.72Z" transform="translate(-9.32 -9.32)"/>'
  + '</svg>'

const WEEKLY =
  '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272.06 272.06">'
  + '  <defs>'
  + '    <style>'
  + '      .cls-1 {'
  + '        fill: #9acd8d;'
  + '      }'
  + ''
  + '      .marked {'
  + '        fill: #0e3004;'
  + '      }'
  + '    </style>'
  + '  </defs>'
  + '  <path class="cls-1" d="M276.07,30.58H248.43V26.32a17,17,0,1,0-34,0v4.26H191.05V26.32a17,17,0,0,0-34,0v4.26H133.66V26.32a17,17,0,0,0-34,0v4.26H76.27V26.32a17,17,0,1,0-34,0v4.26H14.63a5.31,5.31,0,0,0-5.31,5.31V276.07a5.31,5.31,0,0,0,5.31,5.31H276.07a5.31,5.31,0,0,0,5.31-5.31V35.89A5.31,5.31,0,0,0,276.07,30.58Zm-51-4.26a6.38,6.38,0,0,1,12.76,0V49.7a6.38,6.38,0,0,1-12.76,0Zm-57.38,0a6.38,6.38,0,0,1,12.75,0V49.7a6.38,6.38,0,1,1-12.75,0Zm-57.39,0a6.38,6.38,0,0,1,12.75,0V49.7a6.38,6.38,0,1,1-12.75,0Zm-57.39,0a6.38,6.38,0,0,1,12.76,0V49.7a6.38,6.38,0,1,1-12.76,0ZM270.75,90.09H169.26a5.32,5.32,0,0,0,0,10.63H270.75v170H20v-170H121.44a5.32,5.32,0,0,0,0-10.63H20V41.2H42.27v8.5a17,17,0,1,0,34,0V41.2H99.65v8.5a17,17,0,1,0,34,0V41.2H157v8.5a17,17,0,1,0,34,0V41.2h23.38v8.5a17,17,0,1,0,34,0V41.2h22.32Z" transform="translate(-9.32 -9.32)"/>'
  + '  <path class="cls-1" d="M246.31,119.84H44.39a5.32,5.32,0,0,0-5.31,5.32V246.31a5.31,5.31,0,0,0,5.31,5.31H246.31a5.31,5.31,0,0,0,5.31-5.31V125.16A5.32,5.32,0,0,0,246.31,119.84ZM89.62,241H49.7V211.24H89.62Zm0-40.39H49.7V170.86H89.62Zm0-40.38H49.7V130.47H89.62ZM140.1,241H100.25V211.24H140.1Zm0-40.39H100.25V170.86H140.1Zm0-40.38H100.25V130.47H140.1ZM190.58,241H150.73V211.24h39.85Zm0-40.39H150.73V170.86h39.85Zm0-40.38H150.73V130.47h39.85ZM241,241H201.21V211.24H241Zm0-40.39H201.21V170.86H241Zm0-40.38H201.21V130.47H241Z" transform="translate(-9.32 -9.32)"/>'
  + '  <rect class="marked" x="191.89" y="121.15" width="39.79" height="29.76"/>'
  + '  <rect class="marked" x="141.41" y="121.15" width="39.85" height="29.76"/>'
  + '  <rect class="marked" x="90.93" y="121.15" width="39.85" height="29.76"/>'
  + '  <rect class="marked" x="40.38" y="121.15" width="39.92" height="29.76"/>'
  + '  <path class="cls-1" d="M145.35,100.72a5.31,5.31,0,1,0-3.76-1.56A5.36,5.36,0,0,0,145.35,100.72Z" transform="translate(-9.32 -9.32)"/>'
  + '</svg>'

const MONTHLY =
  '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272.06 272.06">'
  + '  <defs>'
  + '    <style>'
  + '      .cls-1 {'
  + '        fill: #9acd8d;'
  + '      }'
  + ''
  + '      .marked {'
  + '        fill: #0e3004;'
  + '      }'
  + '    </style>'
  + '  </defs>'
  + '  <path class="cls-1" d="M276.07,30.58H248.43V26.32a17,17,0,1,0-34,0v4.26H191.05V26.32a17,17,0,0,0-34,0v4.26H133.66V26.32a17,17,0,0,0-34,0v4.26H76.27V26.32a17,17,0,1,0-34,0v4.26H14.63a5.31,5.31,0,0,0-5.31,5.31V276.07a5.31,5.31,0,0,0,5.31,5.31H276.07a5.31,5.31,0,0,0,5.31-5.31V35.89A5.31,5.31,0,0,0,276.07,30.58Zm-51-4.26a6.38,6.38,0,0,1,12.76,0V49.7a6.38,6.38,0,0,1-12.76,0Zm-57.38,0a6.38,6.38,0,0,1,12.75,0V49.7a6.38,6.38,0,1,1-12.75,0Zm-57.39,0a6.38,6.38,0,0,1,12.75,0V49.7a6.38,6.38,0,1,1-12.75,0Zm-57.39,0a6.38,6.38,0,0,1,12.76,0V49.7a6.38,6.38,0,1,1-12.76,0ZM270.75,90.09H169.26a5.32,5.32,0,0,0,0,10.63H270.75v170H20v-170H121.44a5.32,5.32,0,0,0,0-10.63H20V41.2H42.27v8.5a17,17,0,1,0,34,0V41.2H99.65v8.5a17,17,0,1,0,34,0V41.2H157v8.5a17,17,0,1,0,34,0V41.2h23.38v8.5a17,17,0,1,0,34,0V41.2h22.32Z" transform="translate(-9.32 -9.32)"/>'
  + '  <path class="cls-1" d="M246.31,119.84H44.39a5.32,5.32,0,0,0-5.31,5.32V246.31a5.31,5.31,0,0,0,5.31,5.31H246.31a5.31,5.31,0,0,0,5.31-5.31V125.16A5.32,5.32,0,0,0,246.31,119.84ZM89.62,241H49.7V211.24H89.62Zm0-40.39H49.7V170.86H89.62Zm0-40.38H49.7V130.47H89.62ZM140.1,241H100.25V211.24H140.1Zm0-40.39H100.25V170.86H140.1Zm0-40.38H100.25V130.47H140.1ZM190.58,241H150.73V211.24h39.85Zm0-40.39H150.73V170.86h39.85Zm0-40.38H150.73V130.47h39.85ZM241,241H201.21V211.24H241Zm0-40.39H201.21V170.86H241Zm0-40.38H201.21V130.47H241Z" transform="translate(-9.32 -9.32)"/>'
  + '  <rect class="marked" x="191.89" y="201.92" width="39.79" height="29.76"/>'
  + '  <rect class="marked" x="141.41" y="201.92" width="39.85" height="29.76"/>'
  + '  <rect class="marked" x="90.93" y="201.92" width="39.85" height="29.76"/>'
  + '  <rect class="marked" x="40.38" y="201.92" width="39.92" height="29.76"/>'
  + '  <rect class="marked" x="191.89" y="161.54" width="39.79" height="29.75"/>'
  + '  <rect class="marked" x="141.41" y="161.54" width="39.85" height="29.75"/>'
  + '  <rect class="marked" x="90.93" y="161.54" width="39.85" height="29.75"/>'
  + '  <rect class="marked" x="40.38" y="161.54" width="39.92" height="29.75"/>'
  + '  <rect class="marked" x="191.89" y="121.15" width="39.79" height="29.76"/>'
  + '  <rect class="marked" x="141.41" y="121.15" width="39.85" height="29.76"/>'
  + '  <rect class="marked" x="90.93" y="121.15" width="39.85" height="29.76"/>'
  + '  <rect class="marked" x="40.38" y="121.15" width="39.92" height="29.76"/>'
  + '  <path class="cls-1" d="M145.35,100.72a5.31,5.31,0,1,0-3.76-1.56A5.36,5.36,0,0,0,145.35,100.72Z" transform="translate(-9.32 -9.32)"/>'
  + '</svg>'

const CUSTOM_DATE =
  '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272.06 311.38">'
  + '  <defs>'
  + '    <style>'
  + '      .cls-1 {'
  + '        fill: #9acd8d;'
  + '      }'
  + ''
  + '      .marked {'
  + '        fill: #0e3004;'
  + '      }'
  + ''
  + '      .cls-3 {'
  + '        fill: #fff;'
  + '      }'
  + '    </style>'
  + '  </defs>'
  + '  <path class="cls-1" d="M246.31,119.84H44.39a5.32,5.32,0,0,0-5.31,5.32V246.31a5.31,5.31,0,0,0,5.31,5.31H246.31a5.31,5.31,0,0,0,5.31-5.31V125.16A5.32,5.32,0,0,0,246.31,119.84ZM89.62,241H49.7V211.24H89.62Zm0-40.39H49.7V170.86H89.62Zm0-40.38H49.7V130.47H89.62ZM140.1,241H100.25V211.24H140.1Zm0-40.39H100.25V170.86H140.1Zm0-40.38H100.25V130.47H140.1ZM190.58,241H150.73V211.24h39.85Zm0-40.39H150.73V170.86h39.85Zm0-40.38H150.73V130.47h39.85ZM241,241H201.21V211.24H241Zm0-40.39H201.21V170.86H241Zm0-40.38H201.21V130.47H241Z" transform="translate(-9.32 -9.32)"/>'
  + '  <g>'
  + '    <rect class="marked" x="40.38" y="161.54" width="39.92" height="29.75"/>'
  + '    <rect class="marked" x="90.67" y="161.28" width="39.85" height="29.75"/>'
  + '    <rect class="marked" x="191.63" y="120.89" width="39.79" height="29.76"/>'
  + '    <rect class="marked" x="141.15" y="120.89" width="39.85" height="29.76"/>'
  + '  </g>'
  + '  <g>'
  + '    <path class="cls-1" d="M276.07,30.58H248.43V26.32a17,17,0,1,0-34,0v4.26H191.05V26.32a17,17,0,0,0-34,0v4.26H133.66V26.32a17,17,0,0,0-34,0v4.26H76.27V26.32a17,17,0,1,0-34,0v4.26H14.63a5.31,5.31,0,0,0-5.31,5.31V276.07a5.31,5.31,0,0,0,5.31,5.31H276.07a5.31,5.31,0,0,0,5.31-5.31V35.89A5.31,5.31,0,0,0,276.07,30.58Zm-51-4.26a6.38,6.38,0,0,1,12.76,0V49.7a6.38,6.38,0,0,1-12.76,0Zm-57.38,0a6.38,6.38,0,0,1,12.75,0V49.7a6.38,6.38,0,1,1-12.75,0Zm-57.39,0a6.38,6.38,0,0,1,12.75,0V49.7a6.38,6.38,0,1,1-12.75,0Zm-57.39,0a6.38,6.38,0,0,1,12.76,0V49.7a6.38,6.38,0,1,1-12.76,0ZM270.75,90.09H169.26a5.32,5.32,0,0,0,0,10.63H270.75v170H20v-170H121.44a5.32,5.32,0,0,0,0-10.63H20V41.2H42.27v8.5a17,17,0,1,0,34,0V41.2H99.65v8.5a17,17,0,1,0,34,0V41.2H157v8.5a17,17,0,1,0,34,0V41.2h23.38v8.5a17,17,0,1,0,34,0V41.2h22.32Z" transform="translate(-9.32 -9.32)"/>'
  + '    <path class="cls-1" d="M145.35,90.09a5.31,5.31,0,1,0,3.76,1.56A5.36,5.36,0,0,0,145.35,90.09Z" transform="translate(-9.32 -9.32)"/>'
  + '  </g>'
  + '  <g>'
  + '    <path d="M265.59,216.75a13.72,13.72,0,0,0-7.72,2.35,13.89,13.89,0,0,0-13.08-9.28,13.73,13.73,0,0,0-7.71,2.35,13.87,13.87,0,0,0-20-7.43V175.16a13.86,13.86,0,0,0-27.72,0v73.52l-20.49-12.56-.16-.1a13.53,13.53,0,0,0-7.08-2,13.89,13.89,0,0,0-13.86,13.88,13.49,13.49,0,0,0,2.16,7.42l.05.07,31.77,50.65a31,31,0,0,0,26.42,14.62h40.1a31.22,31.22,0,0,0,31.19-31.19v-58.9A13.87,13.87,0,0,0,265.59,216.75Zm6.93,72.76a24.29,24.29,0,0,1-24.26,24.26h-40.1a24.14,24.14,0,0,1-20.56-11.36l-31.86-50.8s-.05-.1-.08-.14a6.7,6.7,0,0,1-1-3.53,6.93,6.93,0,0,1,6.93-6.93,6.58,6.58,0,0,1,3.55,1l.22.14L191,257.81l.09.06.13.06.19.1.1,0,.24.09s.05,0,.08,0l.24.06h.1a.91.91,0,0,0,.23,0,.27.27,0,0,0,.12,0H193a.68.68,0,0,0,.21,0h.1l.25,0h0l.29-.07a0,0,0,0,1,0,0l.29-.11,0,0,.24-.13.09,0a2,2,0,0,1,.18-.13l.12-.09a1.3,1.3,0,0,1,.15-.1l.13-.14a.39.39,0,0,0,.1-.08.75.75,0,0,1,.15-.16.3.3,0,0,0,.07-.11,1.12,1.12,0,0,0,.13-.16.26.26,0,0,0,.07-.11s0-.05.06-.08l0-.08s.05-.09.07-.15a1.14,1.14,0,0,0,.09-.16s0-.1.05-.15a.49.49,0,0,0,.06-.17.38.38,0,0,0,0-.15.53.53,0,0,0,.05-.19,1.21,1.21,0,0,1,0-.14,1.25,1.25,0,0,0,0-.19s0-.1,0-.15V255a.25.25,0,0,0,0-.08V175.16a6.93,6.93,0,1,1,13.86,0v72.78a3.47,3.47,0,0,0,6.93,0V216.75a6.93,6.93,0,0,1,13.86,0v31.19a3.47,3.47,0,0,0,6.93,0V223.68a6.94,6.94,0,0,1,13.87,0v24.26a3.47,3.47,0,0,0,6.93,0V230.61a6.93,6.93,0,0,1,13.86,0Z" transform="translate(-9.32 -9.32)"/>'
  + '    <path class="cls-3" d="M272.52,230.61v58.9a24.29,24.29,0,0,1-24.26,24.26h-40.1a24.14,24.14,0,0,1-20.56-11.36l-31.86-50.8s-.05-.1-.08-.14a6.7,6.7,0,0,1-1-3.53,6.93,6.93,0,0,1,6.93-6.93,6.58,6.58,0,0,1,3.55,1l.22.14L191,257.81l.09.06.13.06.19.1.1,0,.24.09s.05,0,.08,0l.24.06h.1a.91.91,0,0,0,.23,0,.27.27,0,0,0,.12,0H193a.68.68,0,0,0,.21,0h.1l.25,0h0l.29-.07a0,0,0,0,1,0,0l.29-.11,0,0,.24-.13.09,0a2,2,0,0,1,.18-.13l.12-.09a1.3,1.3,0,0,1,.15-.1l.13-.14a.39.39,0,0,0,.1-.08.75.75,0,0,1,.15-.16.3.3,0,0,0,.07-.11,1.12,1.12,0,0,0,.13-.16.26.26,0,0,0,.07-.11s0-.05.06-.08l0-.08s.05-.09.07-.15a1.14,1.14,0,0,0,.09-.16s0-.1.05-.15a.49.49,0,0,0,.06-.17.38.38,0,0,0,0-.15.53.53,0,0,0,.05-.19,1.21,1.21,0,0,1,0-.14,1.25,1.25,0,0,0,0-.19s0-.1,0-.15V255a.25.25,0,0,0,0-.08V175.16a6.93,6.93,0,1,1,13.86,0v72.78a3.47,3.47,0,0,0,6.93,0V216.75a6.93,6.93,0,0,1,13.86,0v31.19a3.47,3.47,0,0,0,6.93,0V223.68a6.94,6.94,0,0,1,13.87,0v24.26a3.47,3.47,0,0,0,6.93,0V230.61a6.93,6.93,0,0,1,13.86,0Z" transform="translate(-9.32 -9.32)"/>'
  + '  </g>'
  + '</svg>'









@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {




  @ViewChild('tabGroup', { static: false }) tab: ElementRef;

  accounts: any[];
  studentsList: Student[]
  currentDate = new Date()
  selectedRange: any
  TYPE=
  {
    DAY:"Diario",
    WEEK:"Semanal",
    MONTH:"Mensual",
    CUSTOM_PERIOD:"Personalizado"


  }



  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private accountsService: AccountService,
    private studentsService: studentService,
    private sanitazer: DomSanitizer,
    private dialog: MatDialog,
    private expensesService: ExpensesService,
    private snackBar: MatSnackBar) {
    iconRegistry.addSvgIconLiteral('out-expenses', sanitizer.bypassSecurityTrustHtml(EXPENSES));
    iconRegistry.addSvgIconLiteral('debtors', sanitizer.bypassSecurityTrustHtml(DEBTORS));
    iconRegistry.addSvgIconLiteral('csv-icon', sanitizer.bypassSecurityTrustHtml(CSV_ICON));
    iconRegistry.addSvgIconLiteral('pdf-icon', sanitizer.bypassSecurityTrustHtml(PDF_ICON));
    iconRegistry.addSvgIconLiteral('daily', sanitizer.bypassSecurityTrustHtml(DAILY));
    iconRegistry.addSvgIconLiteral('weekly', sanitizer.bypassSecurityTrustHtml(WEEKLY));
    iconRegistry.addSvgIconLiteral('monthly', sanitizer.bypassSecurityTrustHtml(MONTHLY));
    iconRegistry.addSvgIconLiteral('custom-date', sanitizer.bypassSecurityTrustHtml(CUSTOM_DATE));





    this.accounts = []

    this.studentsList = this.studentsService.studentsList

    for (let student of this.studentsList) {
      let account =
      {
        name: student.name,
        surname: student.surname,
        course: student.course,
        titular: student.parent1.name + ' ' + student.parent1.surname,
        state: this.getAccountState(student.id),
        titularID: student.id,
        idAccount: student.parent1.id
      }

      this.selectedRange = {
        range:
        {
          start: Date,
          end: Date
        },
        option: -1
      }

      this.accounts.push(account)
    }

  }

  getAccountState(id: string) {
    return this.accountsService.accountsList.filter(a => a.$titularId == id)[0].$state
  }

  generateDebtorsReport(method: number) {
    //alert("Se esta generando el repore")

    let doc = new jsPDF('a4')
    let columns = ["Nombre", "Apellido", "Curso", "Titular"]
    let debtors = this.accounts.filter(a => a.state == false)

    let tableData = this.generateTableData(debtors)


    if (method == 1) {
      doc.autoTable(columns, tableData,
        {
          margin: { top: 60 },
          styles:
          {
            lineWidth: 0.1,
            lineColor: [60, 60, 60]
          },

          headStyles: { fillColor: [45, 92, 132] }
        }

      );

      var string = doc.output('datauristring');

      let url = this.sanitazer.bypassSecurityTrustResourceUrl(string)


      this.openModalFrame(url)
    }

    else if (method == 2) {

      tableData.splice(0, 0, columns)
      this.arrayObjToCsv(tableData);



    }





  }

  ngOnInit() {
  }

  arrayObjToCsv(ar) {

    if (window.Blob && (window.URL || window.webkitURL)) {
      var contenido = "",
        d = new Date(),
        blob,
        reader,
        save,
        clicEvent;

      for (var i = 0; i < ar.length; i++) {

        if (i == 0)
          contenido += Object.keys(ar).join(";") + "\n";
        contenido += Object.keys(ar[i]).map(function (key) {
          return ar[i][key];
        }).join(";") + "\n";
      }

      blob = new Blob(["\ufeff", contenido], { type: 'text/csv' });

      var reader1 = new FileReader();
      reader1.onload = function (event) {

        save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';

        save.download = "log_" + d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear() + ".csv";
        try {

          clicEvent = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
          });
        } catch (e) {
          clicEvent = document.createEvent("MouseEvent");
          clicEvent.initEvent('click', true, true);
        }

        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
      }
      reader1.readAsDataURL(blob);

    } else {
      alert("Su navegador no permite esta acción");
    }
  };

  getExpensesReport(period, method) {


    let doc = new jsPDF('a4')
    let columns = ["Importe", "Descripcion", "Fecha"]
    let expenses = []

    let weekDays = this.getweekstart(new Date())



    if (period == "DAY") {
      expenses =
        (
          this.expensesService.expenseList.filter(

            a =>
              a.$date.getDate() === this.currentDate.getDate() &&
              a.$date.getMonth() === this.currentDate.getMonth() &&
              a.$date.getFullYear() === this.currentDate.getFullYear())
        )
      if (expenses.length === 0) {
        this.showSnackBar("No encontaron registros para el dia de la fecha: " + moment(this.currentDate).format('DD/MM/YYYY'))
      }
    }
    if (period == "WEEK") {

      console.log(weekDays)



      expenses =
        (this.expensesService.expenseList.filter(a => 
          moment(a.$date, "DD-MM-YYYY").isSameOrAfter(moment(weekDays[0], "DD-MM-YYYY"), 'day') &&
          moment(a.$date, "DD-MM-YYYY").isSameOrBefore(moment(weekDays[weekDays.length - 1], "DD-MM-YYYY"), 'day')
        ))

      if (expenses.length === 0) {
        this.showSnackBar("No se encontaron ingresos para el periodo: " +
          moment(weekDays[0]).format('DD/MM/YYYY') +
          " => " +
          moment(weekDays[weekDays.length - 1]).format('DD/MM/YYYY'))
      }


    }
    if (period == "MONTH") {
      expenses = (this.expensesService.expenseList.filter(a => a.$date.getMonth() === this.currentDate.getMonth() && a.$date.getFullYear() == this.currentDate.getFullYear()))
    }
    if (period == "CUSTOM_PERIOD") {
      console.log(this.selectedRange)



      expenses =

        (this.expensesService.expenseList.filter(a =>
          moment(a.$date, "DD-MM-YYYY").isSameOrAfter(moment(this.selectedRange.range.start, "DD-MM-YYYY"), 'day') &&
          moment(a.$date, "DD-MM-YYYY").isSameOrBefore(moment(this.selectedRange.range.end, "DD-MM-YYYY"), 'day')
        ))

      if (expenses.length === 0) {
        this.showSnackBar("No se encontaron ingresos para el periodo: " +
          moment(this.selectedRange.range.start).format('DD/MM/YYYY') +
          " => " +
          moment(this.selectedRange.range.end).format('DD/MM/YYYY'))
      }
    }

    if (expenses.length > 0) {
      let tableData = this.generateTableData(expenses)

      if (method == 1) 
      {
        let text1="Reporte de gastos " +this.TYPE[period]
        let text2="Generado el dia "+moment(this.currentDate).format("DD/MM/YYYY")
        

        doc.setFontSize(15)
        doc.text(text1, this.centerText(0, 210, doc.getTextWidth(text1)), 25)
        doc.setFontSize(12)
        doc.text(text2, this.centerText(0, 210, doc.getTextWidth(text2)), 35)

        if (period=="CUSTOM_PERIOD")
        {
          let text3=moment(this.selectedRange.range.start).format("DD-MM-YYYY")+" a s"+moment(this.selectedRange.range.end).format("DD-MM-YYYY")
          doc.text(text3, this.centerText(0, 210, doc.getTextWidth(text3)), 45)

        }

        doc.autoTable(columns, tableData,
          {
            margin: { top: 60 },
            styles:
            {
              lineWidth: 0.1,
              lineColor: [60, 60, 60]
            },

            headStyles: { fillColor: [45, 92, 132] }
          }

        );

        var string = doc.output('datauristring');

        let url = this.sanitazer.bypassSecurityTrustResourceUrl(string)

        this.openModalFrame(url)



      }

      else if (method == 2) {
        tableData.splice(0, 0, columns)
        this.arrayObjToCsv(tableData);
      }

    }
    else {
      //this.showSnackBar("No existen entradas para el reporte: "+period)
    }






  }


  openModalFrame(url) {
    const dialogRef = this.dialog.open(ModalFrameComponent,
      {
        data: url,
        width: '90vw',
        height: '100vh'
      }
    )

    dialogRef.afterClosed().subscribe(result => { });
  }

  centerText(initialPoint: number, containerWidth: number, stringWidht: number) {
    console.log(initialPoint + stringWidht / 2)
    return initialPoint + (containerWidth - stringWidht) / 2;
  }

  generateTableData(data) 
  {
    let tableData = []

    for (let obj of data) {


      let row = (Array.from(Object.values(obj)))

      tableData.push(row)



    }

    console.log(tableData)

    return tableData
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, "Aceptar", { duration: 5500 })
  }

  getweekstart(current) {
    const week = [];
    const weekFormat = [];

    if (current.getDay() == 0) {//En los casos en que es domingo, restar como si fuera septimo dia y no cero
      current.setDate(((current.getDate() - 7) + 1));
    } else {
      current.setDate(((current.getDate() - current.getDay()) + 1));
    }

    for (let i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    week.forEach((w) => {
      weekFormat.push(w);
    });
    return weekFormat;


  }

  openDateRangeSelector() {
    const dialogRef = this.dialog.open(RangeSelectorComponent,
      {

        width: '400px',
        height: '250px'
      }
    )

    dialogRef.afterClosed().subscribe(result => {


      this.selectedRange = result



      this.getExpensesReport("CUSTOM_PERIOD", result.option)

    });
  }

}
