import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const WaveGrid = () => {
  const rows = 15;
  const cols = 20;
  const waveWidth = 6;
  const [activeColumn, setActiveColumn] = useState(-waveWidth);
  const [waveColor, setWaveColor] = useState("#0000FF");
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    let column = -waveWidth;
    let currentDirection = 1;

    const waveInterval = setInterval(() => {
      if (currentDirection === 1 && column + waveWidth >= cols) {
        currentDirection = -1;
        setDirection(-1);
      }
      else if (currentDirection === -1 && column <= 0) {
        currentDirection = 1;
        setDirection(1);
      }

      setActiveColumn(column);
      column += currentDirection;
    }, 100);

    return () => clearInterval(waveInterval);
  }, [cols, waveWidth]);

  useEffect(() => {
    const colorInterval = setInterval(() => {
      const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
      setWaveColor(randomColor);
    }, 2000);

    return () => clearInterval(colorInterval);
  }, []);

  const getShade = (baseColor, index) => {
    const shadeFactor = 0.1;
    const [r, g, b] = baseColor.match(/\w\w/g).map((hex) => parseInt(hex, 16));
    const lighten = (channel) =>
      Math.min(255, Math.floor(channel + shadeFactor * 255 * (waveWidth - index)));
    return `rgb(${lighten(r)}, ${lighten(g)}, ${lighten(b)})`;
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 30px)`,
        gridTemplateRows: `repeat(${rows}, 30px)`,
        gap: "4px",
        justifyContent: "center",
        alignItems: "center",
        background: "black",
        height: "100vh",
      }}
    >
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => {
          const isActive =
            col >= activeColumn && col < activeColumn + waveWidth;
          const shadeIndex = direction === 1 
            ? col - activeColumn 
            : (waveWidth - 1) - (col - activeColumn);
          const color = isActive ? getShade(waveColor, shadeIndex) : "#333";

          return (
            <motion.div
              key={`${row}-${col}`}
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: color,
              }}
              animate={{}}
            />
          );
        })
      )}
    </div>
  );
};

export default WaveGrid;