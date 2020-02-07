import { Component, OnInit, Output, ViewChild, EventEmitter, Input} from '@angular/core';
import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChild(MatMenuTrigger, {static: true}) trigger: MatMenuTrigger;
  @Output() openSidenav = new EventEmitter();
  @Input() sidenav;

  constructor() { }

  ngOnInit() {
  }

  toggleMenu(e: Event) {
    this.sidenav.toggle();
  }

  openMenu(e: Event) {
    this.sidenav.open();
  }

  closeMenu(e: Event) {
    this.sidenav.close();
  }
}
