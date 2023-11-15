# News Explorer - Backend

O backend do site [NewsExploder](https://api.newsexplorer.jumpingcrab.com/), um website onde os usuários podem pesquisar por diversas notícias e salvar suas favoritas.

Você pode fazer requisições à API usando o endereço https://api.newsexplorer.jumpingcrab.com/

As seguintes requisições estão disponíveis:

- GET /users/me - para obter os dados do usuário que está logado no momento;
- GET /articles - para obter os artigos salvos pelo usuário
- POST /articles - para salvar um artigo
- DELETE /articles - para remover um artigo salvo
- POST /signup - para registrar um novo usuário
- POST /signin - para se logar com as credenciais de um usuário
