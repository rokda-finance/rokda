import React, { useState } from 'react';
import './Style';
import Table from './Components/table/Table';
import WatchList from './Components/watchlist/WatchList';
import Tools from './Components/Tools';

const tableHeader = "Stocks-(India)";
const headers = ['Name', 'Symbol', 'Quantity', 'Net Cost', 'Current net value', 'Avg. buy price', 'Market price', 'Unrealised PnL', 'Unrealised PnL %'];

const initialData = [
  ['ITC Ltd', 'ITC', '30', '100000', '150000', '220', '430', '50000', '50'],
  ['Central Depository Services (India) Ltd', 'CDSL', '100', '200000', '550000', '220', '430', '50000', '-50'],
  ['Hindustan Unilever Ltd', 'HINDUNILVR', '30', '100000', '150000', '220', '430', '50000', '50'],
  ['Godrej Consumer Products Ltd', 'GODREJCP', '30', '100000', '150000', '220', '430', '50000', '100'],
  ['Dabur India Ltd', 'DABUR', '30', '100000', '150000', '220', '430', '50000', '30'],
  ['Cupid Ltd', 'CUPID', '30', '100000', '150000', '220', '430', '50000', '-3.00'],
  ['Colgate-Palmolive (India) Ltd', 'COLPAL', '30', '100000', '150000', '220', '430', '50000', '50'],
  ['Jyothy Labs Ltd', 'JYOTHYLAB', '30', '100000', '150000', '220', '430', '50000', '-20']
];

const stocksData = [
  {
    symbol: 'ITC',
    lastPrice: 100,
    change: 10,
    changePercentage: 10
  },
  {
    symbol: 'HDFC',
    lastPrice: 100,
    change: 10,
    changePercentage: 10
  }
];

const WatchListButton = () => {
  const [watchlistVisible, setWatchlistVisible] = useState(false);

  const onClick = () => {
    setWatchlistVisible(!watchlistVisible);
  };

  return (
    <>
      <div className='App-menubar-item' title='Toggle Watchlist'>
        <button className='App-menubar-button' onClick={() => onClick()}>
          <img width="35px" height="35px" src={require("./icons/list-icon.svg").default} alt="Watchlist" />
        </button>
      </div>

      <div
        className={`watchlist_container_expandable ${watchlistVisible ? 'expanded' : 'collapsed'}`}
        style={{
          position: 'absolute',
          top: '6vh', // Further adjusted to leave even less space from the top
          left: '6vh', // Leaves space for buttons
          height: 'calc(100% - 6vh)', // Adjust height to account for adjusted top space
          width: watchlistVisible ? '30%' : '0',
          overflow: 'hidden',
          backgroundColor: '#1e1e1e',
          zIndex: 1,
          transition: 'width 0.3s ease-in-out',
        }}
      >
        {watchlistVisible && <WatchList stocks={stocksData} />}
      </div>
    </>
  );
};

const PortfolioButton = ({ data }: { data: string[][] }) => {
  const [portfolioVisible, setPortfolioVisible] = useState(true);

  const onClick = () => {
    setPortfolioVisible(!portfolioVisible);
  };

  return (
    <>
      <div className='App-menubar-item' title='Toggle Portfolio'>
        <button className='App-menubar-button' onClick={() => onClick()}>
          <img width="35px" height="35px" src={require("./icons/portfolio-icon.svg").default} alt="Portfolio" />
        </button>
      </div>
    </>
  );
};

function App() {
  const [data, setData] = useState(initialData);
  const [portfolioVisible, setPortfolioVisible] = useState(true);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);
          if (Array.isArray(jsonData)) {
            setData(jsonData);
          } else {
            alert("Invalid JSON format. Please upload an array of stock data.");
          }
        } catch (error) {
          alert("Error reading JSON file. Please ensure it is properly formatted.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">{"Rokda"}</div>
      </header>
      
      <div className="App-body">
      <div className='App-menubar'>
        {WatchListButton()}
        <PortfolioButton data={data} />
      </div>
        <div className="App-mainarea">
          <div className="App-portfolio">
            <h1 style={{ fontSize: '1.5rem', textAlign: 'center', margin: '1rem auto' }}>Portfolio Holding</h1>
            {portfolioVisible && (
              <Table tableHeader={tableHeader} headers={headers} data={data}></Table>
            )}
          </div>
          <Tools handleFileUpload={handleFileUpload} />
        </div>
      </div>
    </div>
  );
}

export default App;

