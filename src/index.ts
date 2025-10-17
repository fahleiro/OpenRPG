import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import itemRoutes from './routes/itemRoutes';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

/**
 * Configuração principal do servidor OpenRPG Core
 * 
 * @description Este arquivo configura o servidor Express com middlewares
 * essenciais, rotas e tratamento de erros para o core do OpenRPG.
 * Serve como base para que a comunidade possa criar seus próprios servidores.
 */

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

/**
 * Configuração de middlewares
 * 
 * @description Configura middlewares essenciais para o funcionamento
 * da API, incluindo CORS, parsing de JSON e logging básico.
 */
app.use(cors({
  origin: '*', // Permite todas as origens para facilitar desenvolvimento
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsing de JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware de logging básico
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

/**
 * Configuração de rotas
 * 
 * @description Define as rotas principais da API. Cada módulo de funcionalidade
 * (items, characters, accounts, etc.) deve ter suas rotas organizadas em arquivos separados.
 */
app.use('/api/items', itemRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'OpenRPG Core Server está funcionando',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Rota raiz com informações da API
app.get('/', (req, res) => {
  res.json({
    name: 'OpenRPG Core Server',
    description: 'Servidor open source para RPG',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      items: '/api/items'
    },
    documentation: 'https://docs.openrpg.com'
  });
});

/**
 * Middleware de tratamento de erros 404
 * 
 * @description Captura todas as rotas não encontradas e retorna
 * uma resposta padronizada de erro 404.
 */
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Rota não encontrada',
    message: `A rota ${req.method} ${req.originalUrl} não existe`,
    availableRoutes: ['/', '/health', '/api/items']
  });
});

/**
 * Middleware global de tratamento de erros
 * 
 * @description Captura todos os erros não tratados da aplicação
 * e retorna uma resposta padronizada de erro interno.
 */
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro não tratado:', error);
  
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor',
    message: 'Ocorreu um erro inesperado no servidor'
  });
});

/**
 * Inicia o servidor
 * 
 * @description Função responsável por inicializar o servidor Express
 * na porta especificada e exibir informações de inicialização.
 */
function startServer(): void {
  app.listen(PORT, () => {
    console.log('=================================');
    console.log('OpenRPG Core Server');
    console.log('=================================');
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`URL: http://localhost:${PORT}`);
    console.log(`Health Check: http://localhost:${PORT}/health`);
    console.log('=================================');
  });
}

// Inicia o servidor
startServer();
