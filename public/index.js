<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulário de Identificação</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
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
            opacity: 0;
            animation: slideIn 0.5s ease forwards;
        }
        
        .form-group:nth-child(1) { animation-delay: 0.2s; }
        .form-group:nth-child(2) { animation-delay: 0.3s; }
        .form-group:nth-child(3) { animation-delay: 0.4s; }
        .form-group:nth-child(4) { animation-delay: 0.5s; }
        .form-group:nth-child(5) { animation-delay: 0.6s; }
        .form-group:nth-child(6) { animation-delay: 0.7s; }
        
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
        
        input[type="text"], input[type="email"] {
            width: 100%;
            padding: 15px;
            border: 2px solid #e1e5ee;
            border-radius: var(--border-radius);
            outline: none;
            transition: var(--transition);
            font-size: 16px;
        }
        
        input[type="text"]:focus, input[type="email"]:focus {
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
            opacity: 0;
            animation: fadeIn 0.8s ease 1s forwards;
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
            display: none;
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
            opacity: 0;
            visibility: hidden;
            transition: var(--transition);
        }
        
        .modal.active {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-content {
            background: white;
            width: 90%;
            max-width: 500px;
            border-radius: var(--border-radius);
            padding: 30px;
            text-align: center;
            transform: translateY(-50px);
            transition: var(--transition);
            position: relative;
        }
        
        .modal.active .modal-content {
            transform: translateY(0);
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
        
        .preview-container {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 15px;
        }
        
        .preview-item {
            width: 100px;
            height: 100px;
            border-radius: 8px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .preview-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .preview-item .remove-btn {
            position: absolute;
            top: 5px;
            right: 5px;
            background: var(--error);
            color: white;
            border: none;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            font-size: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes shimmer {
            0% { transform: translateX(-100%) rotate(45deg); }
            100% { transform: translateX(100%) rotate(45deg); }
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
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
            
            .preview-item {
                width: 80px;
                height: 80px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Formulário de Identificação</h1>
            <p>Preencha os dados e envie as fotos do seu documento</p>
        </div>
        
        <div class="form-container">
            <div class="setup-instructions">
                <h3>Configuração para Produção</h3>
                <p>Para configurar o envio de emails em produção:</p>
                <ol>
                    <li>Adicione suas variáveis de ambiente no Vercel</li>
                    <li>Configure um serviço de email como SendGrid ou Resend</li>
                    <li>Substitua as credenciais nas variáveis de ambiente</li>
                </ol>
            </div>
            
            <div class="form-group">
                <label for="nome">NOME COMPLETO</label>
                <input type="text" id="nome" placeholder="Digite seu nome completo" required>
            </div>
            
            <div class="form-group">
                <label for="cpf">CPF</label>
                <input type="text" id="cpf" placeholder="Digite seu CPF" required>
            </div>
            
            <div class="form-group">
                <label for="idade">Qual sua idade?</label>
                <input type="text" id="idade" placeholder="Digite sua idade" required>
            </div>
            
            <div class="form-group">
                <label>RG/CNH (FRENTE) - Foto</label>
                <div class="file-upload" id="frente-upload">
                    <i class="fas fa-camera"></i>
                    <p>Clique para adicionar foto da Frente do documento</p>
                    <p>Formatos: JPG, PNG (Máx. 5 MB)</p>
                    <input type="file" accept="image/*" id="frente-file" onchange="previewImage(this, 'frente-preview')">
                </div>
                <div class="file-name" id="frente-file-name"></div>
                <div class="preview-container" id="frente-preview"></div>
            </div>
            
            <div class="form-group">
                <label>RG/CNH (VERSO) - Foto</label>
                <div class="file-upload" id="verso-upload">
                    <i class="fas fa-camera"></i>
                    <p>Clique para adicionar foto do Verso do documento</p>
                    <p>Formatos: JPG, PNG (Máx. 5 MB)</p>
                    <input type="file" accept="image/*" id="verso-file" onchange="previewImage(this, 'verso-preview')">
                </div>
                <div class="file-name" id="verso-file-name"></div>
                <div class="preview-container" id="verso-preview"></div>
            </div>
            
            <div class="form-group">
                <label>SELFIE COM DOCUMENTO - Foto</label>
                <div class="file-upload" id="selfie-upload">
                    <i class="fas fa-user-circle"></i>
                    <p>Clique para adicionar selfie com o documento</p>
                    <p>Formatos: JPG, PNG (Máx. 5 MB)</p>
                    <input type="file" accept="image/*" id="selfie-file" onchange="previewImage(this, 'selfie-preview')">
                </div>
                <div class="file-name" id="selfie-file-name"></div>
                <div class="preview-container" id="selfie-preview"></div>
            </div>
            
            <div class="btn-group">
                <button class="btn btn-submit" onclick="validateForm()">
                    <i class="fas fa-paper-plane"></i> Enviar Fotos por Email
                </button>
                <button class="btn btn-reset" onclick="resetForm()">
                    <i class="fas fa-eraser"></i> Limpar formulário
                </button>
            </div>
        </div>
    </div>

    <!-- Modal de envio -->
    <div class="modal" id="modal">
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()">
                <i class="fas fa-times"></i>
            </button>
            
            <div id="modal-icon" class="modal-icon">
                <i class="fas fa-envelope"></i>
            </div>
            
            <h2>Enviar Formulário</h2>
            <p>Os dados e fotos serão enviados para: <strong>gabrielreboucas2001@gmail.com</strong></p>
            
            <div class="progress-bar">
                <div class="progress" id="progress"></div>
            </div>
            
            <p id="status-text">Pronto para enviar...</p>
            
            <button class="btn btn-submit" onclick="sendEmail()" id="submit-btn">
                <i class="fas fa-paper-plane"></i> Confirmar Envio
            </button>
        </div>
    </div>

    <script>
        // Variáveis para armazenar as imagens
        let frenteImage = null;
        let versoImage = null;
        let selfieImage = null;
        
        // Função para visualizar a imagem selecionada
        function previewImage(input, previewId) {
            const fileNameElement = document.getElementById(`${input.id}-name`);
            const previewContainer = document.getElementById(previewId);
            
            if (input.files && input.files[0]) {
                const file = input.files[0];
                const fileName = file.name;
                
                // Verificar se é uma imagem
                if (!file.type.match('image.*')) {
                    alert('Por favor, selecione apenas imagens.');
                    input.value = '';
                    return;
                }
                
                // Verificar tamanho do arquivo (5MB máximo)
                if (file.size > 5 * 1024 * 1024) {
                    alert('A imagem deve ter no máximo 5MB.');
                    input.value = '';
                    return;
                }
                
                fileNameElement.textContent = `Arquivo selecionado: ${fileName}`;
                fileNameElement.style.display = 'block';
                
                // Ler a imagem como URL de dados
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    // Limpar preview anterior
                    previewContainer.innerHTML = '';
                    
                    // Adicionar nova imagem ao preview
                    const previewItem = document.createElement('div');
                    previewItem.className = 'preview-item';
                    
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.alt = "Preview";
                    
                    const removeBtn = document.createElement('button');
                    removeBtn.className = 'remove-btn';
                    removeBtn.innerHTML = '×';
                    removeBtn.onclick = function() {
                        previewContainer.innerHTML = '';
                        input.value = '';
                        fileNameElement.style.display = 'none';
                        
                        // Remover a imagem salva
                        if (input.id === 'frente-file') frenteImage = null;
                        if (input.id === 'verso-file') versoImage = null;
                        if (input.id === 'selfie-file') selfieImage = null;
                    };
                    
                    previewItem.appendChild(img);
                    previewItem.appendChild(removeBtn);
                    previewContainer.appendChild(previewItem);
                    
                    // Salvar a imagem para envio
                    if (input.id === 'frente-file') frenteImage = file;
                    if (input.id === 'verso-file') versoImage = file;
                    if (input.id === 'selfie-file') selfieImage = file;
                };
                
                reader.readAsDataURL(file);
            }
        }
        
        // Adiciona validação básica ao CPF
        document.getElementById('cpf').addEventListener('blur', function() {
            const cpf = this.value.replace(/\D/g, '');
            if (cpf.length !== 11 && cpf.length > 0) {
                this.style.borderColor = 'var(--accent)';
            } else {
                this.style.borderColor = '#e1e5ee';
            }
        });
        
        // Função para validar o formulário antes de enviar
        function validateForm() {
            const nome = document.getElementById('nome').value;
            const cpf = document.getElementById('cpf').value;
            const idade = document.getElementById('idade').value;
            
            if (!nome || !cpf || !idade) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            if (!frenteImage) {
                alert('Por favor, adicione a foto da frente do documento.');
                return;
            }
            
            openModal();
        }
        
        // Função para limpar o formulário
        function resetForm() {
            const inputs = document.querySelectorAll('input[type="text"]');
            inputs.forEach(input => {
                input.value = '';
                input.style.borderColor = '#e1e5ee';
            });
            
            const fileInputs = document.querySelectorAll('input[type="file"]');
            fileInputs.forEach(input => {
                input.value = '';
            });
            
            const fileNames = document.querySelectorAll('.file-name');
            fileNames.forEach(file => {
                file.style.display = 'none';
            });
            
            const previews = document.querySelectorAll('.preview-container');
            previews.forEach(preview => {
                preview.innerHTML = '';
            });
            
            // Limpar imagens salvas
            frenteImage = null;
            versoImage = null;
            selfieImage = null;
            
            // Animação de reset
            const btn = document.querySelector('.btn-reset');
            btn.innerHTML = '<i class="fas fa-check"></i> Limpo!';
            btn.style.background = 'var(--success)';
            btn.style.color = 'white';
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-eraser"></i> Limpar formulário';
                btn.style.background = '';
                btn.style.color = '';
            }, 2000);
        }
        
        // Modal functions
        function openModal() {
            document.getElementById('modal').classList.add('active');
        }
        
        function closeModal() {
            document.getElementById('modal').classList.remove('active');
            resetProgress();
        }
        
        function resetProgress() {
            document.getElementById('progress').style.width = '0%';
            document.getElementById('status-text').textContent = 'Pronto para enviar...';
            document.getElementById('submit-btn').disabled = false;
            document.getElementById('submit-btn').innerHTML = '<i class="fas fa-paper-plane"></i> Confirmar Envio';
            document.getElementById('modal-icon').innerHTML = '<i class="fas fa-envelope"></i>';
            document.getElementById('modal-icon').className = 'modal-icon';
        }
        
        // Função para enviar email com as fotos
        async function sendEmail() {
            const submitBtn = document.getElementById('submit-btn');
            const progress = document.getElementById('progress');
            const statusText = document.getElementById('status-text');
            const modalIcon = document.getElementById('modal-icon');
            
            // Desabilita o botão para evitar múltiplos cliques
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<div class="loading"></div> Enviando...';
            
            // Coletar dados do formulário
            const formData = new FormData();
            formData.append('nome', document.getElementById('nome').value);
            formData.append('cpf', document.getElementById('cpf').value);
            formData.append('idade', document.getElementById('idade').value);
            formData.append('email', 'gabrielreboucas2001@gmail.com');
            
            // Adicionar imagens se existirem
            if (frenteImage) formData.append('frente', frenteImage);
            if (versoImage) formData.append('verso', versoImage);
            if (selfieImage) formData.append('selfie', selfieImage);
            
            // Simula o progresso de upload
            let width = 0;
            const interval = setInterval(() => {
                width += 5;
                progress.style.width = width + '%';
                
                if (width >= 100) {
                    clearInterval(interval);
                    
                    // Enviar dados para a API
                    fetch('/api/send-email', {
                        method: 'POST',
                        body: formData
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            modalIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
                            modalIcon.className = 'modal-icon success';
                            statusText.innerHTML = 'Dados e fotos enviados com sucesso!';
                            
                            submitBtn.innerHTML = '<i class="fas fa-check"></i> Concluído';
                            submitBtn.style.background = 'var(--success)';
                            
                            // Fecha o modal após 3 segundos
                            setTimeout(() => {
                                closeModal();
                                resetForm();
                            }, 5000);
                        } else {
                            throw new Error(data.message || 'Erro ao enviar');
                        }
                    })
                    .catch(error => {
                        console.error('Erro:', error);
                        modalIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
                        modalIcon.className = 'modal-icon error';
                        statusText.textContent = 'Erro ao enviar: ' + error.message;
                        
                        submitBtn.innerHTML = '<i class="fas fa-times"></i> Erro';
                        submitBtn.style.background = 'var(--error)';
                        
                        // Permite tentar novamente após 5 segundos
                        setTimeout(() => {
                            resetProgress();
                        }, 5000);
                    });
                } else if (width >= 50) {
                    statusText.textContent = 'Enviando dados e fotos...';
                }
            }, 100);
        }
    </script>
</body>
</html>