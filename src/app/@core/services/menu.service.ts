import { Injectable } from '@angular/core';
import { MENU_ITEMS } from 'app/pages/pages-menu';
import { RoleGuard } from './role-guard.service';

@Injectable({
    providedIn: 'root',
})
export class MenuService {

    menu = MENU_ITEMS;

    constructor(
        private roleService: RoleGuard,
    ) {
        this.reload();
    }

    reload(): void {
        const _this = this;
        this.menu.forEach(function (item) {
            _this.verifyMenu(item);
        });
    }

    /**
     * Verifica se o usuário tem acesso a todos os itens de menu
     * @param menuItem
     * @returns
     */
    verifyMenu(menuItem): boolean {
        let visible = false;

        try {
            // Tem link ?
            if (menuItem.hasOwnProperty('link')) {
                visible = this.roleService.hasPermission(menuItem.link);
            }

            // Tem filhos?
            if (menuItem.hasOwnProperty('children')) {
                let allVisible = false;
                const _this = this;

                // Verifica se cada um dos filhos estão visíveis recursivamente
                menuItem.children.forEach(function (item) {
                    if (_this.verifyMenu(item)) {
                        allVisible = true;
                    }
                });

                visible = allVisible;
            }

            //  É  divisória?
            if (menuItem.hasOwnProperty('group') && menuItem.group) {
                visible = true;
            }

        } catch (e) {
            visible = false;
        }

        // Esconde se não for permitido a visibilidade
        menuItem.hidden = !visible;

        return visible;
    }

}
