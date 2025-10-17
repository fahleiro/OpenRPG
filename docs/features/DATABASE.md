# Database

O OpenRPG utiliza um banco de dados local baseado em arquivos JSON para armazenar os dados do jogo.

## Estrutura do Banco de Dados

O banco de dados está localizado em `src/db/item/` e organiza os itens por tipo:

```
src/db/item/
├── cons/          # Itens consumíveis
│   └── 1/
│       └── 1.json
├── equip/         # Itens equipáveis
│   └── 2/
│       └── 2.json
└── misc/          # Itens diversos
    └── 3.json
```

## Serviço de Banco de Dados

O sistema utiliza o `LocalDatabaseService` (`src/db/LocalDatabaseService.ts`) para:

- Ler todos os itens do banco local
- Buscar itens específicos por ID
- Validar a estrutura dos dados
- Tratar erros de leitura de arquivos

Este serviço substitui completamente o Firebase, oferecendo a mesma funcionalidade com dados locais.
