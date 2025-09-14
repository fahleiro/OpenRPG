# API Overview

A API do openRPG Backend segue os princípios REST e retorna dados em formato JSON. Todas as respostas seguem um padrão consistente para facilitar a integração.

## 🌐 Base URL

```
http://localhost:3000
```

> 💡 A URL base pode ser alterada no arquivo `server.conf`

## 📊 Formato de Resposta Padrão

Todas as respostas da API seguem este formato:

### Resposta de Sucesso
```json
{
  "success": true,
  "data": {}, // ou [] para arrays
  "message": "Descrição da operação",
  "count": 10 // apenas para listas
}
```

### Resposta de Erro
```json
{
  "success": false,
  "error": "Tipo do erro",
  "message": "Descrição detalhada do erro"
}
```

## 🔗 Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/` | Informações gerais da API |
| `GET` | `/health` | Status do servidor |
| `GET` | `/items` | Lista todos os itens |
| `GET` | `/items/:id` | Busca item por ID |

## 📝 Headers Recomendados

```http
Content-Type: application/json
Accept: application/json
```

## 🚦 Códigos de Status HTTP

| Código | Significado | Quando Usar |
|--------|-------------|-------------|
| `200` | OK | Operação bem-sucedida |
| `400` | Bad Request | Parâmetros inválidos |
| `404` | Not Found | Recurso não encontrado |
| `500` | Internal Server Error | Erro interno do servidor |

## 🔍 Exemplos de Uso

### JavaScript/Fetch
```javascript
// Listar todos os itens
const response = await fetch('http://localhost:3000/items');
const data = await response.json();

if (data.success) {
  console.log(`Encontrados ${data.count} itens:`, data.data);
} else {
  console.error('Erro:', data.message);
}
```

### cURL
```bash
# Listar itens
curl -H "Accept: application/json" http://localhost:3000/items

# Buscar item específico
curl -H "Accept: application/json" http://localhost:3000/items/1
```

### Axios (Node.js/React)
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Usar a API
const items = await api.get('/items');
console.log(items.data);
```

## 🛡️ CORS

A API suporta CORS configurável via `server.conf`:

```bash
# Permitir todos os domínios
CORS_ORIGIN=*

# Permitir domínios específicos
CORS_ORIGIN=http://localhost:3000,https://meusite.com
```

## ⚡ Rate Limiting

> 🚧 **Em Desenvolvimento**: Rate limiting será implementado em versões futuras

## 🔐 Autenticação

> 🚧 **Em Desenvolvimento**: Sistema de autenticação será implementado em versões futuras

## 📈 Versionamento

Atualmente a API está na versão `1.0.0`. Futuras versões seguirão o padrão semântico:
- **Major**: Mudanças incompatíveis
- **Minor**: Novas funcionalidades compatíveis  
- **Patch**: Correções de bugs

## 🐛 Tratamento de Erros

A API sempre retorna erros em formato JSON:

```json
{
  "success": false,
  "error": "Item não encontrado",
  "message": "Item com ID 999 não existe"
}
```

Tipos de erro comuns:
- `ID inválido` - Parâmetro ID não é um número válido
- `Item não encontrado` - Item com ID especificado não existe
- `Erro interno do servidor` - Problema no servidor (verificar logs)
