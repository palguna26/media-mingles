"use client";

import { Maximize, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Showreel() {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const syncMuteState = () => setIsMuted(video.current?.muted ?? true);
    const currentFrame = frame.current;
    document.addEventListener("fullscreenchange", syncMuteState);
    currentFrame?.addEventListener("fullscreenchange", syncMuteState);
    return () => {
      document.removeEventListener("fullscreenchange", syncMuteState);
      currentFrame?.removeEventListener("fullscreenchange", syncMuteState);
    };
  }, []);

  const toggleMute = () => {
    if (!video.current) return;
    video.current.muted = !video.current.muted;
    setIsMuted(video.current.muted);
  };

  const openFullscreen = async () => {
    if (!frame.current || document.fullscreenElement) return;
    try {
      await frame.current.requestFullscreen();
    } catch {
      // Fullscreen can be blocked by browser settings.
    }
  };

  return (
    <section className="showreel showreel--video">
      <p className="showreel__ghost" aria-hidden="true">MAKE THEM FEEL IT.</p>
      <div ref={frame} className="showreel__frame">
        <video
          ref={video}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          onClick={openFullscreen}
          aria-label="Media Mingles showreel. Click to view fullscreen."
        >
          <source src="/showreel.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="showreel__controls">
          <span>SHOWREEL / 2026</span>
          <div>
            <button type="button" onClick={toggleMute} aria-label={isMuted ? "Unmute showreel" : "Mute showreel"}>
              {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
              {isMuted ? "Unmute" : "Mute"}
            </button>
            <button type="button" onClick={openFullscreen} aria-label="Open showreel fullscreen">
              <Maximize size={17} />
              Fullscreen
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
