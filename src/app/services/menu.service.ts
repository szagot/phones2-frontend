import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  opened: boolean = false;

  constructor() { }

  toogle(){
    this.opened = !this.opened;
    console.log(this.opened);
  }
}
