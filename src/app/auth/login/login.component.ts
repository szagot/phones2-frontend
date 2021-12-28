import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoMessages } from 'app/@core/messages/InfoMessages';
import { AuthGuard } from 'app/@core/services/auth-guard.service';
import { MenuService } from 'app/@core/services/menu.service';
import { RoleGuard } from 'app/@core/services/role-guard.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  emailError: string = '';
  passError: string = '';
  formError: string = '';
  formValidate: boolean = false;

  email: string = '';
  password: string = '';

  loading: boolean = false;

  constructor(
    private service: AuthGuard,
    private router: Router,
    private info: InfoMessages,
    private menuService: MenuService,
    private roleService: RoleGuard,
  ) {
    this.formVerify();
  }

  ngOnInit(): void {
    // Já está logado?
    if (this.service.isLogged()) {
      // Envia pra ultima url válida
      this.router.navigate([this.service.lastUrl]);
    } else {
      // Verifica se o ENTER foi preesionado
      const _this = this;
      document.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          _this.login();
        }
      }, false);
    }
  }

  /**
   * Efetua o login
   */
  login(): void {
    // Avança apenas se o form estiver validado
    this.formVerify();
    if (!this.formValidate) {
      return;
    }

    this.loading = true;
    this.service.login(this.email, this.password).subscribe(
      event => {
        // Faz o registro do login
        this.service.registerLogin(event).subscribe((data) => {
          if (this.service.isLogged()) {
            // Se logou, faz o registro das permições de rota
            this.service.registerRoles(data);
            // Se o usuário não tem acesso a ultima url, manda pra raiz
            if (!this.roleService.hasPermission(this.service.lastUrl)) {
              this.service.lastUrl = '/';
            }
            // E vai pra URL de retorno
            this.router.navigate([this.service.lastUrl]).then(() => {
              // Faz a verificação de menu novamente em caso de ser troca de usuário
              this.menuService.reload();
            });
          } else {
            this.formError = 'Não foi possível efetuar o login nesete momento. Tente novamente mais tarde.';
          }
          this.loading = false;
        }, (err) => {
          // Caso dê erro ao pegar as regras de permissão do usuário
          this.formError = this.info.getMessage(err);
          this.loading = false;
        });
      },
      err => {
        this.formError = this.info.getMessage(err);
        this.loading = false;
      },
    );
    this.email = '';
    this.password = '';
    this.formVerify();
  }

  /**
   * Verifica se o email é válido
   */
  emailVerify(): void {
    if (this.email.match(/^[a-z0-9._-]+@[a-z0-9_-]+\.[a-z0-9._-]+$/i)) {
      this.emailError = '';
    } else if (!this.loading) {
      if (this.email.length > 0) {
        this.emailError = 'Digite um email válido';
      } else {
        this.emailError = 'Email é obrigatório';
      }
    }

    this.formVerify();
  }

  /**
   * Verifica se a senha é valida
   */
  passVerify(): void {
    if (this.password.length > 0) {
      if (this.password.length > 5 && this.password.length < 21) {
        this.passError = '';
      } else if (!this.loading) {
        this.passError = 'A senha precisa ter de 6 a 20 caracteres';
      }
    } else if (!this.loading) {
      this.passError = 'Senha é obrigatória';
    }

    this.formVerify();
  }

  /**
   * Verifica se o form está apto a ser enviado
   */
  formVerify() {
    this.formError = '';
    this.formValidate =
      this.password.length > 0 &&
      this.email.length > 0 &&
      (this.passError + this.emailError).length === 0;
  }

}
