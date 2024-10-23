import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

// Vibrate animation (will only play while tap count is less than 10)
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
  position: relative; /* To position bubbles */
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
  pointer-events: none; /* Prevent bubble from receiving pointer events */
`;

interface BubbleData {
  id: number;
  y: number;
}

const CoinTapGame: React.FC = () => {
  const [tapCount, setTapCount] = useState<number>(0);
  const [transactions, setTransactions] = useState<number>(0);
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);

  const handleTap = () => {
    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);

    // Vibrate the coin as long as the tap count is less than 10
    if (newTapCount >= 10) {
      setTransactions(transactions + 1);
      setTapCount(0);

      // Show +1 bubble only when transaction is done (after 10 taps)
      const newBubble: BubbleData = {
        id: Date.now(),
        y: Math.random() * 100 - 50, // Randomize vertical position slightly
      };
      setBubbles((prevBubbles) => [...prevBubbles, newBubble]);

      // Remove bubble after animation ends (2 seconds)
      setTimeout(() => {
        setBubbles((prevBubbles) =>
          prevBubbles.filter((bubble) => bubble.id !== newBubble.id)
        );
      }, 2000); // Duration of the animation
    }
  };

  return (
    <GameContainer>
      <TransactionButton whileTap={{ scale: 1.1 }}>
        Transactions: {transactions}
      </TransactionButton>

      {/* Coin with vibrate effect when tapped */}
      <CoinImage
        src="/coin.png" // Ensure the path is correct
        alt="Coin"
        onClick={handleTap}
        isTapped={tapCount < 10} // Vibrate until tap count reaches 10
        whileTap={{ scale: 0.9 }}
      />

      {/* Render animated +1 bubbles */}
      {bubbles.map((bubble) => (
        <Bubble
          key={bubble.id}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: bubble.y - 50 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            left: "50%",
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
