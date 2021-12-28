import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { InfoMessages } from 'app/@core/messages/InfoMessages';
import { UserService } from 'app/@core/services/user.service';
import { User } from 'app/models/user';
import { RoleGuard } from 'app/@core/services/role-guard.service';

@Component({
    selector: 'ngx-user-edit-template',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
    user: User = new User();
    password: string;
    passwordConfirm: string;

    isAlterPass: boolean = false;
    progress: number = 0;
    progressImg: number = 0;
    isNew: boolean = false;
    me: User = new User();

    constructor(
        private service: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private infoMessage: InfoMessages,
        private roleService: RoleGuard,
    ) {

     }

    ngOnInit() {

        // Pega os dados do usuário atual
        this.service.getMe().subscribe(data => {
            // Carrega os dados do usuário logado
            this.me.load(data);

            // Pega os parametros da rota
            this.route.params.subscribe(params => {
                const id = params['id'];

                // é para cadastrar um novo?
                if (id === 'new') {

                    this.isNew = true;
                    this.user.new();

                } else if (id.match(/^[0-9]+$/) || id === 'me') {

                    // O usuário sou eu?
                    if (this.me.id === id || id === 'me') {

                        this.user = this.me;

                    } else {

                        // Solicita os dados do usuário
                        this.service.getUser(id).subscribe(
                            user => {
                                // Se não conseguir fazer o load do retorno, ele volta pra listagem.
                                if (!this.user.load(user)) {
                                    this.back();
                                }
                            },
                            err => {
                                this.back();
                                this.infoMessage.danger(err);
                            },
                        );
                    }


                } else {
                    this.back();
                    this.infoMessage.warning('Informe um ID válido');
                }
            });
        });
    }

    /**
     * Volta para a listagem
     */
    back() {
        // Zera o template antes de sair
        this.user.empty();
        this.isAlterPass = false;
        this.password = null;
        this.passwordConfirm = null;
        const back = '/pages/users/list';
        if (this.roleService.hasPermission(back)) {
            this.router.navigateByUrl(back);
        } else {
            this.router.navigateByUrl('/');
        }
    }

    /**
     * Ativa os campos de alteração de senha
     */
    alterPass() {
        this.isAlterPass = true;
    }

    /**
     * Salva o Usuário
     */
    save() {
        this.progress = 1;

        if (!this.isAlterPass && !this.isNew) {
            this.password = null;
            this.passwordConfirm = null;
        }

        this.service.alterOrCreateUser(
            this.user.id,
            this.me.id,
            this.user.name,
            this.user.email,
            // this.user.level.id,
            this.user.isAdmin,
            this.password,
            this.passwordConfirm,
            this.isNew,
        )
            .pipe(
                map((event: any) => {
                    if (event.type === this.service.inProgress) {
                        this.progress = this.service.getProgress(event);
                    } else if (event.type === this.service.complete) {
                        this.back();
                        this.infoMessage.sucess('Usuário salvo com sucesso!');
                        this.progress = 0;
                    }
                }),
                catchError((err: any) => {
                    this.progress = 0;
                    this.infoMessage.danger(err);
                    return throwError(err.message);
                }),
            )
            .toPromise();
    }
}
