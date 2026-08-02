import { Resend } from "resend";

const attempts = new Map<string, number[]>();
export function isRateLimited(key: string) { const now = Date.now(); const recent = (attempts.get(key) ?? []).filter(time => now - time < 60_000); recent.push(now); attempts.set(key, recent); return recent.length > 4; }

export async function sendLead(subject: string, fields: Record<string, string | undefined>) {
  const apiKey = process.env.RESEND_API_KEY; const to = process.env.CONTACT_TO_EMAIL; const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) throw new Error("Email delivery is not configured");
  const text = Object.entries(fields).filter(([, value]) => value).map(([key, value]) => `${key}: ${value}`).join("\n");
  const { error } = await new Resend(apiKey).emails.send({ from, to, subject, text });
  if (error) throw new Error(error.message);
}
