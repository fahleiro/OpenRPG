## About
OpenRPG is a self-hosted, open-source backend for RPGs, developed in TypeScript and built as a REST API. This project focuses on creating a solid and scalable foundation for RPG games

## Key Features
- **TypeScript** – Used in the backend server  
- **Express.js** – Web framework that handles routes and server logic 
- **RESTful API** – Endpoints to expose server features 
- **JSON Database** – Simple database in JSON format  
- **Configurable CORS** – Controls which clients can access the API securely  



## 📋 Status do Projeto

**Versão Atual**: 1.0.0 (Beta)  
**Status**: Protótipo inicial funcional  
**Última Atualização**: {{ book.time }}

## 🎮 Sistema de Itens

O sistema atual inclui:
- ✅ **Listagem de itens** (`GET /items`)
- ✅ **Busca por ID** (`GET /items/:id`)
- ✅ **Tipos variados**: weapons, armor, consumables, misc
- ✅ **Raridades**: common, uncommon, rare, epic, legendary
- ✅ **Stats complexos**: damage, defense, durability, weight
- ✅ **Requisitos**: level, strength, dexterity, intelligence, constitution

## 🔗 Links Úteis

- **Repositório GitHub**: [fahleiro/openRPG](https://github.com/fahleiro/openRPG)
- **API Base URL**: `{{ book.baseUrl }}`
- **Health Check**: `{{ book.baseUrl }}/health`

---

## 📚 Navegação da Documentação

Use o menu lateral para navegar pelos diferentes tópicos:

1. **Início Rápido** - Como configurar e executar o projeto
2. **API Reference** - Documentação completa dos endpoints
3. **Configuração** - Como personalizar o servidor via `server.conf`
4. **Estrutura de Dados** - Schemas e interfaces TypeScript
5. **Exemplos** - Casos de uso práticos e exemplos de código
6. **Roadmap** - Funcionalidades futuras e evolução do projeto

---

> 💡 **Dica**: Esta documentação é gerada automaticamente e mantida sincronizada com o código do projeto. Para contribuir, edite os arquivos markdown na pasta `/docs` do repositório.
