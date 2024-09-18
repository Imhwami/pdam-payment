import React, { useState } from 'react';
import Inquiry from './Inquiry';
import Payment from './Payment';

function App() {
  const [paymentData, setPaymentData] = useState(null);

  return (
    <div className="App">
      <h1>PDAM Payment System</h1>
      <Inquiry setPaymentData={setPaymentData} />
      <Payment paymentData={paymentData} />
    </div>
  );
}

export default App;
