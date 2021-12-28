# Front End  
  
Definições do sistema Front End.  
  
## Tela de Login  
 
A tela de Login deve ter dois campos centralizados na tela para o usuário digitar o **Login** e a **Senha**.  
  
  
------------------------------------------------------------------------   
## Tela inicial  
  
A tela inicial deve ter um menu do lado esquerdo com as seguintes opções  
  
* Configurações  
* Templates E-mail  
* Templates SMS  
  
O Menu **Configurações** deve ter as opções de sub menu abaixo:  
 
* Cadastro Template HTML
* Cadastro Template SMS    
  
Ao clicar em cada menu deve ser aberto uma nova página com o conteúdo detalhado abaixo.
  
------------------------------------------------------------------------    
  
## Conteúdo das telas  
  
### Cadastro Templates HTML  
  
#### Definição de template HTML  
  
Um template HTML é composto por um diretório(sem espaços no nome) contendo dento 1 arquivo "*.html" e arquivos de imagens (png, gif, jpg e jpeg). 
 
Esta tela tem a funcionalidade de excluir ou cadastrar um novo template HTML na aplicação.  
  
Ao abrir a tela deve ser exibido um grid com as informações dos templates cadastrados.  
O Grid deve ter os campos abaixo:  
  
* Nome do Template 
* Data Cadastro
* Data Ultima Alteração
* Preview (Quando o usuário clicar em preview deve abrir uma nova aba do navegador para visualização do template)
* Excluir (Botão para excluir o template)
  
**Cadastrando o Template**  
   
Esta tela deve ter um botão **Adicionar Template** logo abaixo do grid que exibe os templates cadastrados.  
O cadastro do template deve ser feito em duas etapa conforme descrito abaixo:  
  
**Etapa 1 - Upload**  

Ao clicar no botão **Adicionar Template** deve ser aberto um componente para fazer o upload do novo template HTML.  
Ao selecionar o template no computador do usuário o sistema deve fazer upload do template e salvar no diretório temporário de templates no servidor.  
Pode ser feito o upload de uma pasta ou de um arquivo "*.zip" caso seja feito upload de uma pasta, deve ser feito o upload para o diretório de "cadastro temporário do template", caso seja feito upload de um arquivo "zip", deve ser feito o upload para o diretório de "cadastro temporário do template compactado".  
No caso de arquivo zip logo após a conclusão do upload o conteúdo deve ser descompactado para o diretório de "cadastro temporário do template".
 
  
**Etapa 2 - Validação**  
  
Após o upload do template para o diretório temporário deve ser feito as validações abaixo:  

* O nome do diretório do template não pode ter espaços
* Dentro do diretório só pode haver um arquivo HTML
* O arquivo HTML deve ter o mesmo nome do diretório
* Dentro do diretório deve ter imagens com as extensões gif,png, jpg ou jpeg.
* Todas as imagens referenciadas dentro do HTML devem estar no diretório do template   
  
Caso uma das condições acima não sejam atendidas o cadastro do template não deve ser feito, o diretório na área temporária deve ser movido para um diretorio de templates com problema no cadastro e exibido uma mensagem para o usuário informado o problema encontrado.  
 
Caso todas as condições sejam atendidas o template deve ser cadastrado.  
O cadastro do template consiste em copiar a pasta do template do diretorio temporario para o diretorio dos templates cadastrados.
Os dados do template devem ser guardados em banco de dados conforme descrito abaixo.  
  
Tabela "templates_html" (um registro para cada template)
  
* Id do template
* Nome do template
* Data do cadastro 
* Data ultima alteração
* Data exclusão(Validar se é necessárion nesta tabela)
  
  
Tabela "imagens" (varios registros para cada template)
  
* Id da imagem
* Nome da imagem
* Tamanho imagem
* Data do cadastro 
* Data ultima alteração
* Id do template


  
**Excluindo o Template**   
  
Quando o cliente clicar no link **Excluir** no grid de exibição dos templates deve aparecer uma menssagem pedindo a confirmação da ação de exlcuir o template.
Somente um usuário com perfil aprovador deve ter ter permissão para excluir um template, caso um usuario com perfil editor tente excluir um template a ação de excluir não deve ser executada e deve ser mostrado na tela um amensagem informando que apenas usuarios com perfil aprovador podem exlcuir templates.  
Caso o usuário tenha o perfil aprovador o template deve ser exlcuido.  
Ao excluir o template deve ser gravado em banco de dados na tabela de shotsoria os dados abaixo: 
  
* Nome do template excluido
* Usuário que excluiu o template
* Timestamp da exclusão
  
Deve ser apagado do servidor o diretório do template.
  
### Cadastro Templates SMS  
 
Esta tela tem a funcionalidade de cadastrar um novo template HTML na aplicação. 
  
  
### Templates E-mail  
  
Esta tela deve exibir os templates cadastrados na aplicação  
  

---

(Vide [projeto original](https://bitbucket.org/datacoresolutions/font_end_email/wiki/Home))

[...voltar](../README.md)