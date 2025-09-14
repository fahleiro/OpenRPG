# Início Rápido

Este guia te ajudará a ter o openRPG Backend funcionando em poucos minutos.

## 📋 Pré-requisitos

- **Node.js** 18 ou superior
- **npm** ou **yarn**
- **Git** (para clonar o repositório)

## 🚀 Instalação

### 1. Clone o Repositório

```bash
git clone https://github.com/fahleiro/openRPG.git
cd openRPG
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure o Servidor (Opcional)

O projeto vem com configurações padrão que funcionam imediatamente. Para personalizar:

```bash
# Edite o arquivo server.conf
notepad server.conf  # Windows
nano server.conf     # Linux/Mac
```

**Configurações principais:**
```bash
SERVER_HOST=localhost    # IP do servidor
SERVER_PORT=3000        # Porta do servidor
NODE_ENV=development    # Ambiente
```

### 4. Execute o Servidor

```bash
npm run dev
```

Você verá uma saída similar a:
```
📋 Carregando configurações...
✅ Configurações carregadas do server.conf
🚀 openRPG Backend iniciado com sucesso!
📡 Servidor rodando em localhost:3000
🌐 Acesse: http://localhost:3000
📋 Health check: http://localhost:3000/health
📦 Itens: http://localhost:3000/items
⚙️  Ambiente: development
📄 Configurações carregadas de: server.conf
```

## ✅ Verificação da Instalação

### 1. Teste o Health Check

```bash
curl http://localhost:3000/health
```

**Resposta esperada:**
```json
{
  "success": true,
  "message": "openRPG Backend está funcionando!",
  "timestamp": "2025-09-14T03:16:00.000Z",
  "version": "1.0.0",
  "config": {
    "host": "localhost",
    "port": 3000,
    "environment": "development"
  }
}
```

### 2. Liste os Itens Disponíveis

```bash
curl http://localhost:3000/items
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Espada de Ferro",
      "type": "weapon",
      "rarity": "common",
      "description": "Uma espada básica feita de ferro forjado...",
      "stats": {
        "damage": 15,
        "durability": 100,
        "weight": 2.5
      },
      "requirements": {
        "level": 1,
        "strength": 10
      },
      "value": 50,
      "stackable": false
    }
    // ... mais itens
  ],
  "count": 3,
  "message": "Itens carregados com sucesso"
}
```

### 3. Busque um Item Específico

```bash
curl http://localhost:3000/items/1
```

## 🌐 Acessando via Browser

Abra seu navegador e acesse:

- **API Root**: http://localhost:3000
- **Health Check**: http://localhost:3000/health  
- **Lista de Itens**: http://localhost:3000/items
- **Item Específico**: http://localhost:3000/items/1

## 🔧 Próximos Passos

Agora que o servidor está funcionando:

1. **Explore a API** - Teste todos os endpoints disponíveis
2. **Personalize Configurações** - Edite `server.conf` conforme necessário
3. **Integre com Frontend** - Use a API em sua aplicação
4. **Contribua** - Ajude a expandir o projeto

## 🆘 Problemas Comuns

### Porta já em uso
```bash
# Erro: EADDRINUSE: address already in use :::3000
# Solução: Altere a porta no server.conf
SERVER_PORT=8080
```

### Permissões no Windows
```bash
# Execute o PowerShell como Administrador se houver problemas de permissão
```

### Node.js desatualizado
```bash
# Verifique a versão
node --version

# Atualize se necessário (deve ser 18+)
```

---

**🎉 Parabéns!** Seu openRPG Backend está funcionando. Continue lendo a documentação para explorar todas as funcionalidades.
