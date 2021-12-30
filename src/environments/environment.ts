/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  endpoint: 'http://localhost:8080/phones',

  /**
   * Login
   */
  login: '/login',

  /**
   * Usuários
   */

  // GET Pega todos os usuários
  getUsers: '/user',

  // GET Pega um usuário (Colocar / ou a query string para id no final)
  getUser: '/user/',

  // GET Pega um usuário logado
  getUserLogged: '/myuser',

  // POST Cria um usuário
  createUser: '/user',

  // DELETE Apaga usuário (Colocar / ou a query string para id no final)
  delUser: '/user/',

  // PATCH Atualiza um usuário (Colocar / ou a query string para id no final)
  alterUser: '/user/',

  // PATCH Atualiza o perfil atual
  alterMe: '/myuser',

  /**
   * Regras
   */

  // Pega as regras do usuário atual
  getRules: '/roles/me',

  /**
   * Contact / Campo e Revisitas
   */

  // GET Pega todos os contatos
  getContacts: '/contacts',

  // GET Pega todos os contatos passivos de ligação
  getContactsToCall: '/contacts/call',

  // GET Pega as revisitas
  getRevisits: '/contacts/revisits',

  // GET Pega um contato pelo seu ID
  getContact: '/contacts/',

  // GET Libera um contato para uso de outro usuário
  freeContact: '/contacts/free/',

  // DELETE Apaga um contato pelo seu ID
  delContact: '/contacts/',

  // POST Cadastra um contato
  createContact: '/contacts',

  // PATCH Altera um contato pelo seu ID
  alterContact: '/contacts/',

  /**
   * Notes / Observações dos contatos
   */

  // GET Pega todas as observações de um contato pelo ID do contato
  getNotes: '/notes/',

  // DELETE Apaga uma observação pelo seu ID
  delNote: '/notes/',

  // POST Cadastra uma observação pelo ID do contato
  createNote: '/notes/',

  // PATCH Altera uma observação pelo seu ID
  alterNote: '/notes/',

};
