/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para desativar bodyParser globalmente não é mais suportada
  // Vamos desativar por rota individualmente na API
  experimental: {
    serverComponentsExternalPackages: ['formidable'],
  },
  // Aumentar timeout para funções serverless (máximo 15s no plano free)
  serverRuntimeConfig: {
    maxDuration: 15,
  },
}

module.exports = nextConfig
