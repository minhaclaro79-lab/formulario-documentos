import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [idade, setIdade] = useState('')
  const [frenteImage, setFrenteImage] = useState(null)
  const [versoImage, setVersoImage] = useState(null)
  const [selfieImage, setSelfieImage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('Pronto para enviar...')
  const [isLoading, setIsLoading] = useState(false)

  const previewImage = (input, setImageFunction) => {
    if (input.files && input.files[0]) {
      const file = input.files[0]
      
      // Verificar se é uma imagem
      if (!file.type.match('image.*')) {
        alert('Por favor, selecione apenas imagens.')
        input.value = ''
        return
      }
      
      // Verificar tamanho do arquivo (5MB máximo)
      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB.')
        input.value = ''
        return
      }
      
      // Salvar a imagem para envio
      setImageFunction(file)
    }
  }

  const validateForm = () => {
    if (!nome || !cpf || !idade) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }
    
    if (!frenteImage) {
      alert('Por favor, adicione a foto da frente do documento.')
      return
    }
    
    setIsModalOpen(true)
  }

  const resetForm = () => {
    setNome('')
    setCpf('')
    setIdade('')
    setFrenteImage(null)
    setVersoImage(null)
    setSelfieImage(null)
  }

  const sendEmail = async () => {
    setIsLoading(true)
    setProgress(0)
    setStatusText('Enviando dados...')
    
    const formData = new FormData()
    formData.append('nome', nome)
    formData.append('cpf', cpf)
    formData.append('idade', idade)
    formData.append('email', 'gabrielreboucas2001@gmail.com')
    
    if (frenteImage) formData.append('frente', frenteImage)
    if (versoImage) formData.append('verso', versoImage)
    if (selfieImage) formData.append('selfie', selfieImage)
    
    try {
      // Simular progresso
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 5
        })
      }, 100)
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formData,
      })
      
      clearInterval(interval)
      setProgress(100)
      
      const data = await response.json()
      
      if (data.success) {
        setStatusText('Dados e fotos enviados com sucesso!')
        setTimeout(() => {
          setIsModalOpen(false)
          resetForm()
          setIsLoading(false)
        }, 3000)
      } else {
        throw new Error(data.message || 'Erro ao enviar')
      }
    } catch (error) {
      setStatusText('Erro ao enviar: ' + error.message)
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Formulário de Identificação</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      <div className="container">
        <div className="header">
          <h1>Formulário de Identificação</h1>
          <p>Preencha os dados e envie as fotos do seu documento</p>
        </div>
        
        <div className="form-container">
          <div className="setup-instructions">
            <h3>Configuração para Produção</h3>
            <p>Para configurar o envio de emails em produção:</p>
            <ol>
              <li>Adicione suas variáveis de ambiente no Vercel</li>
              <li>Configure um serviço de email como SendGrid ou Resend</li>
              <li>Substitua as credenciais nas variáveis de ambiente</li>
            </ol>
          </div>
          
          <div className="form-group">
            <label htmlFor="nome">NOME COMPLETO</label>
            <input 
              type="text" 
              id="nome" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome completo" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input 
              type="text" 
              id="cpf" 
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Digite seu CPF" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="idade">Qual sua idade?</label>
            <input 
              type="text" 
              id="idade" 
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              placeholder="Digite sua idade" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>RG/CNH (FRENTE) - Foto</label>
            <div className="file-upload">
              <i className="fas fa-camera"></i>
              <p>Clique para adicionar foto da Frente do documento</p>
              <p>Formatos: JPG, PNG (Máx. 5 MB)</p>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => previewImage(e.target, setFrenteImage)}
              />
            </div>
            {frenteImage && (
              <div className="file-name">
                Arquivo selecionado: {frenteImage.name}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label>RG/CNH (VERSO) - Foto</label>
            <div className="file-upload">
              <i className="fas fa-camera"></i>
              <p>Clique para adicionar foto do Verso do documento</p>
              <p>Formatos: JPG, PNG (Máx. 5 MB)</p>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => previewImage(e.target, setVersoImage)}
              />
            </div>
            {versoImage && (
              <div className="file-name">
                Arquivo selecionado: {versoImage.name}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label>SELFIE COM DOCUMENTO - Foto</label>
            <div className="file-upload">
              <i className="fas fa-user-circle"></i>
              <p>Clique para adicionar selfie com o documento</p>
              <p>Formatos: JPG, PNG (Máx. 5 MB)</p>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => previewImage(e.target, setSelfieImage)}
              />
            </div>
            {selfieImage && (
              <div className="file-name">
                Arquivo selecionado: {selfieImage.name}
              </div>
            )}
          </div>
          
          <div className="btn-group">
            <button className="btn btn-submit" onClick={validateForm}>
              <i className="fas fa-paper-plane"></i> Enviar Fotos por Email
            </button>
            <button className="btn btn-reset" onClick={resetForm}>
              <i className="fas fa-eraser"></i> Limpar formulário
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal active">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
            
            <div className="modal-icon">
              <i className="fas fa-envelope"></i>
            </div>
            
            <h2>Enviar Formulário</h2>
            <p>Os dados e fotos serão enviados para: <strong>gabrielreboucas2001@gmail.com</strong></p>
            
            <div className="progress-bar">
              <div className="progress" style={{width: `${progress}%`}}></div>
            </div>
            
            <p>{statusText}</p>
            
            <button 
              className="btn btn-submit" 
              onClick={sendEmail} 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="loading"></div> Enviando...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i> Confirmar Envio
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Todos os estilos CSS que estavam no index.html anterior */
        /* Cole aqui todo o CSS da versão anterior */
        :root {
          --primary: #4361ee;
          --primary-dark: #3a0ca3;
          --secondary: #7209b7;
          --accent: #f72585;
          --light: #f8f9fa;
          --dark: #212529;
          --success: #4cc9f0;
          --warning: #f9c74f;
          --error: #f94144;
          --gray: #6c757d;
          --border-radius: 12px;
          --shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          --transition: all 0.3s ease;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        
        .container {
          width: 100%;
          max-width: 800px;
          background: white;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow);
          overflow: hidden;
          animation: fadeIn 0.8s ease;
        }
        
        .header {
          background: var(--primary);
          color: white;
          padding: 25px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: rotate(45deg);
          animation: shimmer 8s infinite linear;
        }
        
        .header h1 {
          font-size: 28px;
          margin-bottom: 10px;
          font-weight: 600;
          position: relative;
        }
        
        .header p {
          opacity: 0.9;
          position: relative;
        }
        
        .form-container {
          padding: 30px;
        }
        
        .form-group {
          margin-bottom: 25px;
        }
        
        label {
          display: block;
          margin-bottom: 10px;
          font-weight: 500;
          color: var(--dark);
        }
        
        label::after {
          content: " *";
          color: var(--accent);
        }
        
        input[type="text"] {
          width: 100%;
          padding: 15px;
          border: 2px solid #e1e5ee;
          border-radius: var(--border-radius);
          outline: none;
          transition: var(--transition);
          font-size: 16px;
        }
        
        input[type="text"]:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
        }
        
        .file-upload {
          position: relative;
          border: 2px dashed #e1e5ee;
          border-radius: var(--border-radius);
          padding: 30px;
          text-align: center;
          transition: var(--transition);
          cursor: pointer;
        }
        
        .file-upload:hover {
          border-color: var(--primary);
          background-color: rgba(67, 97, 238, 0.03);
        }
        
        .file-upload i {
          font-size: 40px;
          color: var(--primary);
          margin-bottom: 15px;
          display: block;
        }
        
        .file-upload p {
          margin-bottom: 15px;
          color: var(--gray);
        }
        
        .file-upload input[type="file"] {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          cursor: pointer;
        }
        
        .btn-group {
          display: flex;
          gap: 15px;
          margin-top: 30px;
        }
        
        .btn {
          flex: 1;
          padding: 16px;
          border: none;
          border-radius: var(--border-radius);
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }
        
        .btn-submit {
          background: var(--primary);
          color: white;
        }
        
        .btn-submit:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(58, 12, 163, 0.3);
        }
        
        .btn-reset {
          background: #e9ecef;
          color: var(--gray);
        }
        
        .btn-reset:hover {
          background: #dee2e6;
          transform: translateY(-2px);
        }
        
        .file-name {
          margin-top: 10px;
          font-size: 14px;
          color: var(--primary);
          font-weight: 500;
        }
        
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .modal-content {
          background: white;
          width: 90%;
          max-width: 500px;
          border-radius: var(--border-radius);
          padding: 30px;
          text-align: center;
          position: relative;
        }
        
        .modal-close {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: var(--gray);
        }
        
        .modal-icon {
          font-size: 60px;
          margin-bottom: 20px;
        }
        
        .success { color: var(--success); }
        .error { color: var(--error); }
        
        .progress-bar {
          height: 6px;
          background: #e1e5ee;
          border-radius: 3px;
          overflow: hidden;
          margin: 20px 0;
        }
        
        .progress {
          height: 100%;
          width: 0%;
          background: var(--primary);
          border-radius: 3px;
          transition: width 0.5s ease;
        }
        
        .setup-instructions {
          background-color: #f8f9fa;
          border-left: 4px solid var(--primary);
          padding: 20px;
          margin: 20px 0;
          border-radius: 4px;
        }
        
        .setup-instructions h3 {
          margin-top: 0;
          color: var(--primary);
        }
        
        .setup-instructions ol {
          padding-left: 20px;
        }
        
        .setup-instructions li {
          margin-bottom: 10px;
        }
        
        .setup-instructions code {
          background-color: #e9ecef;
          padding: 2px 5px;
          border-radius: 3px;
          font-family: monospace;
        }
        
        .loading {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease infinite;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 576px) {
          .btn-group {
            flex-direction: column;
          }
          
          .header h1 {
            font-size: 24px;
          }
          
          .form-container {
            padding: 20px;
          }
        }
      `}</style>
    </>
  )
}
