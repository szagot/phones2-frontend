/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,

  endpoint: 'https://bayer-nutricao-materna.com.br/phones',

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

};
