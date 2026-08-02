export type MediaTreatment = { fit: "cover" | "contain"; focalPosition: string; aspectRatio: string; alt: string };
export type ShowreelMedia = { poster: string; sources?: { src: string; type: string }[]; captions?: string; duration?: string; available: boolean };
export type MotionPreset = { desktop: number; tablet: number; mobile: number; reducedMotion: number };
export const showreel: ShowreelMedia = { poster: "/media/generated/showreel-poster.png", available: false };
export const motionPreset: MotionPreset = { desktop: 1, tablet: .55, mobile: .2, reducedMotion: 0 };
