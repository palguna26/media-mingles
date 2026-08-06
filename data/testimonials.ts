export type Testimonial = { quote: string; name: string; role: string; company: string; isSample: boolean; isVerified: boolean };
export const testimonials: Testimonial[] = [
  { quote: "They made every channel feel like one clear brand, not five disconnected campaigns.", name: "Illustrative client", role: "Marketing lead", company: "Sample company", isSample: true, isVerified: false },
  { quote: "The team brought strategy and production into the same conversation. Decisions became much faster.", name: "Illustrative client", role: "Founder", company: "Sample company", isSample: true, isVerified: false },
  { quote: "The content looked premium, but more importantly it gave our team a clear direction for every channel.", name: "Illustrative client", role: "Brand manager", company: "Sample company", isSample: true, isVerified: false },
  { quote: "From creator selection to final delivery, there was one team accountable for the work and the result.", name: "Illustrative client", role: "Business owner", company: "Sample company", isSample: true, isVerified: false },
];
