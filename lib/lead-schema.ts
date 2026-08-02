import { z } from "zod";
import { serviceOptions } from "@/data/site";

const service = z.enum(serviceOptions);
const base = { name: z.string().trim().min(2).max(100), email: z.string().trim().email().max(160), service, website: z.string().max(0).optional() };
export const auditSchema = z.object({ ...base, brand: z.string().trim().max(200).optional() });
export const contactSchema = z.object({ ...base, phone: z.string().trim().max(30).optional(), message: z.string().trim().min(10).max(2000) });
export type AuditRequest = z.infer<typeof auditSchema>;
export type ContactRequest = z.infer<typeof contactSchema>;
