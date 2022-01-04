import { Component, HostListener, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthGuard } from 'app/@core/services/auth-guard.service';
import { UserService } from 'app/@core/services/user.service';
import { User } from 'app/models/user';
import { Router } from '@angular/router';
import { SearchService } from 'app/@core/services/search.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = true;
  user: User = new User();
  menuIsOpened: boolean = false;

  currentTheme = 'cosmic';

  userMenu = [
    {
      title: 'Perfil',
      icon: 'person-outline',
    },
    {
      title: 'Sair',
      icon: 'unlock-outline',
    },
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserService,
    private layoutService: LayoutService,
    private authService: AuthGuard,
    private router: Router,
    private searchService: SearchService,
    private eRef: ElementRef,
  ) {
  }

  /**
   * Escuta os clicks para poder fechar o menu se estiver aberto
   */
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target) && this.menuIsOpened) {
      this.sidebarService.collapse('menu-sidebar');
      this.layoutService.changeLayoutSize();
    }
  }

  ngOnInit() {
    // User
    if (this.authService.isLogged()) {
      this.userService.getMe()
        .pipe(takeUntil(this.destroy$))
        .subscribe((user: User) => {
          this.user = user;
        });
    }

    // User Menu
    this.menuService.onItemClick()
      .pipe(map(({ item: { title } }) => title))
      .subscribe(title => {
        if (title === 'Sair') {
          this.authService.logout();
        } else if (title === 'Perfil') {
          this.router.navigate(['pages/users/edit/me']);
        }
      });

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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Devolve o serviço de busca
   */
  getSearchService() {
    return this.searchService;
  }

  /**
   * Efetua a busca
   */
  getSearchValue(event: Event) {
    this.searchService.search = (event.target as HTMLInputElement).value;
    this.searchService.setDefaultText();
    this.searchService.onSearch();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);

    // Salva o tema escolhido
    localStorage.setItem('themeName', themeName);
  }

  toggleSidebar(): boolean {
    this.menuIsOpened = true;
    this.sidebarService.toggle(false, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }
}
