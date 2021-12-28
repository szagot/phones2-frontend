# Documento Técnico

**Objetivo**

O sistema de mensageria responsável pelo cadastro e atualização de templates, tanto do tipo E-mail como do tipo SMS.

As partes principais do projeto são:

- Serviços
- Modelos
- Rotas
- Layout (aparência)

***

    Serviços
    └── src
        └── app
            └── @core
                └── services

Os serviços são dependentes das variáveis globais em `/src/environments/environment.ts` e `/src/environments/environment.prod.ts` (este último sendo ativo apenas quando compilado para produção)

São os seguintes:

- `auth-guard.service.ts`: Serviços de login, bem como análise de ativação de rotas protegidas pelo login.
- `role-guard.service.ts`: Serviços de controle de nível de usuário, bem como análise de ativação rotas de acordo com a função de cada tipo de usuário.
- `menu.service.ts`: Serviço de menu lateral
- `template-email.service.ts`: Serviços para o controle de Templates de E-mail
- `template-sms.service.ts`: Serviços para o controle de Templates de SMS
- `user.service.ts`: Serviços para usuários

Além desses, há também o `/src/app/auth/token.interceptor.ts` que é responsável por interceptar toda requisição http a fim de adicionar o token do usuário logado. (vide os `providers` em `/src/app/app.module.ts`).

> **Obs**: Para o envio de teste de SMS, a propriedade `restrictSMS` em `/src/environments/environment.ts` poderá ser usada para colocar o texto descritivo dessa restrição.

***

    Modelos
    └── src
        └── app
            └── models

Contemplam todos os modelos de objeto retornados pelos serviços.

***

    Rotas
    └── src
        └── app
            ├── app-routing.module.ts
            ├── auth
            │   ├── login/
            │   └── token.interceptor.ts
            └── pages
                ├── shots/
                ├── configuracao/
                ├── deploy/
                ├── e-commerce/
                ├── edit-templates/
                └── users/

As rotas, controladas em sua base pelo `app-routing.module.ts`, são divididas em duas partes principais:

- `auth`: Responsável pela autenticação
- `pages`: Resposável por todas as rotas do sistema contraladas pela autenticação.

As páginas que precisam de autenticação para serem acessadas, são:

- `pages/users`: Usuários
- `pages/e-commerce`: Tela Inicial
- `pages/configuacao`: Cadastro
- `pages/edit-templates`: Edição
- `pages/deploy`: Deploy
- `pages/shots`: Autitoria

***

    Layout
    └── src
        └── app
            └── @theme
                └── styles
                    ├── _overrides.scss
                    └── themes.scss

Aqui fica toda a base de estilo do template. O estilo relativo a um componente específico, fica junto ao componente.

Dos arquivos que aqui estão, os relevante são:

- `themes.scss`: Possui as variáveis de ambiente para estilo dos temas (dark e light)
- `_overrides.scss`: Contém o estilo de substituição de elementos afetados fora dos componentes.

***

Para as demais pastas do sistema, vide:

- Nebular: https://akveo.github.io/nebular/
- Ngx-Admin: https://www.akveo.com/ngx-admin/

***

[...voltar](../README.md)
