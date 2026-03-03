import { motion } from "framer-motion";
import { useMemo, useState } from "react";

export default function EntryDoor({ onEnter }) {
  const [open, setOpen] = useState(false);
  const [entering, setEntering] = useState(false);
  const lightSpreadDuration = 1.9;
  const streaks = useMemo(() => Array.from({ length: 20 }, (_, index) => index), []);

  const handleClick = () => {
    if (open) return;

    setOpen(true);

    setTimeout(() => {
      setEntering(true);
    }, 700);

    setTimeout(() => {
      onEnter();
    }, 3200);
  };

  return (
    <div className="door-wrapper">
      <motion.div
        className={`robot-shell ${open ? "active" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <span className="robot-aura" />
        <div className="robot-head">
          <span className="robot-visor" />
          <span className="robot-eye" />
          <span className="robot-eye" />
          <span className="robot-mouth" />
          <span className="robot-antenna" />
        </div>

        <div className="robot-body">
          <div className={`robot-door ${open ? "open" : ""}`}>
            <div className="keyhole"></div>
          </div>

          <span className="robot-panel panel-one" />
          <span className="robot-panel panel-two" />
          <span className="robot-circuit circuit-one" />
          <span className="robot-circuit circuit-two" />
          <span className="robot-circuit circuit-three" />
          <div className="robot-reactor">
            <span className="reactor-ring reactor-ring-one" />
            <span className="reactor-ring reactor-ring-two" />
          </div>
          <span className="robot-core-glow" />
        </div>

        <span className="robot-shoulder shoulder-left" />
        <span className="robot-shoulder shoulder-right" />
        <span className="robot-arm robot-arm-left" />
        <span className="robot-arm robot-arm-right" />
        <span className="robot-leg robot-leg-left" />
        <span className="robot-leg robot-leg-right" />
      </motion.div>

      <motion.button
        className="open-btn"
        onClick={handleClick}
        disabled={open}
        animate={{ opacity: entering ? 0 : 1, y: entering ? 20 : 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {open ? "PORTAL OPENING..." : "UNLOCK THE PORTAL"}
      </motion.button>

      {entering && (
        <>
          <motion.div
            className="portal-vortex"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 2.4, opacity: [0, 0.9, 0.25, 0] }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <motion.div
            className="door-flash-core"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1.5, opacity: [0, 1, 0.4, 0] }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />

          <motion.div
            className="door-zoom-overlay"
            initial={{ clipPath: "circle(0px at 50% 54%)", opacity: 0.2 }}
            animate={{ clipPath: "circle(160vmax at 50% 54%)", opacity: 1 }}
            transition={{ duration: lightSpreadDuration, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.div
            className="door-ring ring-one"
            initial={{ scale: 0.1, opacity: 0.9 }}
            animate={{ scale: 6, opacity: 0 }}
            transition={{ duration: 1.35, ease: "easeOut" }}
          />
          <motion.div
            className="door-ring ring-two"
            initial={{ scale: 0.1, opacity: 0.85 }}
            animate={{ scale: 7.4, opacity: 0 }}
            transition={{ duration: 1.65, delay: 0.12, ease: "easeOut" }}
          />

          <div className="door-streak-field" aria-hidden="true">
            {streaks.map((streak) => (
              <span
                key={streak}
                className="door-streak"
                style={{
                  transform: `rotate(${(360 / streaks.length) * streak}deg)`,
                  animationDelay: `${streak * 0.04}s`,
                }}
              />
            ))}
          </div>

          <div className="transition-shards" aria-hidden="true">
            {streaks.map((shard) => (
              <span
                key={`shard-${shard}`}
                className="transition-shard"
                style={{
                  transform: `rotate(${(360 / streaks.length) * shard}deg)`,
                  animationDelay: `${shard * 0.03}s`,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}