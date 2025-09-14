# openRPG Backend - Documentação

## Sobre
O openRPG é um backend self-hosted e open source para RPGs, desenvolvido em TypeScript e construído como uma REST API. Este projeto foca em criar uma base sólida e escalável para jogos de RPG, começando com um sistema simples mas robusto de itens.

## 🚀 Características Principais

- **TypeScript** - Tipagem forte e desenvolvimento seguro
- **Express.js** - Framework web rápido e minimalista
- **Configuração Flexível** - Sistema de configuração via `server.conf`
- **API RESTful** - Endpoints bem estruturados e documentados
- **Banco JSON** - Persistência simples para prototipagem (expansível para BD real)
- **CORS Configurável** - Suporte a múltiplos domínios
- **Logging Inteligente** - Logs detalhados em desenvolvimento

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
