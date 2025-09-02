/** @type {import('next').NextConfig} */
const nextConfig = {
  // Desativar bodyParser para permitir upload de arquivos
  api: {
    bodyParser: false,
    externalResolver: true,
  },
  // Aumentar limite de tempo para funções serverless (máximo 15s no plano free)
  experimental: {
    serverComponentsExternalPackages: ['formidable'],
  },
}

module.exports = nextConfig
