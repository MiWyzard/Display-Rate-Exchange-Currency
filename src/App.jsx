import React, { useEffect, useState } from "react";
import { getRates } from "./api/endpoints";
import "./App.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRates().then((data) => {
      if (data) {
        setRates(data.rates);
      } else {
        setError("Failed to fetch rates");
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <h1>Loading...</h1>
      </div>
    );
  }
  if (error) return <h1>{error}</h1>;

  return (
    <div className="container">
      {/* Header Section */}
      <header className="header">
        <h2>Display Rate Exchange Currency</h2>
      </header>

      {/* Summary Section (Optional) */}
      <section className="summary">
        <div className="summary-card">
          <h2>Total Currencies</h2>
          <p>{Object.keys(rates).length}</p>
        </div>
        <div className="summary-card">
          <h2>Base Currency</h2>
          <p>USD</p> 
        </div>
      </section>

      {/* Currency Rate Table */}
      <section className="currency-table-container">
        <table className="currency-table">
          <thead>
            <tr className="table-header">
              <th>Currency</th>
              <th>We Buy</th>
              <th>Exchange Rate</th>
              <th>We Sell</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(rates).map((currency, index) => {
              return (
                <tr key={index} className="table-row">
                  <td>{currency}</td>
                  <td>{(Number(rates[currency]) * 1.02).toFixed(4)}</td>
                  <td>{Number(rates[currency]).toFixed(4)}</td>
                  <td>{(Number(rates[currency]) * 0.98).toFixed(4)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Currency data provided by <a href="https://currencyfreaks.com">CurrencyFreaks API</a></p>
      </footer>
    </div>
  );
}

export default App;
