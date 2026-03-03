import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loader() {
  const [percent, setPercent] = useState(1);
  const headline = "TECH EARTH".split("");
  const sparks = Array.from({ length: 16 }, (_, index) => index);

  useEffect(() => {
    const durationMs = 3000;
    const startedAt = performance.now();
    let frameId = 0;

    const tick = (now) => {
      const elapsed = now - startedAt;
      const nextPercent = Math.min(100, Math.floor(1 + (elapsed / durationMs) * 99));

      setPercent(nextPercent);

      if (nextPercent < 100) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="loader-container">
      <div className="loader-scene" aria-hidden="true">
        <motion.div
          className="loader-energy-core"
          animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="loader-orbit orbit-one" />
        <span className="loader-orbit orbit-two" />
        <span className="loader-orbit orbit-three" />

        <div className="loader-sparks">
          {sparks.map((spark) => (
            <span key={spark} className="loader-spark" style={{ "--i": spark }} />
          ))}
        </div>
      </div>

      <motion.h1
        className="loader-title"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {headline.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            className="loader-letter"
            animate={{ y: [0, -6, 0], opacity: [0.75, 1, 0.85] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: index * 0.08,
              ease: "easeInOut",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        className="loader-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.25 }}
      >
        Initializing Knowledge Universe...
      </motion.p>

      <div className="loader-progress-wrap">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percent}%` }} />
          <span className="progress-scan" />
        </div>
        <span className="loader-percent">{percent}%</span>
      </div>
    </div>
  );
}