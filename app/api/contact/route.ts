import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { servicesDataBySlug } from "@/lib/services-data"
import { siteConfig } from "@/lib/site-config"

// Configuración de SMTP (valores del usuario y valores por defecto)
const SMTP_HOST = process.env.SMTP_HOST || "smtp.hostinger.com"
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465
const SMTP_USER = process.env.SMTP_USER || "estudiostopograficos@topografiapecva.com"
const SMTP_PASS = process.env.SMTP_PASS || "lnl7-txwl-f2ex-rfql"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, service: serviceSlug, message } = body

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Todos los campos obligatorios deben ser completados." },
        { status: 400 }
      )
    }

    const service = servicesDataBySlug.get(serviceSlug)
    const serviceName = service ? service.title : "Otro servicio / Consulta general"

    // Crear el transportador de correo SMTP
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // True para puerto 465 (SSL), false para otros
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })

    // 1. Plantilla de correo para el ADMINISTRADOR (Notificación de Lead)
    const adminMailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Nueva Solicitud de Cotización</title>
        <style>
          body { font-family: sans-serif; background-color: #f6f9fc; color: #333; margin: 0; padding: 20px; }
          .container { max-width: 600px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e1e8ed; overflow: hidden; margin: 0 auto; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
          .header { background-color: #0B1520; color: #ffffff; padding: 24px; text-align: center; border-bottom: 3px solid #4CA649; }
          .header h1 { margin: 0; font-size: 20px; font-weight: bold; }
          .content { padding: 30px; }
          .field-table { w-width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .field-table td { padding: 12px; border-bottom: 1px solid #edf2f7; }
          .field-name { font-weight: bold; color: #4A5568; width: 160px; }
          .field-value { color: #2D3748; }
          .message-box { background-color: #f7fafc; border-left: 4px solid #4CA649; padding: 15px; border-radius: 4px; font-style: italic; color: #4A5568; margin-top: 10px; }
          .footer { background-color: #edf2f7; color: #718096; text-align: center; padding: 16px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>PECVA Topografía - Nueva Solicitud</h1>
          </div>
          <div class="content">
            <p>Se ha recibido una nueva solicitud de cotización a través del formulario de la página web:</p>
            <table class="field-table" width="100%">
              <tr>
                <td class="field-name">Nombre Cliente:</td>
                <td class="field-value">${name}</td>
              </tr>
              <tr>
                <td class="field-name">Teléfono:</td>
                <td class="field-value">${phone}</td>
              </tr>
              <tr>
                <td class="field-name">Correo Electrónico:</td>
                <td class="field-value"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td class="field-name">Servicio Solicitado:</td>
                <td class="field-value"><strong>${serviceName}</strong></td>
              </tr>
            </table>
            
            <p><strong>Descripción del Proyecto / Mensaje:</strong></p>
            <div class="message-box">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <div class="footer">
            Este es un correo automático generado por el sistema de contacto de topografiapecva.com
          </div>
        </div>
      </body>
      </html>
    `

    // 2. Plantilla de correo para el CLIENTE (Confirmación de Recepción con Marca)
    const clientMailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Hemos recibido tu solicitud - PECVA Topografía</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
          .wrapper { width: 100%; table-layout: fixed; background-color: #f8fafc; padding-bottom: 40px; padding-top: 20px; }
          .container { max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02); border: 1px solid #f1f5f9; }
          .header { background-color: #ffffff; padding: 32px 24px; text-align: center; position: relative; }
          .logo-img { display: inline-block; vertical-align: middle; height: 56px; width: 56px; margin-bottom: 12px; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 800; color: #0B1520; letter-spacing: -0.02em; }
          .header p { margin: 4px 0 0 0; font-size: 12px; color: #475569; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 600; }
          .brand-stripe { height: 4px; background: linear-gradient(90deg, #4CA649, #4d688c); }
          .content { padding: 40px 32px; }
          .content h2 { margin: 0 0 16px 0; font-size: 20px; font-weight: 700; color: #0B1520; }
          .content p { font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 20px 0; }
          .summary-card { background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; padding: 20px; margin-bottom: 24px; }
          .summary-card h3 { margin: 0 0 12px 0; font-size: 14px; font-weight: 700; color: #4CA649; text-transform: uppercase; letter-spacing: 0.05em; }
          .summary-item { margin-bottom: 10px; font-size: 14px; }
          .summary-item:last-child { margin-bottom: 0; }
          .summary-label { font-weight: 600; color: #475569; }
          .summary-value { color: #0f172a; }
          .btn-container { text-align: center; margin-top: 28px; margin-bottom: 12px; }
          .btn-whatsapp { display: inline-block; background-color: #25D366; color: #ffffff !important; font-weight: bold; text-decoration: none; padding: 14px 28px; border-radius: 9999px; font-size: 14px; transition: background-color 0.2s; box-shadow: 0 4px 6px rgba(37, 211, 102, 0.2); }
          .footer { background-color: #0B1520; color: #94a3b8; text-align: center; padding: 32px 24px; font-size: 12px; border-top: 1px solid #1e293b; }
          .footer a { color: #4CA649; text-decoration: none; font-weight: 600; }
          .footer-logo { font-size: 14px; font-weight: 700; color: #ffffff; margin-bottom: 8px; }
          .footer-divider { height: 1px; background-color: #1e293b; margin: 16px 0; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="header">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-Byc7z2G5QOHsXI7QXXZMouj9f1HqDM.png" alt="PECVA Logo" class="logo-img" />
              <h1>PECVA Topografía</h1>
              <p>Topografía Profesional</p>
            </div>
            <div class="brand-stripe"></div>
            
            <div class="content">
              <h2>¡Hola, ${name}!</h2>
              <p>Gracias por contactarnos. Hemos recibido con éxito tu solicitud de información y cotización para tu proyecto.</p>
              
              <div class="summary-card">
                <h3>Resumen de tu solicitud</h3>
                <div class="summary-item">
                  <span class="summary-label">Servicio requerido:</span>
                  <span class="summary-value">${serviceName}</span>
                </div>
                <div class="summary-item">
                  <span class="summary-label">Teléfono registrado:</span>
                  <span class="summary-value">${phone}</span>
                </div>
                <div class="summary-item">
                  <span class="summary-label">Mensaje enviado:</span>
                  <div style="margin-top: 6px; padding: 10px; background-color: #ffffff; border-radius: 6px; border: 1px solid #edf2f7; font-size: 13px; color: #64748b; font-style: italic;">
                    ${message.replace(/\n/g, "<br>")}
                  </div>
                </div>
              </div>
              
              <p>Uno de nuestros ingenieros topógrafos evaluará de forma detallada los requerimientos técnicos de tu consulta. Nos pondremos en contacto contigo en breve para brindarte una propuesta económica formal o programar una visita técnica en campo si es necesario.</p>
              
              <p>Si deseas acelerar el proceso o enviarnos planos o escrituras del predio de forma directa, puedes iniciar una conversación instantánea con nosotros a través de WhatsApp:</p>
              
              <div class="btn-container">
                <a href="${siteConfig.whatsappHref}" class="btn-whatsapp" target="_blank">
                  💬 Contactar por WhatsApp de Inmediato
                </a>
              </div>
            </div>
            
            <div class="footer">
              <div class="footer-logo">PECVA Topografía Profesional</div>
              <p>Pitalito, Huila - Cobertura en toda Colombia</p>
              <p>Teléfono: ${siteConfig.phoneDisplay} | Email: ${siteConfig.email}</p>
              <div class="footer-divider"></div>
              <p>Copyright © ${new Date().getFullYear()} PECVA. Todos los derechos reservados.</p>
              <p>Desarrollo web por <a href="https://v1tr0.com/" target="_blank">V1TR0</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    // Enviar correo electrónico al ADMINISTRADOR
    await transporter.sendMail({
      from: `"${name} (Contacto Web)" <${SMTP_USER}>`,
      to: SMTP_USER, // Se notifica al correo de la empresa
      replyTo: email,
      subject: `[Nueva Web] Solicitud de cotización: ${name} (${serviceName})`,
      html: adminMailHtml,
    })

    // Enviar correo electrónico al CLIENTE (Confirmación)
    await transporter.sendMail({
      from: `"PECVA Topografía" <${SMTP_USER}>`,
      to: email, // Correo del cliente
      subject: `Hemos recibido tu solicitud de cotización - PECVA Topografía`,
      html: clientMailHtml,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al enviar correos de contacto:", error)
    return NextResponse.json(
      { error: "Hubo un error al procesar tu solicitud. Por favor intenta de nuevo." },
      { status: 500 }
    )
  }
}
