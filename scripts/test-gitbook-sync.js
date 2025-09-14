#!/usr/bin/env node

/**
 * Script para testar a sincronização automática GitBook + GitHub
 * Executa: node scripts/test-gitbook-sync.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Testando Sincronização GitBook + GitHub\n');

// 1. Verificar se estamos no diretório correto
const currentDir = process.cwd();
const packageJsonPath = path.join(currentDir, 'package.json');

if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ Erro: Execute este script na raiz do projeto openRPG');
  process.exit(1);
}

// 2. Verificar se a pasta docs existe
const docsPath = path.join(currentDir, 'docs');
if (!fs.existsSync(docsPath)) {
  console.error('❌ Erro: Pasta /docs não encontrada');
  process.exit(1);
}

console.log('✅ Estrutura do projeto verificada');

// 3. Criar arquivo de teste
const testFilePath = path.join(docsPath, 'test-sync.md');
const timestamp = new Date().toISOString();
const testContent = `# Teste de Sincronização GitBook

**Timestamp**: ${timestamp}

Este arquivo foi criado automaticamente para testar a sincronização entre GitHub e GitBook.

## Status do Teste

- ✅ Arquivo criado em: ${timestamp}
- 🔄 Aguardando sincronização com GitBook...
- 📡 Verificar em: https://fahleiro.gitbook.io/openrpg

## Próximos Passos

1. Este arquivo deve aparecer no GitBook em 1-2 minutos
2. GitHub Actions deve fazer build automaticamente
3. GitHub Pages deve atualizar em 2-3 minutos

---

*Arquivo gerado automaticamente pelo script test-gitbook-sync.js*
`;

try {
  // 4. Escrever arquivo de teste
  fs.writeFileSync(testFilePath, testContent);
  console.log('✅ Arquivo de teste criado: docs/test-sync.md');

  // 5. Verificar status do Git
  try {
    const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
    if (gitStatus.trim()) {
      console.log('📝 Alterações detectadas no Git');
    }
  } catch (error) {
    console.log('⚠️  Aviso: Não foi possível verificar status do Git');
  }

  // 6. Instruções para o usuário
  console.log('\n🎯 Próximos passos para completar o teste:');
  console.log('');
  console.log('1. Fazer commit das alterações:');
  console.log('   git add .');
  console.log('   git commit -m "test: Teste de sincronização GitBook"');
  console.log('');
  console.log('2. Fazer push para o GitHub:');
  console.log('   git push origin main');
  console.log('');
  console.log('3. Verificar sincronização:');
  console.log('   - GitBook: https://fahleiro.gitbook.io/openrpg');
  console.log('   - GitHub Actions: https://github.com/fahleiro/openRPG/actions');
  console.log('   - GitHub Pages: https://fahleiro.github.io/openRPG');
  console.log('');
  console.log('⏱️  Tempo esperado de sincronização: 1-3 minutos');
  console.log('');

  // 7. Opção de fazer commit automaticamente
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('🤖 Deseja fazer commit e push automaticamente? (y/N): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      try {
        console.log('\n🔄 Fazendo commit...');
        execSync('git add .', { stdio: 'inherit' });
        execSync('git commit -m "test: Teste de sincronização GitBook"', { stdio: 'inherit' });
        
        console.log('🚀 Fazendo push...');
        execSync('git push origin main', { stdio: 'inherit' });
        
        console.log('\n✅ Teste enviado com sucesso!');
        console.log('🔍 Verifique a sincronização nos links acima');
      } catch (error) {
        console.error('\n❌ Erro ao fazer commit/push:', error.message);
        console.log('💡 Execute os comandos manualmente conforme instruções acima');
      }
    } else {
      console.log('\n📝 Execute os comandos manualmente conforme instruções acima');
    }
    
    rl.close();
  });

} catch (error) {
  console.error('❌ Erro ao criar arquivo de teste:', error.message);
  process.exit(1);
}
