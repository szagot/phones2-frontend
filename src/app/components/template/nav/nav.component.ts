import { MenuService } from './../../../services/menu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    public menuService: MenuService,
    ) { 
  }

  ngOnInit(): void {
  }

}
