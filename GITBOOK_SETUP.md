# 🚀 Guia de Ativação Automática - GitBook + GitHub

Este guia te ajudará a ativar a sincronização automática entre seu repositório GitHub e o GitBook.

## 📋 Pré-requisitos Verificados ✅

- [x] GitBook ativo e conectado ao GitHub
- [x] Repositório `fahleiro/openRPG` configurado
- [x] Estrutura de documentação criada (`/docs`)
- [x] GitHub Actions configurado

## 🔧 Passo a Passo para Ativação

### 1. 🎯 Configurar GitBook Integration

**No seu GitBook Dashboard:**

1. Acesse seu espaço do openRPG no GitBook
2. Vá em **Settings** (Configurações)
3. Clique em **Integrations** (Integrações)
4. Encontre **GitHub** e clique em **Configure**

### 2. 📂 Configurar Source Repository

**Configurações importantes:**
```
Repository: fahleiro/openRPG
Branch: main
Root Path: /docs
Auto-sync: ENABLED ✅
```

### 3. 🔄 Ativar Auto-Sync

**No GitBook:**
1. Em **Integrations > GitHub**
2. Ative **"Auto-sync with GitHub"**
3. Configure:
   - **Direction**: Bidirectional (GitHub ↔ GitBook)
   - **Branch**: main
   - **Path**: docs/

### 4. 🚀 Testar Sincronização Automática

Execute estes comandos para testar:

```bash
# 1. Fazer uma pequena alteração na documentação
echo "# Teste de Sincronização" >> docs/test-sync.md

# 2. Commit e push
git add .
git commit -m "test: Teste de sincronização GitBook"
git push origin main

# 3. Verificar no GitBook (deve aparecer em ~1-2 minutos)
```

## ⚙️ Configurações Avançadas

### GitHub Actions (Já Configurado) ✅

O arquivo `.github/workflows/docs.yml` já está configurado para:
- Build automático da documentação
- Deploy no GitHub Pages
- Trigger em mudanças na pasta `/docs`

### Webhooks Automáticos

**O GitBook criará automaticamente:**
- Webhook para receber pushes do GitHub
- Sincronização bidirecional
- Notificações de build

## 🔍 Verificar se Está Funcionando

### 1. Indicadores no GitBook
- ✅ **Green dot** ao lado do nome do espaço
- ✅ **"Synced with GitHub"** no status
- ✅ Commits aparecem no histórico

### 2. Indicadores no GitHub
- ✅ **Webhook** ativo em Settings > Webhooks
- ✅ **GitHub Actions** executando com sucesso
- ✅ **GitHub Pages** publicando automaticamente

### 3. Teste Prático
```bash
# Edite qualquer arquivo em /docs
# Faça commit e push
# Verifique se aparece no GitBook em 1-2 minutos
```

## 🛠️ Comandos Úteis

```bash
# Servir documentação localmente
npm run docs:serve
# Acesse: http://localhost:4000

# Build da documentação
npm run docs:build

# Publicar no GitHub Pages
npm run docs:publish

# Instalar GitBook CLI (se necessário)
npm run docs:install
```

## 🐛 Solução de Problemas

### Sincronização Não Funcionando

1. **Verificar Permissões:**
   - GitBook tem acesso ao repositório?
   - Branch `main` existe e tem commits?

2. **Verificar Configurações:**
   ```
   Repository: fahleiro/openRPG ✅
   Branch: main ✅
   Path: docs/ ✅
   Auto-sync: Enabled ✅
   ```

3. **Forçar Sincronização:**
   - No GitBook: Settings > Integrations > GitHub > "Sync Now"

### GitHub Actions Falhando

```bash
# Verificar logs no GitHub
# Ir em: Actions > Build and Deploy GitBook Documentation
# Verificar se há erros nos logs
```

### Webhook Não Recebido

1. **GitHub Settings > Webhooks**
2. Verificar se webhook do GitBook está ativo
3. Verificar "Recent Deliveries" para erros

## ✅ Checklist Final

- [ ] GitBook conectado ao GitHub
- [ ] Auto-sync ativado
- [ ] Teste de sincronização realizado
- [ ] GitHub Actions funcionando
- [ ] GitHub Pages publicando
- [ ] Documentação acessível online

## 🎉 Resultado Final

Após configurar tudo:

1. **Edite qualquer arquivo** em `/docs`
2. **Faça commit e push**
3. **GitBook sincroniza automaticamente** (1-2 min)
4. **GitHub Pages atualiza** (2-3 min)
5. **Documentação fica disponível** em ambos os locais

### URLs Finais:
- **GitBook**: https://fahleiro.gitbook.io/openrpg
- **GitHub Pages**: https://fahleiro.github.io/openRPG

---

**🚀 Sincronização Automática Ativada!** Sua documentação agora se atualiza sozinha a cada push!
