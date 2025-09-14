# openRPG – Backend Base

Self-hosted, open source backend for RPGs in TypeScript, built as a REST API.

Este projeto é o **protótipo inicial**, focado em criar a base do backend para RPGs, começando com um sistema simples de itens.

---

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação e Execução

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd openRPG

# 2. Instale as dependências
npm install

# 3. Configure o servidor (opcional)
# Edite o arquivo server.conf para personalizar IP, porta e outras configurações

# 4. Execute em modo desenvolvimento
npm run dev

# 5. Acesse a API
# Servidor: http://localhost:3000 (ou conforme configurado no server.conf)
# Health check: http://localhost:3000/health
# Itens: http://localhost:3000/items
```

---

## 🗂️ Estrutura do Projeto

```
/openRPG
├── src/
│   ├── controllers/          # Lógica dos controllers
│   │   └── ItemController.ts
│   ├── db/                   # Banco de dados JSON local
│   │   └── items/
│   │       ├── 1.json        # Espada de Ferro
│   │       ├── 2.json        # Poção de Cura Menor
│   │       └── 3.json        # Armadura de Couro
│   ├── routes/               # Definição das rotas
│   │   └── itemRoutes.ts
│   ├── types/                # Interfaces TypeScript
│   │   └── Item.ts
│   ├── utils/                # Utilitários
│   │   ├── fileUtils.ts      # Manipulação de arquivos
│   │   └── configUtils.ts    # Carregamento de configurações
│   └── index.ts              # Ponto de entrada do servidor
├── dist/                     # Build de produção (gerado)
├── server.conf               # Arquivo de configuração do servidor
├── package.json
├── tsconfig.json
└── .gitignore
```

---

## 📡 Endpoints Disponíveis

### **GET /** 
Informações gerais da API

### **GET /health**
Health check do servidor

### **GET /items**
Lista todos os itens disponíveis
```json
{
  "success": true,
  "data": [...],
  "count": 3,
  "message": "Itens carregados com sucesso"
}
```

### **GET /items/:id**
Busca um item específico pelo ID
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Espada de Ferro",
    "type": "weapon",
    "rarity": "common",
    "description": "Uma espada básica feita de ferro forjado...",
    "stats": { "damage": 15, "durability": 100, "weight": 2.5 },
    "requirements": { "level": 1, "strength": 10 },
    "value": 50,
    "stackable": false
  }
}
```

---

## ⚙️ Configuração do Servidor

O openRPG utiliza o arquivo `server.conf` para centralizar todas as configurações de rede e servidor. Este arquivo permite personalizar facilmente IPs, portas e outras configurações sem modificar o código.

### 📄 Arquivo server.conf

```bash
# openRPG Backend - Configurações do Servidor
# Este arquivo contém todas as configurações de rede e servidor

# Configurações principais do servidor
SERVER_HOST=localhost          # IP do servidor (localhost, 0.0.0.0, etc.)
SERVER_PORT=3000              # Porta do servidor

# Configurações de ambiente
NODE_ENV=development          # development, production, test

# Configurações de CORS (IPs permitidos)
CORS_ORIGIN=*                 # * para todos, ou IPs específicos separados por vírgula
CORS_METHODS=GET,POST,PUT,DELETE,OPTIONS
CORS_HEADERS=Content-Type,Authorization

# Configurações de logging
LOG_LEVEL=info               # error, warn, info, debug
LOG_FORMAT=combined          # combined, common, dev

# Configurações de timeout
REQUEST_TIMEOUT=30000        # Timeout em milissegundos (30 segundos)

# Configurações de rate limiting (futuro)
RATE_LIMIT_WINDOW=900000     # Janela de tempo em ms (15 minutos)
RATE_LIMIT_MAX_REQUESTS=100  # Máximo de requests por janela
```

### 🔧 Como Personalizar

1. **Alterar IP e Porta:**
   ```bash
   SERVER_HOST=0.0.0.0    # Para aceitar conexões de qualquer IP
   SERVER_PORT=8080       # Para usar porta 8080
   ```

2. **Configurar CORS para IPs específicos:**
   ```bash
   CORS_ORIGIN=http://localhost:3000,https://meusite.com
   ```

3. **Ambiente de Produção:**
   ```bash
   NODE_ENV=production
   LOG_LEVEL=error
   ```

### 📋 Verificação das Configurações

Após iniciar o servidor, acesse `/health` para ver as configurações ativas:
```json
{
  "success": true,
  "message": "openRPG Backend está funcionando!",
  "config": {
    "host": "localhost",
    "port": 3000,
    "environment": "development"
  }
}
```

---

## 🛠️ Scripts Disponíveis

```bash
npm run dev      # Executa em modo desenvolvimento com hot-reload
npm run build    # Compila o TypeScript para JavaScript
npm start        # Executa a versão compilada
npm run clean    # Remove a pasta dist/
```

---

## 🎮 Estrutura dos Itens

Cada item possui a seguinte estrutura:

```typescript
interface Item {
  id: number;
  name: string;
  type: 'weapon' | 'armor' | 'consumable' | 'misc';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  description: string;
  stats: ItemStats;
  requirements: ItemRequirements;
  value: number;
  stackable: boolean;
  maxStack?: number;
  createdAt: string;
  updatedAt: string;
}
```

---

## 🚀 Roadmap Futuro

- [ ] **CRUD completo de itens** (POST, PUT, DELETE)
- [ ] **Sistema de autenticação** e sessões
- [ ] **Personagens e inventários**
- [ ] **Missões e quests**
- [ ] **Cidades e mapas**
- [ ] **Sistema de universos/mundos**
- [ ] **Integração com banco de dados real** (PostgreSQL/MongoDB)
- [ ] **Documentação automática** com Swagger
- [ ] **Testes automatizados**
- [ ] **Docker e deploy**

---

## 💡 Tecnologias Utilizadas

- **TypeScript** - Linguagem principal
- **Express.js** - Framework web
- **Node.js** - Runtime
- **JSON** - Persistência temporária (será substituído por BD real)

---

## 🤝 Contribuição

Este é um projeto em desenvolvimento inicial. Contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
