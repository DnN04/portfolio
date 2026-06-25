// ARVIO-style 3D rotating cinematic carousel showcase
interface ProjectImages {
  name: string;
  images: string[];
}

interface HolographicShowcaseProps {
  projects: ProjectImages[];
}

export const HolographicShowcase = ({ projects }: HolographicShowcaseProps) => {
  // Dynamically extract only the first (main) screenshot of each project for the 3D hologram
  const cards = projects.map((p) => ({
    src: p.images[0],
    label: p.name,
  }));

  const angleStep = 360 / cards.length;
  const radius = cards.length <= 3 ? "200px" : cards.length === 4 ? "235px" : "260px";

  return (
    <div className="cinematic-container">
      {/* Cinematic Showcase 3D wrapper */}
      <div className="cinematic-showcase">
        <div className="ambient-glow"></div>
        <div className="carousel-track">
          {cards.map((card, i) => {
            const angle = i * angleStep;
            return (
              <div
                key={i}
                className="card-wrapper"
                style={{
                  // Cast style custom properties to any for React TS support
                  ["--a" as any]: `${angle}deg`,
                  ["--r" as any]: radius, // dynamically sized 3D orbit radius
                }}
              >
                <div className="movie-card">
                  <img
                    src={card.src}
                    alt={card.label}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                  <span className="card-cap">{card.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
