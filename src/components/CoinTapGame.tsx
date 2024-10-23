import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

// Vibrate animation for the coin
const vibrate = keyframes`
  0%, 100% { transform: rotate(0deg); }
  20% { transform: rotate(10deg); }
  40% { transform: rotate(-10deg); }
  60% { transform: rotate(10deg); }
  80% { transform: rotate(-10deg); }
`;

// Styles
const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1a1a1a;
  color: white;
  position: relative;
`;

const CoinImage = styled(motion.img)<{ isTapped: boolean }>`
  width: 150px;
  height: 150px;
  animation: ${(props) => (props.isTapped ? vibrate : "none")} 0.2s ease-in-out;
  cursor: pointer;
`;

const TransactionButton = styled(motion.div)`
  background: linear-gradient(45deg, #ffd700, #ffec8b);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  margin-bottom: 20px;
`;

const Bubble = styled(motion.div)`
  position: absolute;
  color: #ffd700;
  font-size: 24px;
  font-weight: bold;
  pointer-events: none;
`;

interface BubbleData {
  id: number;
  direction: string; // Different directions for the bubbles
}

const directions = [
  { x: 0, y: -100 },  // Up
  { x: 100, y: -50 }, // Up-right
  { x: 100, y: 50 },  // Down-right
  { x: 0, y: 100 },   // Down
  { x: -100, y: 50 }, // Down-left
  { x: -100, y: -50 } // Up-left
];

const CoinTapGame: React.FC = () => {
  const [tapCount, setTapCount] = useState<number>(0);
  const [transactions, setTransactions] = useState<number>(0);
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);

  const handleTap = () => {
    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);

    if (newTapCount >= 10) {
      setTransactions(transactions + 1);
      setTapCount(0);

      // Show 6 +1 bubbles coming from different directions
      const newBubbles = directions.map((_, index) => ({
        id: Date.now() + index,
        direction: index.toString(),
      }));

      setBubbles((prevBubbles) => [...prevBubbles, ...newBubbles]);

      // Remove bubbles after animation ends (2 seconds)
      setTimeout(() => {
        setBubbles((prevBubbles) =>
          prevBubbles.filter((bubble) => !newBubbles.includes(bubble))
        );
      }, 2000);
    }
  };

  return (
    <GameContainer>
      <TransactionButton whileTap={{ scale: 1.1 }}>
        Transactions: {transactions}
      </TransactionButton>

      <CoinImage
        src="/coin.png"
        alt="Coin"
        onClick={handleTap}
        isTapped={tapCount < 10}
        whileTap={{ scale: 0.9 }}
      />

      {/* Render 6 animated +1 bubbles */}
      {bubbles.map((bubble, index) => (
        <Bubble
          key={bubble.id}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: 1, x: directions[index].x, y: directions[index].y }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          +1
        </Bubble>
      ))}
    </GameContainer>
  );
};

export default CoinTapGame;
