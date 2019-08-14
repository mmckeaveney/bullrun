import React from 'react';
import NotificationsBar from './components/NotificationsBar';
import FinanceGrid from './components/FinanceGrid';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <span>
          BullRun 🐂
        </span>
      </header>
      <main className="App__container">
        <FinanceGrid />
        <NotificationsBar />
      </main>
    </div>
  );
}

export default App;
