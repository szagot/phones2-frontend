import { Component } from '@angular/core';

@Component({
  selector: 'ngx-auth',
  styleUrls: ['auth.component.scss'],
  template: `
    <ngx-one-column-layout class="login-content">
      <nb-menu [items]="menu" class="login-menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class AuthComponent {
  menu = [];
}
