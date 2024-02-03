


export  const initiate_order_upi_payment  = ()=>{
  try {
    const { amount, transactionId, shopUpiId } = req.body;

    
    const upiPaymentUrl = `upi://pay?pa=${shopUpiId}&pn=Shop&mc=1234&tid=${transactionId}&tr=${transactionId}&tn=Payment&am=${amount}&cu=INR&url=https://your-website.com/callback`;

    res.json({ upiPaymentUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}





export const order_upi_payment_callback = async () =>{
  const { transactionId, status } = req.body;

  res.json({ status: 'Callback received' });
}







