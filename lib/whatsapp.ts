import { Appointment, SalonConfig } from './types';
import { SALON } from './config/salon';

export type WhatsAppMessageType =
  | 'cliente'
  | 'barbearia'
  | 'lembrete'
  | 'lembrete_24h'
  | 'lembrete_2h'
  | 'lembrete_15m';

export function formatWhatsAppMessage(
  appointment: Appointment,
  config: SalonConfig,
  type: WhatsAppMessageType = 'cliente'
): string {
  const dataFormatada = new Date(appointment.date + 'T12:00:00').toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const paymentDesc =
    appointment.paymentMethod === 'pix'
      ? 'PIX (Instantâneo)'
      : appointment.paymentMethod === 'cartao' || appointment.paymentMethod === 'credito' || appointment.paymentMethod === 'debito'
      ? 'Cartão de Crédito/Débito'
      : 'Pagamento Presencial no Local';

  const paymentStatusDesc =
    appointment.paymentStatus === 'pago' ? '✅ Pago' : '⏳ Pagamento no balcão';

  const endereco = config.address || SALON.endereco.completo;
  const tolerancia = SALON.regras.toleranciaMinutos;

  // 1. Template de Confirmação do Cliente
  if (type === 'cliente') {
    return (
      `💈 *${SALON.nome.toUpperCase()}* 💈\n\n` +
      `Olá, *${appointment.customerName}*! Seu agendamento foi *CONFIRMADO* no sistema com sucesso!\n\n` +
      `📋 *DETALHES DO ATENDIMENTO:*\n` +
      `✂️ *Serviço:* ${appointment.serviceNames.join(', ')}\n` +
      `👤 *Profissional:* ${appointment.barberName}\n` +
      `📅 *Data:* ${dataFormatada}\n` +
      `⏰ *Horário:* ${appointment.time}\n` +
      `⏱️ *Duração estimada:* ${appointment.totalDurationMinutes} min\n` +
      `💰 *Valor Total:* R$ ${appointment.totalPrice.toFixed(2).replace('.', ',')}\n` +
      `💳 *Forma de Pagamento:* ${paymentDesc} (${paymentStatusDesc})\n\n` +
      `📍 *Localização:* ${endereco}\n` +
      `📌 *Ponto de Referência:* ${SALON.endereco.referencia}\n` +
      `🗺️ *Google Maps:* ${SALON.endereco.googleMaps}\n\n` +
      `⚠️ *REGRAS DE ATENDIMENTO E TOLERÂNCIA:*\n` +
      `• *Tolerância máxima:* Rigorosamente *${tolerancia} minutos*. Por respeito ao próximo cliente, atrasos superiores a ${tolerancia} min cancelam o horário automaticamente.\n` +
      `• *Reagendamento ou cancelamento:* Caso precise alterar, avise com antecedência pelo WhatsApp ou app.\n\n` +
      `☕ Cerveja artesanal gelada e café especial por nossa conta enquanto você aguarda!\n\n` +
      `_Agradecemos a preferência e te esperamos na cadeira!_ 👊💈`
    );
  }

  // 2. Bibe 1 — 24 horas antes
  if (type === 'lembrete_24h') {
    return (
      `🔔 *1º BIBE: SEU HORÁRIO É AMANHÃ!* — ${SALON.nome.toUpperCase()} 💈\n\n` +
      `Fala, *${appointment.customerName}*! Tudo bem?\n\n` +
      `Passando para lembrar que você tem horário marcado conosco *amanhã*:\n\n` +
      `📅 *Data:* ${dataFormatada}\n` +
      `⏰ *Horário:* ${appointment.time}\n` +
      `✂️ *Profissional:* ${appointment.barberName}\n` +
      `💈 *Serviço:* ${appointment.serviceNames.join(', ')}\n\n` +
      `📍 *Local:* ${endereco} (${SALON.endereco.referencia})\n` +
      `🗺️ *Mapa:* ${SALON.endereco.googleMaps}\n\n` +
      `Lembrando que nossa tolerância é de *${tolerancia} minutos*. Se precisar reagendar, nos avise com antecedência!`
    );
  }

  // 3. Bibe 2 — 2 horas antes
  if (type === 'lembrete_2h') {
    return (
      `⏰ *2º BIBE: SEU HORÁRIO É DAQUI A POUCO!* — ${SALON.nome.toUpperCase()} 💈\n\n` +
      `Fala, *${appointment.customerName}*! Seu atendimento é hoje, daqui a aproximadamente 2 horas!\n\n` +
      `⏰ *Horário Marcado:* ${appointment.time}\n` +
      `✂️ *Com:* ${appointment.barberName}\n` +
      `💈 *Serviço:* ${appointment.serviceNames.join(', ')}\n\n` +
      `📍 *Endereço:* ${endereco}\n` +
      `📌 *Referência:* ${SALON.endereco.referencia}\n\n` +
      `Cerveja gelada te esperando. Já vai se organizando para não se atrasar!`
    );
  }

  // 4. Bibe 3 — 15 minutos antes
  if (type === 'lembrete_15m' || type === 'lembrete') {
    return (
      `🚨 *3º BIBE: ÚLTIMO AVISO DE HORÁRIO!* — ${SALON.nome.toUpperCase()} 🚨\n\n` +
      `*${appointment.customerName}*, seu atendimento começa em *15 minutos*!\n\n` +
      `⏰ *Horário:* às *${appointment.time}*\n` +
      `✂️ *Profissional na cadeira:* ${appointment.barberName}\n` +
      `💈 *Serviço:* ${appointment.serviceNames.join(', ')}\n\n` +
      `⚠️ *ATENÇÃO À TOLERÂNCIA DE ${tolerancia} MINUTOS:*\n` +
      `Para garantir a pontualidade de toda a agenda, a tolerância de espera é de no máximo *${tolerancia} minutos* (${appointment.time} + ${tolerancia} min). Após esse período, o sistema libera a vaga para outro cliente.\n\n` +
      `📍 *Local:* ${endereco}\n` +
      `🗺️ *Como Chegar:* ${SALON.endereco.googleMaps}\n\n` +
      `A navalha já está pronta. Estamos te aguardando!`
    );
  }

  // 5. Notificação para o Salão / Barbeiro
  return (
    `🚨 *NOVO AGENDAMENTO NO ${SALON.nome.toUpperCase()}* 🚨\n\n` +
    `👤 *Cliente:* ${appointment.customerName}\n` +
    `📱 *WhatsApp:* ${appointment.customerPhone}\n` +
    `✂️ *Barbeiro:* ${appointment.barberName}\n` +
    `📅 *Data:* ${dataFormatada} às *${appointment.time}*\n` +
    `💈 *Serviços:* ${appointment.serviceNames.join(', ')}\n` +
    `💰 *Valor:* R$ ${appointment.totalPrice.toFixed(2).replace('.', ',')}\n` +
    `💳 *Status Pgto:* ${paymentStatusDesc}\n` +
    (appointment.notes ? `📝 *Observação:* ${appointment.notes}\n` : '') +
    `\n_Favor conferir na escala do painel administrativo._`
  );
}

export function generateWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const formattedPhone = cleanPhone.length <= 11 ? `55${cleanPhone}` : cleanPhone;
  const encodedText = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodedText}`;
}
