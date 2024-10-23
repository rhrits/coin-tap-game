import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

// Vibrate animation
const vibrate = keyframes`
  0%, 100% { transform: rotate(0deg); }
  20% { transform: rotate(10deg); }
  40% { transform: rotate(-10deg); }
  60% { transform: rotate(10deg); }
  80% { transform: rotate(-10deg); }
`;

// Styles for dark theme, coin, and transaction counter
const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1a1a1a;
  color: white;
`;

const CoinImage = styled(motion.img)`
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffd700;
  font-size: 24px;
  font-weight: bold;
`;

export default function CoinTapGame() {
  const [tapCount, setTapCount] = useState(0);
  const [transactions, setTransactions] = useState(0);
  const [showBubble, setShowBubble] = useState(false);

  const handleTap = () => {
    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);

    // Show animation bubble after 10 taps
    if (newTapCount >= 10) {
      setTransactions(transactions + 1);
      setTapCount(0); // Reset tap count

      // Show bubble animation
      setShowBubble(true);
      setTimeout(() => {
        setShowBubble(false);
      }, 1000);
    }
  };

  return (
    <GameContainer>
      <TransactionButton whileTap={{ scale: 1.1 }}>
        Transactions: {transactions}
      </TransactionButton>

      <CoinImage
        src="/coin.png" // replace with your coin image
        alt="Coin"
        onClick={handleTap}
        isTapped={tapCount > 0}
        whileTap={{ scale: 0.9 }}
      />

      {showBubble && (
        <Bubble
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -50 }}
          exit={{ opacity: 0 }}
        >
          +1
        </Bubble>
      )}
    </GameContainer>
  );
}
