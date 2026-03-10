import { useState, useEffect, useMemo } from "react";
import Loader from "./components/Loader";
import EntryDoor from "./components/EntryDoor";
import Home from "./components/Home";
import "./styles/theme.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [entered, setEntered] = useState(false);

  const planets = useMemo(
    () => [
      { id: 1, className: "planet-one" },
      { id: 2, className: "planet-two" },
      { id: 3, className: "planet-three" },
      { id: 4, className: "planet-four" },
    ],
    []
  );

  const binaryStreams = useMemo(
    () =>
      Array.from({ length: 84 }, (_, index) => {
        const moveRight = Math.random() > 0.35;

        return {
          id: index,
          digit: Math.random() > 0.5 ? "1" : "0",
          duration: 18 + Math.random() * 14,
          delay: Math.random() * 10,
          fontSize: 12 + Math.random() * 12,
          opacity: 0.07 + Math.random() * 0.18,
          startX: moveRight
            ? -25 + Math.random() * 55
            : 70 + Math.random() * 50,
          startY: -30 + Math.random() * 70,
          driftX: moveRight
            ? 120 + Math.random() * 25
            : -(120 + Math.random() * 25),
          driftY: 120 + Math.random() * 25,
        };
      }),
    []
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  let currentView = <Home />;

  if (loading) {
    currentView = <Loader />;
  } else if (!entered) {
    currentView = <EntryDoor onEnter={() => setEntered(true)} />;
  }

  return (
    <div className="app-shell">
      <div className="binary-space" aria-hidden="true">
        {!loading &&
          planets.map((planet) => (
            <div
              key={planet.id}
              className={`tech-planet ${planet.className}`}
            >
              <span className="planet-core" />
              <span className="planet-ring" />
              <span className="planet-circuit" />

              {planet.className === "planet-one" && (
                <>
                  <span className="binary-surface">
                    010101011010 0110101 101001 0101010 1101010 011101 0101
                  </span>
                  <div className="planet-robot speaker-a">
                    <span className="robot-avatar">🤖🐱</span>
                    <span className="robot-bubble">Signal clear, buddy?</span>
                  </div>
                </>
              )}

              {planet.className === "planet-two" && (
                <>
                  <div className="robot-duo">
                    <span className="duo-badge">🤖🐱</span>
                    <span className="duo-badge">🤖🐭</span>
                  </div>
                  <div className="planet-robot speaker-b">
                    <span className="robot-avatar">🤖🐭</span>
                    <span className="robot-bubble">Loud and clear. Jump now!</span>
                  </div>
                </>
              )}
            </div>
          ))}

        {!loading && (
          <div className="space-jumper" aria-hidden="true">
            <span className="jumper-body" />
            <span className="jumper-leg" />
            <span className="jumper-leg jumper-leg-two" />
          </div>
        )}

        {!loading &&
          binaryStreams.map((stream) => (
            <span
              key={stream.id}
              className="binary-stream"
              style={{
                animationDuration: `${stream.duration}s`,
                animationDelay: `-${stream.delay}s`,
                fontSize: `${stream.fontSize}px`,
                opacity: stream.opacity,
                "--start-x": `${stream.startX}vw`,
                "--start-y": `${stream.startY}vh`,
                "--drift-x": `${stream.driftX}vw`,
                "--drift-y": `${stream.driftY}vh`,
              }}
            >
              {stream.digit}
            </span>
          ))}
      </div>

      <div className={`app-content ${entered && !loading ? "main-appearing" : ""}`}>
        {currentView}
      </div>
    </div>
  );
}

export default App;