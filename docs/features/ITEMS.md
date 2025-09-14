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
### GET `/items`
Returns all available items.
```json
[
  {
    "id": 1,
    "name": "HP Increase Potion (Small)",
    "typeId": 1,
    "description": "A small potion that increases Max HP."
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
]
```
### GET `/items/{itemId}`
Returns a single item based on its `id`.
```json
{
  "id": 1,
  "name": "HP Increase Potion (Small)",
  "typeId": 1,
  "description": "A small potion that increases Max HP."
}
```
```json
{
  "id": 2,
  "name": "Cotton Shirt",
  "typeId": 2,
  "description": "A simple, sturdily made shirt of cotton."
}
```
```json
{
  "id": 3,
  "name": "Jellopy",
  "typeId": 3,
  "description": "A small crystallization created by some monsters."
}
```

## Treatments
### If no items exist in `/items`
```json
{
  "error": "No items found in the database",
  "status": 404
}
```
### If an `itemId` does not exist
```json
{
  "error": "Item not found",
  "status": 404
}
```