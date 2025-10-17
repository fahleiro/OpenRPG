# Database

O OpenRPG utiliza um banco de dados local baseado em arquivos JSON para armazenar os dados do jogo. Esta abordagem oferece simplicidade, facilidade de manutenção e não requer configuração de servidor de banco de dados externo.

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

## Estrutura dos Arquivos JSON

Cada arquivo JSON representa um item e deve seguir a seguinte estrutura:

```json
{
  "id": 1,
  "name": "Red Potion",
  "type": 1,
  "description": "A small red potion that restores 1% of Max HP."
}
```

### Campos Obrigatórios

- **id**: Número único identificador do item
- **name**: Nome do item
- **type**: Tipo do item (1=consumível, 2=equipável, 3=diversos)
- **description**: Descrição do item

## Tipos de Itens

- **Type 1 (cons)**: Itens consumíveis como poções, comida, etc.
- **Type 2 (equip)**: Itens equipáveis como armas, armaduras, acessórios
- **Type 3 (misc)**: Itens diversos como materiais, moedas, etc.

## Adicionando Novos Itens

Para adicionar um novo item:

1. Crie um arquivo JSON na pasta correspondente ao tipo do item
2. Use um ID único que não conflite com itens existentes
3. Preencha todos os campos obrigatórios
4. O sistema automaticamente detectará e carregará o novo item

## Vantagens do Banco Local

- **Simplicidade**: Não requer configuração de servidor de banco de dados
- **Portabilidade**: Fácil de mover e fazer backup
- **Desenvolvimento**: Ideal para desenvolvimento e testes
- **Versionamento**: Arquivos JSON podem ser versionados com Git
- **Transparência**: Fácil de visualizar e editar os dados

## Limitações

- **Performance**: Para grandes volumes de dados, pode ser mais lento que bancos tradicionais
- **Concorrência**: Não suporta múltiplas escritas simultâneas
- **Escalabilidade**: Limitado para aplicações com muitos usuários simultâneos

## Serviço de Banco de Dados

O sistema utiliza o `LocalDatabaseService` (`src/db/LocalDatabaseService.ts`) para:

- Ler todos os itens do banco local
- Buscar itens específicos por ID
- Validar a estrutura dos dados
- Tratar erros de leitura de arquivos

Este serviço substitui completamente o Firebase, oferecendo a mesma funcionalidade com dados locais.
