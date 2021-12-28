import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ResponseRole } from 'app/models/response-role';
import { Role } from 'app/models/role';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    /** Url de retorno */
    lastUrl: string = '/';
    lastError: any;

    constructor(
        private router: Router,
        private http: HttpClient,
    ) { }

    canActivate() {
        // Pegando a última url válida
        this.lastUrl = window.location.pathname.match(/login/i) ? '/' : window.location.pathname;

        const isLogged = this.isLogged();
        if (!isLogged) {
            this.router.navigate(['auth/login']);
        }

        return isLogged;
    }

    /**
     * Verifica se está logado
     * @returns
     */
    isLogged(): boolean {
        return this.getToken() !== null;
    }

    /**
     * Efetua o login
     * @param user
     * @param password
     */
    login(user: string, password: string): Observable<any> {
        const jsonReturn = {
            username: user,
            password: password,
        };

        return this.http.post(environment.endpoint + environment.login, jsonReturn, {
            observe: 'response',
        });
    }

    /**
     * Registra um login feito
     * @param response
     */
    registerLogin(response: HttpResponse<any>): Observable<any> {
        const token = response.headers.get('Authorization');
        if (token) {
            sessionStorage.setItem('token', token);

            // Registra as regras permitidas para esse usuário
            return this.http.get<ResponseRole>(environment.endpoint + environment.getRules);
        }

        return null;
    }

    /**
     * Registra as regras do usuário
     * @param response
     */
    registerRoles(response: ResponseRole) {
        sessionStorage.setItem('roles', JSON.stringify(response.roles));
    }

    getRoles(): Role[] {
        if (!sessionStorage.getItem('roles')) {
            return [];
        }

        return JSON.parse(sessionStorage.getItem('roles'));
    }

    /**
     * Desloga do sistema
     */
    logout(): void {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('roles');
        this.canActivate();
    }

    /**
     * Pega o token atual
     */
    getToken(): string {
        return sessionStorage.getItem('token');
    }
}
