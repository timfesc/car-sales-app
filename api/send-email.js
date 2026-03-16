export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {
    customerName,
    customerPhone,
    carBrand,
    carModel,
    carYear,
    carColor,
    submissionTime
  } = req.body;

  if (!customerName || !customerPhone || !carBrand || !carModel) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ message: 'API key not configured' });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'timfesc@gmail.com',
        subject: `Новая заявка: ${carYear} ${carBrand} ${carModel}`,
        html: `
<h2>Новая заявка на покупку автомобиля</h2>
<p><strong>Информация о покупателе:</strong></p>
<ul>
  <li>Имя: ${customerName}</li>
  <li>Телефон: ${customerPhone}</li>
</ul>
<p><strong>Выбор автомобиля:</strong></p>
<ul>
  <li>Марка: ${carBrand}</li>
  <li>Модель: ${carModel}</li>
  <li>Год: ${carYear}</li>
  <li>Цвет: ${carColor}</li>
</ul>
<p>Время отправки: ${submissionTime}</p>
        `
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        message: 'Failed to send email',
        error: data
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
}
