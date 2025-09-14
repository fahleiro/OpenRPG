## 📦 GET /items

Lista todos os itens disponíveis no sistema.

### Request

```http
GET /items HTTP/1.1
Host: localhost:3000
Accept: application/json
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Espada de Ferro",
      "type": "weapon",
      "rarity": "common",
      "description": "Uma espada básica feita de ferro forjado. Confiável e durável para aventureiros iniciantes.",
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
      "stackable": false,
      "createdAt": "2025-09-14T03:16:00.000Z",
      "updatedAt": "2025-09-14T03:16:00.000Z"
    }
  ],
  "count": 3,
  "message": "Itens carregados com sucesso"
}
```

## 🔍 GET /items/:id

Busca um item específico pelo seu ID.

### Request

```http
GET /items/1 HTTP/1.1
Host: localhost:3000
Accept: application/json
```

### Parameters

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `id` | `number` | ID único do item (obrigatório) |

### Response - Sucesso (200)

```json
{
  "success": true,
  "data": {
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
  },
  "message": "Item encontrado com sucesso"
}
```

### Exemplos de Uso

```javascript
// JavaScript/Fetch
const response = await fetch('http://localhost:3000/items');
const result = await response.json();

if (result.success) {
  console.log(`Total de itens: ${result.count}`);
  result.data.forEach(item => {
    console.log(`${item.name} (${item.type}) - ${item.value} moedas`);
  });
}
```

```bash
# cURL
curl -X GET http://localhost:3000/items \
  -H "Accept: application/json"
```