// api/send-email.js
// This goes in your project's api folder

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

  // Validate required fields
  if (!customerName || !customerPhone || !carBrand || !carModel) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const emailContent = `
Новая заявка на покупку автомобиля

Информация о покупателе:
- Имя: ${customerName}
- Телефон: ${customerPhone}

Выбор автомобиля:
- Марка: ${carBrand}
- Модель: ${carModel}
- Год: ${carYear}
- Цвет: ${carColor}

Время отправки: ${submissionTime}
    `;

    const data = await resend.emails.send({
      from: 'Импорт Авто <onboarding@resend.dev>',
      to: 'timfesc@gmail.com',
      subject: `Новая заявка: ${carYear} ${carBrand} ${carModel}`,
      text: emailContent,
    });

    console.log('Email sent:', data);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      data: data
    });

  } catch (error) {
    console.error('Error sending email:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
}
