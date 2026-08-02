"use client";

import { useEffect, useState } from "react";

export function PageIntro() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1900);
    return () => window.clearTimeout(timer);
  }, []);
  if (!visible) return null;
  return <div className="page-intro" aria-hidden="true"><div><strong>Media Mingles</strong><span>Strategy.</span><span>Culture.</span><span>Impact.</span></div></div>;
}
