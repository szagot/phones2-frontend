import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/models/user';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthGuard } from './auth-guard.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    // Service status
    inProgress = HttpEventType.UploadProgress;
    complete = HttpEventType.Response;
    progressOptions: any = {
        reportProgress: true,
        observe: 'events',
    };

    constructor(
        private http: HttpClient,
        private authService: AuthGuard,
    ) { }

    /**
     * Devolve o progresso atual
     */
    getProgress(event: any) {
        return Math.round((100 / event.total) * event.loaded);
    }

    /**
     * Pega todos os usuários
     */
    getAll(): Observable<User[]> {
        return this.http.get<User[]>(environment.endpoint + environment.getUsers);
    }

    /**
     * Pega um usuário pelo ID
     * @param id
     */
    getUser(id: number): Observable<User> {
        return this.http.get<User>(environment.endpoint + environment.getUser + id);
    }

    /**
     * Pega o usuário logado
     */
    getMe(): Observable<User> {
        if (!this.authService.isLogged()) {
            return null;
        }

        return this.http.get<User>(environment.endpoint + environment.getUserLogged);
    }

    /**
     * Cadastra ou Altera um usuário
     * @param id
     * @param meId O ID do usuário logado para saber qual serviço usar
     * @param name
     * @param password
     * @param confirmPassword
     * @param isNew Atalho para cadastro quando é um usuário novo
     */
    alterOrCreateUser(
        id: number,
        meId: number,
        name: string,
        email: string,
        // level: number,
        isAdmin: boolean,
        password?: string,
        confirmPassword?: string,
        isNew?: boolean,
    ): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('name', name);
        if (isNew) {
            // Cadastro
            formData.append('email', email);
        } else {
            // Alteração
            formData.append('id', id.toString());
        }
        // Apenas se não for o próprio usuário
        if ((id !== meId)) {
            formData.append('isAdmin', isAdmin ? 'true' : 'false');
        }
        // Apenas se a senha foi informada
        if (password && password.length > 0) {
            formData.append('password', password);
            formData.append('confirmPassword', confirmPassword);
        }
        // Cadastro
        if (isNew) {
            return this.http.post(environment.endpoint + environment.createUser, formData, this.progressOptions);
        }

        // Alteração
        return (id === meId)
            // Salvar o proprio perfil
            ? this.http.patch(environment.endpoint + environment.alterMe, formData, this.progressOptions)
            // Salvar o usuário de outro
            : this.http.patch(environment.endpoint + environment.alterUser + id, formData, this.progressOptions);
    }

    /**
     * Apaga um usuário pelo ID
     * @param id
     */
    delete(id: number): Observable<any> {
        return this.http.delete(environment.endpoint + environment.delUser + id, this.progressOptions);
    }

}
