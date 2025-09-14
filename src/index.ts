import express from 'express';
import cors from 'cors';
import itemRoutes from './routes/itemRoutes';
import { FileUtils } from './utils/fileUtils';
import { ConfigUtils, ServerConfig } from './utils/configUtils';

const app = express();

// Variável global para armazenar as configurações
let config: ServerConfig;

// Configuração dinâmica de middlewares (será aplicada após carregar config)
function setupMiddlewares() {
  // CORS configurável
  const corsOptions = {
    origin: config.CORS_ORIGIN === '*' ? true : config.CORS_ORIGIN.split(','),
    methods: config.CORS_METHODS.split(','),
    allowedHeaders: config.CORS_HEADERS.split(','),
    credentials: true
  };
  
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
}

// Middleware de log configurável
function setupLogging() {
  if (config.NODE_ENV === 'development') {
    app.use((req, res, next) => {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] ${req.method} ${req.path} - IP: ${req.ip}`);
      next();
    });
  }
}

// Rotas
app.use('/items', itemRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'openRPG Backend está funcionando!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    config: {
      host: config.SERVER_HOST,
      port: config.SERVER_PORT,
      environment: config.NODE_ENV
    }
  });
});

// Rota raiz
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Bem-vindo ao openRPG Backend!',
    description: 'Self-hosted, open source backend for RPGs in TypeScript',
    endpoints: {
      health: '/health',
      items: '/items',
      itemById: '/items/:id'
    },
    documentation: 'https://github.com/fahleiro/openRPG'
  });
});

// Middleware de tratamento de rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint não encontrado',
    message: `A rota ${req.method} ${req.originalUrl} não existe`,
    availableEndpoints: ['/', '/health', '/items', '/items/:id']
  });
});

// Middleware de tratamento de erros globais
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro não tratado:', error);
  
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor',
    message: 'Algo deu errado no servidor'
  });
});

// Inicialização do servidor
async function startServer() {
  try {
    // 1. Carrega as configurações do server.conf
    console.log('📋 Carregando configurações...');
    config = await ConfigUtils.loadConfig();
    
    // 2. Configura middlewares com base nas configurações
    setupMiddlewares();
    setupLogging();
    
    // 3. Garante que a pasta de itens existe
    await FileUtils.ensureItemsDirectory();
    
    // 4. Inicia o servidor com as configurações carregadas
    app.listen(config.SERVER_PORT, config.SERVER_HOST, () => {
      console.log('🚀 openRPG Backend iniciado com sucesso!');
      console.log(`📡 Servidor rodando em ${config.SERVER_HOST}:${config.SERVER_PORT}`);
      console.log(`🌐 Acesse: http://${config.SERVER_HOST}:${config.SERVER_PORT}`);
      console.log(`📋 Health check: http://${config.SERVER_HOST}:${config.SERVER_PORT}/health`);
      console.log(`📦 Itens: http://${config.SERVER_HOST}:${config.SERVER_PORT}/items`);
      console.log(`⚙️  Ambiente: ${config.NODE_ENV}`);
      console.log(`📄 Configurações carregadas de: server.conf`);
      console.log('');
      console.log('Pressione Ctrl+C para parar o servidor');
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}

// Tratamento de sinais para encerramento gracioso
process.on('SIGINT', () => {
  console.log('\n🛑 Encerrando servidor...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Encerrando servidor...');
  process.exit(0);
});

// Inicia o servidor
startServer();
