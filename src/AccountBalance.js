import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AccountBalance(props) {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const account_id = props.AccountId;
  console.log(account_id);
  const api_key = '6814f91cb9090942d48d91b63caa8f9c';
  const url = `http://api.nessieisreal.com/accounts/${account_id}?key=${api_key}`;

  useEffect(() => {
    axios.get(url, { headers: { "Accept": "application/json" } })
      .then(response => {
        setBalance(response.data.balance);
        setLoading(false);
      })
      .catch(error => {
        setError(error.toString());
        setLoading(false);
      });
  }, []);  // The empty array as a second argument ensures this useEffect runs once, similar to componentDidMount()

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      Account Balance: ${balance}
    </div>
  );
}

export default AccountBalance;