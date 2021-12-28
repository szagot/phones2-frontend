import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { MenuService } from 'app/@core/services/menu.service';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();

  menu = [];
  themes = ['default', 'cosmic'];
  currentTheme = this.themes[0];

  constructor(
    menuService: MenuService,
    private themeService: NbThemeService,
  ) {
    this.menu = menuService.menu;
  }
  ngOnInit() {
    // Tema
    this.currentTheme = this.themeService.currentTheme;
    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    // Caso o usuário tenha escolhido um tema, mantém
    const storageTheme = localStorage.getItem('themeName');
    if (storageTheme && this.currentTheme !== storageTheme) {
      this.changeTheme(storageTheme);
    }
  }

  toggleTheme() {
    this.changeTheme((this.currentTheme === this.themes[0]) ? this.themes[1] : this.themes[0]);
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);

    // Salva o tema escolhido
    localStorage.setItem('themeName', themeName);
  }
}
