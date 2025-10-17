## Types
Items are categorized into three types, each represented by an ID:  
- consumable `1`  
- equipment `2`  
- miscellaneous `3`  

## Models
### Consumables
```json
{
  "id": 1,
  "name": "HP Increase Potion (Small)",
  "typeId": 1,
  "description": "A small potion that increases Max HP."
}
```
### Equipment
```json
{
  "id": 2,
  "name": "Cotton Shirt",
  "typeId": 2,
  "description": "A simple, sturdily made shirt of cotton."
}
```
### Miscellaneous
```json
{
  "id": 3,
  "name": "Jellopy",
  "typeId": 3,
  "description": "A small crystallization created by some monsters."
}
```
## API
### GET `/api/items`
Returns all available items with standardized response format.
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Red Potion",
      "typeId": 1,
      "description": "A small red potion that restores 1% of Max HP."
    },
    {
      "id": 2,
      "name": "Cotton Shirt",
      "typeId": 2,
      "description": "A simple, sturdily made shirt of cotton."
    },
    {
      "id": 3,
      "name": "Jellopy",
      "typeId": 3,
      "description": "A small crystallization created by some monsters."
    }
  ],
  "count": 3,
  "message": "Itens carregados com sucesso"
}
```

### GET `/api/items/{itemId}`
Returns a single item based on its `id` with standardized response format.
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Red Potion",
    "typeId": 1,
    "description": "A small red potion that restores 1% of Max HP."
  },
  "message": "Item encontrado com sucesso"
}
```

## Treatments
### If no items exist in `/api/items`
```json
{
  "success": true,
  "data": [],
  "count": 0,
  "message": "Nenhum item encontrado"
}
```

### If an `itemId` does not exist
```json
{
  "success": false,
  "error": "Item não encontrado",
  "message": "Item com ID {id} não existe"
}
```

### If invalid `itemId` is provided
```json
{
  "success": false,
  "error": "ID inválido",
  "message": "O ID deve ser um número positivo"
}
```