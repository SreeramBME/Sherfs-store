const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// API to send email (cart)
app.post('/send-cart', async (req, res) => {
  const { cartItems } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kit.22bbm053@gmail.com',
      pass: 'Sreeram@2011'
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'owner-email@example.com',
    subject: 'New Cart Order',
    text: Cart Contents:\n\n${JSON.stringify(cartItems, null, 2)}
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send({ message: 'Cart sent to owner!' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to send email' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(Server running on http://localhost:${PORT}));
    function sendCartToOwner(cartItems) {
  fetch('/send-cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cartItems })
  })
  .then(res => res.json())
  .then(data => alert(data.message))
  .catch(err => console.error('Email failed:', err));
}