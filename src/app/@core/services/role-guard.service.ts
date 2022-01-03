import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Privilege } from 'app/models/privilege';
import { Role } from 'app/models/role';
import { AuthGuard } from './auth-guard.service';

@Injectable({
    providedIn: 'root',
})
export class RoleGuard implements CanActivate {
    PRIVILEGE_CREATE: string = 'CREATE';
    PRIVILEGE_UPDATE: string = 'UPDATE';
    PRIVILEGE_READ: string = 'READ';
    PRIVILEGE_EXECUTE: string = 'EXECUTE';
    PRIVILEGE_DELETE: string = 'DELETE';

    ROLE_USER = 'ROLE_USER';
    ROLE_ADMIN = 'ROLE_ADMIN';


    /** Url de retorno */
    lastUrl: string = '/';
    lastError: any;

    // Associação de rotas e regras
    routesRoles = {
        '/pages/users/list': this.ROLE_ADMIN,
        '/pages/users/edit': this.ROLE_ADMIN,

        '/pages/phones/preaching': this.ROLE_USER,
        '/pages/phones/revisits': this.ROLE_USER,
        '/pages/phones/edit': this.ROLE_USER,
        '/pages/phones/new': this.ROLE_USER,
    };

    // Rotas ignoradas
    routesExceptions = [
        '/pages/users/edit/me',
    ];

    roles: Role[] = [];

    constructor(
        private authService: AuthGuard,
        private router: Router,
    ) {
        this.reload();
    }

    canActivate(
        // Dados finais da rota, como parametros
        route: ActivatedRouteSnapshot,
        // Rota. state.url devolve o caminnho completo
        state: RouterStateSnapshot,
    ) {
        const hasPermission = this.hasPermission(state.url);
        if (!hasPermission) {
            this.router.navigate([this.router.url]);
        }

        return hasPermission;
    }

    reload() {
        this.roles = this.authService.getRoles();
    }

    /**
     * Verifica se a rota tem permissão de leitura
     * @returns
     */
    hasPermission(route: string): boolean {
        // Necessário para quando há troca de usuário
        this.reload();

        // Verifica se as regras foram registradas
        if (this.roles.length === 0) {
            return false;
        }

        // Verificando se a rota tem acesso
        let hasAccess = false;
        const _this = this;
        this.roles.forEach((role: Role) => {
            const actualRole = _this.getRole(route);
            // É pra ignorar a rota?
            if (_this.routesExceptions.includes(route)) {
                hasAccess = true;
            } else if (actualRole) {
                //  Função atual é a função sendo analisada?
                if (actualRole === role.role) {
                    // Verifica se é rota de leitura edição ou criação
                    if (route.match(/new$/i)) {
                        // Criação
                        hasAccess = _this.hasRolePrivilege(actualRole, _this.PRIVILEGE_CREATE);

                    } else if (route.match(/([0-9]+|:id)$/i)) {
                        // Edição
                        hasAccess = _this.hasRolePrivilege(actualRole, _this.PRIVILEGE_UPDATE);

                    } else {
                        // Leitura
                        hasAccess = _this.hasRolePrivilege(actualRole, _this.PRIVILEGE_READ);

                    }

                    return;
                }
            }
        });

        return hasAccess;
    }

    /**
     * Verifica se o grupo de privilégios possui um privilégio específico
     * @param role
     * @param privilege
     * @returns
     */
    hasRolePrivilege(role: string, privilege: string): boolean {
        let hasTypeAccess = false;
        this.roles.forEach((compareRole: Role) => {
            if (compareRole.role === role) {
                compareRole.privileges.forEach((comparePrivilege: Privilege) => {
                    if (comparePrivilege.privilege === privilege) {
                        hasTypeAccess = true;
                        return;
                    }
                });

                return;
            }
        });

        return hasTypeAccess;
    }

    /**
     * Pega a regra da rota informada
     * @param testRoute
     * @returns
     */
    getRole(testRoute: string): string {
        for (const route in this.routesRoles) {
            if (route.length) {
                const regex = new RegExp('^' + route.replace(/\//g, '\\/'), 'i');
                if (testRoute.match(regex)) {
                    return this.routesRoles[route];
                }
            }
        }

        return null;
    }
}
