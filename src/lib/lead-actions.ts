"use server";

export type LeadFormState = {
  ok: boolean;
  message: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitLead(
  developmentSlug: string,
  developmentName: string,
  _previousState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const whatsapp = String(formData.get("whatsapp") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const interest = String(formData.get("interest") ?? "morar").trim();

  if (!name || !whatsapp) {
    return { ok: false, message: "Informe seu nome e WhatsApp para continuar." };
  }

  if (!email || !emailRegex.test(email)) {
    return { ok: false, message: "Informe um e-mail válido." };
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  const apiToken = process.env.N8N_API_TOKEN;

  if (!webhookUrl) {
    console.warn("N8N_WEBHOOK_URL não configurado. Lead não enviado.", { name, whatsapp });
    return { ok: true, message: "Recebemos seu interesse. Em breve entraremos em contato." };
  }

  const payload = {
    nome: name,
    whatsapp,
    email,
    interesse: interest,
    empreendimento_slug: developmentSlug,
    empreendimento_nome: developmentName,
    origem: "landing_page",
    recebido_em: new Date().toISOString(),
  };

  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (apiToken) headers["x-api-key"] = apiToken;

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "<sem-conteúdo>");
      console.error("n8n webhook retornou erro", response.status, text);
      return { ok: false, message: "Não foi possível registrar agora. Tente pelo WhatsApp." };
    }
  } catch (error) {
    console.error("Falha ao enviar lead para n8n", error);
    return { ok: false, message: "Não foi possível registrar agora. Tente pelo WhatsApp." };
  }

  return { ok: true, message: "Recebemos seu interesse. Em breve entraremos em contato." };
}
