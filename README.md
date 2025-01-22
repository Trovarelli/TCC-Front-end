# Sistema de Filtro de Currículos

O **Sistema de Filtro de Currículos** permite que os usuários criem uma conta, façam upload de currículos e, a partir de uma base de dados personalizada, busquem currículos filtrados por palavras-chave e contextos específicos. O sistema é integrado com o ChatGPT e utiliza técnicas de análise textual para identificar palavras-chave e contextos relevantes, tornando a busca mais eficiente e alinhada com os interesses do usuário.

## 📋 Funcionalidades

- **Criação de Conta**: Permite que usuários criem uma conta para gerenciar currículos.
- **Upload de Currículos**: Suporte para upload de arquivos nos formatos PDF.
- **Filtragem por Palavras-chave**: Busca de currículos com base em palavras-chave específicas.
- **Busca Contextual**: Filtragem avançada que considera contextos além de palavras isoladas.

---

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js
- **Banco de Dados**: MongoDB
- **Frontend**: Next.js
- **Outras Ferramentas**: Docker, JWT (JSON Web Tokens), integração com o ChatGPT.

---

## 🌐 Projeto Rodando

O sistema está disponível em: [https://tahr.vercel.app](https://tahr.vercel.app).

> **Nota**: A API está hospedada no Render e, por conta disso, pode ser desligada em caso de desuso. Ao tentar realizar requisições, pode ocorrer um delay inicial de cerca de 30 segundos.

---

## 🧩 Uso

### Criar Conta

1. Acesse a página de cadastro.
2. Preencha o formulário com nome, e-mail e senha.
3. Após o cadastro, você será redirecionado à página principal.

---

### Subir Currículos

1. Na aba **"Candidatos"**, clique no botão **"Salvar Candidatos"** (Se ele estiver desabilitado, siga as instruções descritas na plataforma).
2. Selecione o arquivo em PDF, DOCX ou TXT.
3. O currículo será processado e armazenado.

---

### Filtrar Currículos

1. Logo abaixo do botão **"Salvar Candidatos"**, existe um campo chamado busca avançada.
2. Insira palavras-chave como se fosse tags, por exemplo: **"Front-end"**, **"Pleno"**, **"Inglês Fluente"**.
3. Visualize os currículos que correspondem aos critérios da pesquisa.

---

## 🤝 Contribuindo

1. **Fork** o repositório.
2. Crie uma **branch** (\`git checkout -b feature/nova-feature\`).
3. Faça o **commit** (\`git commit -m 'Adicionando nova feature'\`).
4. Envie para o repositório remoto (\`git push origin feature/nova-feature\`).
5. Abra um **Pull Request**.

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

## 🚀 Trabalhos Futuros

- **Adicionar testes automatizados**: Implementar testes unitários e de integração para garantir maior estabilidade do sistema.
- **Correção de warnings**: Revisar o código e corrigir todos os avisos gerados durante a execução ou compilação.
- **Criar funcionalidade de match entre candidatos e vagas**: Desenvolver uma funcionalidade que sugira automaticamente candidatos para vagas com base em critérios específicos, como palavras-chave e experiência.
