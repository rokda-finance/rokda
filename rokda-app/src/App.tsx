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

const realEstateHeaders = ['Property', 'Location', 'Value', 'Rental Income'];
const realEstateData = [
  ['Apartment', 'Mumbai', '1,00,00,000', '50,000'],
  ['Villa', 'Bangalore', '2,50,00,000', '1,00,000'],
];

const criptoHeaders = ['Coin', 'Symbol', 'Quantity', 'Current Value', 'Buy Price', 'Market Price', 'Unrealised PnL', 'Unrealised PnL %'];
const criptoData = [
  ['Bitcoin', 'BTC', '2', '5,000,000', '2,000,000', '2,500,000', '1,000,000', '20'],
  ['Ethereum', 'ETH', '10', '2,000,000', '150,000', '200,000', '500,000', '33.3'],
];

const bullionHeaders = ['Metal', 'Quantity (g)', 'Current Value', 'Buy Price', 'Market Price', 'Unrealised PnL', 'Unrealised PnL %'];
const bullionData = [
  ['Gold', '100', '6,00,000', '5,00,000', '6,000', '1,00,000', '20'],
  ['Silver', '500', '3,00,000', '2,00,000', '600', '1,00,000', '50'],
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
  const [stocksTableExpanded, setStocksTableExpanded] = useState(false);
  const [realEstateTableExpanded, setRealEstateTableExpanded] = useState(false);
  const [criptoTableExpanded, setCriptoTableExpanded] = useState(false);
  const [bullionTableExpanded, setBullionTableExpanded] = useState(false);

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

  // Calculate Net Asset Values
  const stocksNetAssetValue = data.reduce((sum, row) => sum + (parseFloat(row[4].toString().replace(/,/g, '')) || 0), 0);
  const realEstateNetAssetValue = realEstateData.reduce((sum, row) => sum + (parseFloat(row[2].toString().replace(/,/g, '')) || 0), 0);
  const criptoNetAssetValue = criptoData.reduce((sum, row) => sum + (parseFloat(row[3].toString().replace(/,/g, '')) || 0), 0);
  const bullionNetAssetValue = bullionData.reduce((sum, row) => sum + (parseFloat(row[2].toString().replace(/,/g, '')) || 0), 0);

  // NAV history data for the chart
  const navHistoryData = [
    { name: '1M Ago', nav: 1200000 },
    { name: '15D Ago', nav: 1250000 },
    { name: 'Now', nav: 1300000 }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0',
          marginLeft: 0,
        }}>
          <img
            src={require('./res/rokda-logo.svg').default}
            alt="Rokda App Icon"
            className="rokda-logo-img"
          />
          <span className="App-logo">Rokda Finance</span>
        </div>
      </header>
      <div className="App-body">
        <div className='App-menubar'>
          {WatchListButton()}
          <PortfolioButton data={data} />
        </div>
        <div className="App-mainarea">
          <div className="App-portfolio-table-container">
            <div className="App-nav-history-container">
              <div className="App-nav-history-title">Portfolio NAV Over Time</div>
              <div className="App-nav-history-chart">
                {/* Chart fallback if recharts fails */}
                <svg width="100%" height="120" viewBox="0 0 400 120" style={{ background: '#23272f', borderRadius: '1rem' }}>
                  <polyline fill="none" stroke="#ffd700" strokeWidth="4" points="20,100 150,80 280,60 380,40" />
                  <circle cx="20" cy="100" r="6" fill="#ffd700" />
                  <circle cx="150" cy="80" r="6" fill="#ffd700" />
                  <circle cx="280" cy="60" r="6" fill="#ffd700" />
                  <circle cx="380" cy="40" r="7" fill="#ffd700" stroke="#197278" strokeWidth="2" />
                  <text x="20" y="115" fill="#b2b2b2" fontSize="13">1M Ago</text>
                  <text x="150" y="115" fill="#b2b2b2" fontSize="13">15D Ago</text>
                  <text x="280" y="115" fill="#b2b2b2" fontSize="13">Now</text>
                </svg>
              </div>
              <div className="App-nav-history-chart-legend">
                <span className="App-nav-history-label">1M Ago</span>
                <span className="App-nav-history-value">₹12,00,000</span>
                <span className="App-nav-history-label">15D Ago</span>
                <span className="App-nav-history-value">₹12,50,000</span>
                <span className="App-nav-history-label">Now</span>
                <span className="App-nav-history-value App-nav-history-current">₹13,00,000</span>
              </div>
            </div>
            <div className="App-portfolio">
              {/* Stocks Table */}
              <div className={`App-portfolio-header${!stocksTableExpanded ? ' collapsed' : ''}`}>
                <h1>Stocks Investment</h1>
                {!stocksTableExpanded && (
                  <div className="App-nav-weightage-group">
                    <span className="App-nav-value">NAV: ₹{stocksNetAssetValue.toLocaleString()}</span>
                    <span className="App-weightage">Weightage: 40%</span>
                  </div>
                )}
                <button className="App-table-toggle" onClick={() => setStocksTableExpanded((prev) => !prev)}>
                  <span className={`App-table-arrow${stocksTableExpanded ? ' expanded' : ''}`}>▶</span>
                </button>
              </div>
              {stocksTableExpanded ? (
                <Table tableHeader={tableHeader} headers={headers} data={data}></Table>
              ) : null}
              {/* Real Estate Table */}
              <div className={`App-portfolio-header${!realEstateTableExpanded ? ' collapsed' : ''}`} style={{marginTop: '2rem'}}>
                <h1>Real Estate</h1>
                {!realEstateTableExpanded && (
                  <div className="App-nav-weightage-group">
                    <span className="App-nav-value">NAV: ₹{realEstateNetAssetValue.toLocaleString()}</span>
                    <span className="App-weightage">Weightage: 30%</span>
                  </div>
                )}
                <button className="App-table-toggle" onClick={() => setRealEstateTableExpanded((prev) => !prev)}>
                  <span className={`App-table-arrow${realEstateTableExpanded ? ' expanded' : ''}`}>▶</span>
                </button>
              </div>
              {realEstateTableExpanded ? (
                <Table tableHeader="" headers={realEstateHeaders} data={realEstateData}></Table>
              ) : null}
              {/* Cripto Table */}
              <div className={`App-portfolio-header${!criptoTableExpanded ? ' collapsed' : ''}`} style={{marginTop: '2rem'}}>
                <h1>Cripto</h1>
                {!criptoTableExpanded && (
                  <div className="App-nav-weightage-group">
                    <span className="App-nav-value">NAV: ₹{criptoNetAssetValue.toLocaleString()}</span>
                    <span className="App-weightage">Weightage: 20%</span>
                  </div>
                )}
                <button className="App-table-toggle" onClick={() => setCriptoTableExpanded((prev) => !prev)}>
                  <span className={`App-table-arrow${criptoTableExpanded ? ' expanded' : ''}`}>▶</span>
                </button>
              </div>
              {criptoTableExpanded ? (
                <Table tableHeader="" headers={criptoHeaders} data={criptoData}></Table>
              ) : null}
              {/* Bullion Table */}
              <div className={`App-portfolio-header${!bullionTableExpanded ? ' collapsed' : ''}`} style={{marginTop: '2rem'}}>
                <h1>Bullion</h1>
                {!bullionTableExpanded && (
                  <div className="App-nav-weightage-group">
                    <span className="App-nav-value">NAV: ₹{bullionNetAssetValue.toLocaleString()}</span>
                    <span className="App-weightage">Weightage: 10%</span>
                  </div>
                )}
                <button className="App-table-toggle" onClick={() => setBullionTableExpanded((prev) => !prev)}>
                  <span className={`App-table-arrow${bullionTableExpanded ? ' expanded' : ''}`}>▶</span>
                </button>
              </div>
              {bullionTableExpanded ? (
                <Table tableHeader="" headers={bullionHeaders} data={bullionData}></Table>
              ) : null}
            </div>
          </div>
          <Tools handleFileUpload={handleFileUpload} />
        </div>
      </div>
    </div>
  );
}

export default App;

