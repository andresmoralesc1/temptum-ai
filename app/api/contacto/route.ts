import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

export const runtime = 'nodejs';

const ContactoSchema = z.object({
  nombre: z.string().trim().min(2, 'Indique su nombre.').max(120),
  organizacion: z.string().trim().max(160).optional().default(''),
  email: z.string().trim().email('Correo electrónico no válido.'),
  mensaje: z
    .string()
    .trim()
    .min(10, 'El mensaje debe tener al menos 10 caracteres.')
    .max(4000),
});

type Payload = z.infer<typeof ContactoSchema>;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Cuerpo de la solicitud no es JSON válido.' },
      { status: 400 },
    );
  }

  const parsed = ContactoSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first?.message ?? 'Datos inválidos.' },
      { status: 422 },
    );
  }

  const data: Payload = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || 'info@temptum.io';
  const from = process.env.CONTACT_FROM_EMAIL || 'no-reply@temptum.io';

  if (!apiKey) {
    console.error('[contacto] RESEND_API_KEY no configurada.');
    return NextResponse.json(
      { error: 'Servicio de correo no disponible en este momento.' },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const subject = `Nuevo mensaje de contacto — ${data.nombre}`;
  const html = `
    <h1>Nuevo mensaje desde el sitio web</h1>
    <p><strong>Nombre:</strong> ${escapeHtml(data.nombre)}</p>
    <p><strong>Organización:</strong> ${escapeHtml(data.organizacion || '—')}</p>
    <p><strong>Correo:</strong> ${escapeHtml(data.email)}</p>
    <hr />
    <p style="white-space:pre-wrap">${escapeHtml(data.mensaje)}</p>
  `;
  const text = [
    'Nuevo mensaje desde el sitio web',
    '',
    `Nombre: ${data.nombre}`,
    `Organización: ${data.organizacion || '—'}`,
    `Correo: ${data.email}`,
    '',
    'Mensaje:',
    data.mensaje,
  ].join('\n');

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject,
      html,
      text,
    });
    if (error) {
      console.error('[contacto] Resend error:', error);
      return NextResponse.json(
        { error: 'No fue posible enviar el mensaje.' },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error('[contacto] Resend exception:', err);
    return NextResponse.json(
      { error: 'No fue posible enviar el mensaje.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
