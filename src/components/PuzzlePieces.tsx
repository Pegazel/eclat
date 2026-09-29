import { useEffect, useState } from "react";

interface PuzzlePiece {
  id: number;
  color: string;
  size: number;
  x: number;
  y: number;
  rotation: number;
  animationDelay: number;
  shapeType: number; // 0-3 for different puzzle piece shapes
}

const colorPalette = [
  '#E08B6D',   // Corail
  '#8CC5C5',   // Bleu Ciel/Turquoise
  '#E8A962',   // Orange Aurore
  '#E5A8A8',   // Rose Douceur
  '#8FA58B',   // Vert de Gris
];

const generatePieces = (): PuzzlePiece[] => {
  const pieces: PuzzlePiece[] = [];
  
  // Positions on the edges only - away from center content
  const positions = [
    // Top edge - spread out
    { x: 2, y: 2 }, { x: 12, y: 4 }, { x: 88, y: 3 }, { x: 96, y: 5 },
    // Bottom edge
    { x: 3, y: 92 }, { x: 15, y: 95 }, { x: 85, y: 93 }, { x: 95, y: 90 },
    // Left edge
    { x: 1, y: 25 }, { x: 3, y: 50 }, { x: 2, y: 75 },
    // Right edge
    { x: 96, y: 20 }, { x: 98, y: 45 }, { x: 95, y: 70 },
  ];

  positions.forEach((pos, index) => {
    pieces.push({
      id: index,
      color: colorPalette[index % colorPalette.length],
      size: 40 + Math.random() * 30,
      x: pos.x,
      y: pos.y,
      rotation: Math.random() * 360,
      animationDelay: Math.random() * 3,
      shapeType: Math.floor(Math.random() * 4),
    });
  });

  return pieces;
};

// SVG paths for different puzzle piece shapes matching the pattern
const puzzleShapes = [
  // Shape 1: Tab on top, hole on right
  "M 20 0 C 20 -12 40 -12 40 0 L 40 0 L 60 0 C 60 0 60 20 72 20 C 60 20 60 40 60 40 L 60 60 C 40 60 40 72 30 72 C 20 72 20 60 0 60 L 0 40 C 12 40 12 20 0 20 L 0 0 Z",
  // Shape 2: Tabs on top and bottom
  "M 20 0 C 20 -12 40 -12 40 0 L 60 0 L 60 20 C 72 20 72 40 60 40 L 60 60 C 40 60 40 72 30 72 C 20 72 20 60 0 60 L 0 40 L 0 0 Z",
  // Shape 3: Simple with one tab
  "M 0 0 L 20 0 C 20 -12 40 -12 40 0 L 60 0 L 60 60 L 0 60 L 0 40 C -12 40 -12 20 0 20 Z",
  // Shape 4: Two holes
  "M 0 0 L 60 0 L 60 20 C 48 20 48 40 60 40 L 60 60 L 40 60 C 40 72 20 72 20 60 L 0 60 L 0 0 Z",
];

const PuzzlePieces = () => {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);

  useEffect(() => {
    setPieces(generatePieces());
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-puzzle-float"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            transform: `rotate(${piece.rotation}deg)`,
            animationDelay: `${piece.animationDelay}s`,
            opacity: 0.85,
          }}
        >
          <svg
            viewBox="-15 -15 90 90"
            className="w-full h-full"
            style={{ filter: `drop-shadow(2px 4px 6px rgba(0,0,0,0.1))` }}
          >
            <path
              d={puzzleShapes[piece.shapeType]}
              fill={piece.color}
              strokeWidth="0"
            />
          </svg>
        </div>
      ))}

      {/* Floating sparkles - kept as they add nice effect */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute animate-sparkle-float"
          style={{
            left: `${5 + Math.random() * 90}%`,
            top: `${5 + Math.random() * 90}%`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        >
          <svg className="w-3 h-3 text-accent" viewBox="0 0 24 24" fill="currentColor" opacity="0.6">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default PuzzlePieces;
