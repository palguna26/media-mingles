export type Testimonial = { quote: string; name: string; role: string; company: string; isSample: boolean; isVerified: boolean };
export const testimonials: Testimonial[] = [
  { quote: "They made every channel feel like one clear brand, not five disconnected campaigns.", name: "Illustrative client", role: "Marketing lead", company: "Sample company", isSample: true, isVerified: false },
  { quote: "The team brought strategy and production into the same conversation. Decisions became much faster.", name: "Illustrative client", role: "Founder", company: "Sample company", isSample: true, isVerified: false },
];
