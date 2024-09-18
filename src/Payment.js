import React, { useState } from 'react';

function Payment({ paymentData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const payload = {
      method: 'fastpay.pay',
      uid: 'SP300203',
      pin: '893456',
      idpel1: paymentData.idpel,
      kode_produk: 'PDAM_SIDOARJO', // Ganti sesuai PDAM dari inquiry
      ref1: 'testingfullstackdev',
      nominal: paymentData.nominal,
      ref2: 'someRef2', // Assume ref2 came from inquiry response
    };

    try {
      const response = await fetch('https://c-dev-partnerlink.rajabiller.com/json/index.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (data.rc === '00') {
        setSuccess(true);
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (err) {
      setError('Error occurred during payment.');
    } finally {
      setLoading(false);
    }
  };

  if (!paymentData) {
    return <p>No payment data available. Please perform an inquiry first.</p>;
  }

  return (
    <div>
      <h2>Payment</h2>
      <form onSubmit={handlePayment}>
        <p>ID Pelanggan: {paymentData.idpel}</p>
        <p>Alamat: {paymentData.alamat}</p>
        <p>Total Tagihan: {paymentData.total_bayar}</p>

        <button type="submit" disabled={loading}>Pay</button>
      </form>

      {loading && <p>Processing payment...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Payment successful!</p>}
    </div>
  );
}

export default Payment;
