export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.temptum.io'
).replace(/\/$/, '');

export const SITE_DESCRIPTION =
  'Centro especializado en Colombia en corporate & government affairs. Acompañamos a empresas reguladas, equipos legales y de cumplimiento en escenarios donde la decisión tiene que sostenerse ante un regulador, un juez o la opinión pública.';
