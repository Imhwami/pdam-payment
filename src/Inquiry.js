import React, { useState } from 'react';

function Inquiry({ setPaymentData }) {
  const [pdam, setPdam] = useState('');
  const [idpel, setIdpel] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inquiryResult, setInquiryResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const headers = {
      method: 'fastpay.inq',
      uid: 'SP300203',
      pin: '893456',
      idpel1: idpel,
      idpel2: '',
      idpel3: '',
      kode_produk: pdam === 'sidoarjo' ? 'WASDA' : 'WABONDO',
      ref1: 'testingfullstackdev',
    };

    try {
        const response = await fetch('https://c-dev-partnerlink.rajabiller.com/json/index.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(headers),
        });
      
        const data = await response.json();
      
        console.log('Response:', data); // Log the response
      
        if (data.rc === '00') {
          setInquiryResult(data.data);
          setPaymentData(data.data);
        } else {
          console.error('API Error:', data); // Log any API error
          setError(`Inquiry failed: ${data.ket}`);
        }
      } catch (err) {
        console.error('Fetch Error:', err); // Log the actual error
        setError('Error occurred while fetching data.');
      }
      
  return (
    <div>
      <h2>Inquiry Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pdam">Nama PDAM:</label>
        <select id="pdam" value={pdam} onChange={(e) => setPdam(e.target.value)} required>
          <option value="">Pilih PDAM</option>
          <option value="sidoarjo">PDAM Sidoarjo</option>
          <option value="bondowoso">PDAM Bondowoso</option>
        </select>

        <label htmlFor="idpel">ID Pelanggan:</label>
        <input
          type="text"
          id="idpel"
          value={idpel}
          onChange={(e) => setIdpel(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>Inquiry</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {inquiryResult && (
        <div>
          <h3>Inquiry Result</h3>
          <p>ID Pelanggan: {inquiryResult.idpel}</p>
          <p>Alamat: {inquiryResult.alamat}</p>
          <p>Total Bayar: {inquiryResult.total_bayar}</p>
        </div>
      )}
    </div>
  );
}

export default Inquiry;
