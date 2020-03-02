import { Component, OnInit } from '@angular/core';
import { MenuItem } from './menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.menuItems = [
      {label: 'Controle Financeiro', url:"#"},
      {label: 'Controle Emocional', url:"#"},
      {label: 'Rotinas', url:"#"},
      {label: 'Lições Aprendidas', url:"#"},
      {label: 'Livros', url:"#"},
      {label: 'Lugares', url:"#"},
      {label: 'Pessoas', url:"#"}
    ];
  }

}
