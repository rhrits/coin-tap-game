import React from 'react';
import CoinTapGame from './components/CoinTapGame'; // Adjust the path if needed

const App: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ color: 'white' }}>Play Game</h1>
      <CoinTapGame />
    </div>
  );
}

export default App;
