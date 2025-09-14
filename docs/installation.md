# Instalação Completa

Este guia detalha todo o processo de instalação do openRPG Backend, incluindo diferentes ambientes e configurações.

## 📋 Requisitos do Sistema

### Mínimos
- **Node.js**: 18.0.0 ou superior
- **npm**: 8.0.0 ou superior (incluído com Node.js)
- **RAM**: 512MB disponível
- **Espaço em Disco**: 100MB para o projeto + dependências

### Recomendados
- **Node.js**: 20.0.0 ou superior (LTS)
- **npm**: 10.0.0 ou superior
- **RAM**: 1GB disponível
- **Espaço em Disco**: 500MB para desenvolvimento

## 🔧 Instalação do Node.js

### Windows
1. Acesse [nodejs.org](https://nodejs.org)
2. Baixe a versão LTS
3. Execute o instalador e siga as instruções
4. Verifique a instalação:
```cmd
node --version
npm --version
```

### Linux (Ubuntu/Debian)
```bash
# Usando NodeSource
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalação
node --version
npm --version
```

### macOS
```bash
# Usando Homebrew
brew install node

# Ou baixe do site oficial
# https://nodejs.org

# Verificar instalação
node --version
npm --version
```

## 📥 Instalação do Projeto

### Método 1: Clone via Git (Recomendado)

```bash
# Clone o repositório
git clone https://github.com/fahleiro/openRPG.git

# Entre no diretório
cd openRPG

# Instale as dependências
npm install

# Verifique se tudo está funcionando
npm run dev
```

### Método 2: Download ZIP

1. Acesse https://github.com/fahleiro/openRPG
2. Clique em "Code" > "Download ZIP"
3. Extraia o arquivo
4. Abra o terminal na pasta extraída
5. Execute:
```bash
npm install
npm run dev
```

## ⚙️ Configuração Inicial

### 1. Arquivo server.conf

O projeto vem com um arquivo `server.conf` pré-configurado. Para personalizar:

```bash
# Copie o arquivo de exemplo (se necessário)
cp server.conf.example server.conf

# Edite as configurações
notepad server.conf  # Windows
nano server.conf     # Linux/Mac
```

### 2. Configurações Principais

```bash
# server.conf
SERVER_HOST=localhost          # Altere para 0.0.0.0 para acesso externo
SERVER_PORT=3000              # Altere se a porta estiver ocupada
NODE_ENV=development          # development, production, test
CORS_ORIGIN=*                 # Configure domínios permitidos
```

### 3. Verificação da Configuração

```bash
# Inicie o servidor
npm run dev

# Em outro terminal, teste a API
curl http://localhost:3000/health
```

## 🐳 Instalação com Docker (Futuro)

> 🚧 **Em Desenvolvimento**: Suporte ao Docker será adicionado em versões futuras.

## 🌐 Configuração para Produção

### 1. Variáveis de Ambiente

```bash
# server.conf para produção
NODE_ENV=production
SERVER_HOST=0.0.0.0
SERVER_PORT=80
LOG_LEVEL=error
CORS_ORIGIN=https://meudominio.com
```

### 2. Build para Produção

```bash
# Compile o TypeScript
npm run build

# Execute a versão compilada
npm start
```

### 3. Process Manager (PM2)

```bash
# Instale o PM2 globalmente
npm install -g pm2

# Inicie com PM2
pm2 start dist/index.js --name "openrpg-backend"

# Configure para iniciar automaticamente
pm2 startup
pm2 save
```

## 🔍 Verificação da Instalação

### Testes Básicos

```bash
# 1. Health Check
curl http://localhost:3000/health

# 2. Lista de Itens
curl http://localhost:3000/items

# 3. Item Específico
curl http://localhost:3000/items/1
```

### Respostas Esperadas

**Health Check:**
```json
{
  "success": true,
  "message": "openRPG Backend está funcionando!",
  "version": "1.0.0"
}
```

**Lista de Itens:**
```json
{
  "success": true,
  "data": [...],
  "count": 3,
  "message": "Itens carregados com sucesso"
}
```

## 🛠️ Ferramentas de Desenvolvimento

### Extensões Recomendadas (VS Code)

- **TypeScript Importer** - Auto-import para TypeScript
- **REST Client** - Teste APIs diretamente no VS Code
- **GitLens** - Melhor integração com Git
- **Prettier** - Formatação automática de código

### Configuração do VS Code

Crie `.vscode/settings.json`:
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  }
}
```

## 🐛 Solução de Problemas

### Erro: "Cannot find module"
```bash
# Limpe o cache do npm e reinstale
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port already in use"
```bash
# Encontre o processo usando a porta
netstat -ano | findstr :3000  # Windows
lsof -i :3000                 # Linux/Mac

# Mate o processo ou altere a porta no server.conf
SERVER_PORT=8080
```

### Erro: "Permission denied"
```bash
# Linux/Mac - Execute com sudo se necessário
sudo npm install -g gitbook-cli

# Windows - Execute o PowerShell como Administrador
```

### Problemas com TypeScript
```bash
# Reinstale o TypeScript globalmente
npm install -g typescript

# Verifique a versão
tsc --version
```

## 📚 Próximos Passos

Após a instalação bem-sucedida:

1. **Explore a API** - Teste todos os endpoints
2. **Leia a Documentação** - Entenda a estrutura do projeto
3. **Configure o GitBook** - Para documentação automática
4. **Contribua** - Ajude a melhorar o projeto

---

**✅ Instalação Concluída!** Seu openRPG Backend está pronto para uso.
