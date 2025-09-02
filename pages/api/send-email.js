import { IncomingForm } from 'formidable';
import { createTransport } from 'nodemailer';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido' });
  }

  try {
    // Processar o formulário com arquivos
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const { nome, cpf, idade, email } = data.fields;
    const { frente, verso, selfie } = data.files;

    // Configurar o transporte de email (substitua com suas configurações)
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Preparar anexos
    const attachments = [];
    
    if (frente) {
      const frenteContent = fs.readFileSync(frente.filepath);
      attachments.push({
        filename: frente.originalFilename || 'frente.jpg',
        content: frenteContent,
        contentType: 'image/jpeg'
      });
    }
    
    if (verso) {
      const versoContent = fs.readFileSync(verso.filepath);
      attachments.push({
        filename: verso.originalFilename || 'verso.jpg',
        content: versoContent,
        contentType: 'image/jpeg'
      });
    }
    
    if (selfie) {
      const selfieContent = fs.readFileSync(selfie.filepath);
      attachments.push({
        filename: selfie.originalFilename || 'selfie.jpg',
        content: selfieContent,
        contentType: 'image/jpeg'
      });
    }

    // Configurar o email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email || 'gabrielreboucas2001@gmail.com',
      subject: `Formulário de Identificação - ${nome}`,
      html: `
        <h2>Novo formulário de identificação</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>CPF:</strong> ${cpf}</p>
        <p><strong>Idade:</strong> ${idade}</p>
        <p><strong>Data de envio:</strong> ${new Date().toLocaleString('pt-BR')}</p>
        <p><strong>Documentos anexados:</strong></p>
        <ul>
          ${frente ? '<li>Frente do documento</li>' : ''}
          ${verso ? '<li>Verso do documento</li>' : ''}
          ${selfie ? '<li>Selfie com documento</li>' : ''}
        </ul>
      `,
      attachments,
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

    // Limpar arquivos temporários
    if (frente) fs.unlinkSync(frente.filepath);
    if (verso) fs.unlinkSync(verso.filepath);
    if (selfie) fs.unlinkSync(selfie.filepath);

    res.status(200).json({ success: true, message: 'Email enviado com sucesso' });
  } catch (error) {
    console.error('Erro ao processar o formulário:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}