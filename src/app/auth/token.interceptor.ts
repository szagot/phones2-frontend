import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { AuthGuard } from 'app/@core/services/auth-guard.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        public authService: AuthGuard,
        private router: Router,
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Adiciona a autorização apenas se já estiver logado
        if (this.authService.isLogged()) {
            request = request.clone({
                setHeaders: {
                    Authorization: this.authService.getToken(),
                },
            });
        } else if (!this.router.url.match(/login/i)) {
            // Se não estiver mais logado, e for outra página que não a de login,
            // refaz o processo de verificação de autorização
            this.authService.canActivate();
            return;
        }

        return next.handle(request)
            .pipe(
                // Intercepta os erros para ver se é erro de autorização
                catchError((err: any) => {
                    // É erro de não autorizado?
                    if (err.status === 401 && !this.router.url.match(/login/i)) {
                        // Desloga
                        this.authService.logout();
                    }

                    return throwError(err);
                }),
            );
    }
}
