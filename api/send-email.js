# 🚀 SIMPLE FIX - Just 2 Files!

## The problem:
Your structure was too complicated. Let's simplify it!

---

## ✅ DELETE EVERYTHING AND START FRESH:

### Step 1: Delete old files in GitHub
1. Go to your GitHub repo
2. Delete these files (you don't need them):
   - ❌ `pages/index.jsx`
   - ❌ `package.json`
   - ❌ `vercel.json`
   - ❌ `api/send-email.js`

### Step 2: Create NEW files

#### FILE 1: `index.html` (in root folder)
1. Click **"Add file"** → **"Create new file"**
2. Name: `index.html`
3. Copy code from: `index-simple.html` (the file I created)
4. Paste everything
5. **"Commit changes"**

#### FILE 2: `api/send-email.js` (backend function)
1. Click **"Add file"** → **"Create new file"**
2. Name: `api/send-email.js`
3. Paste this code:

```javascript
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

  if (!customerName || !customerPhone || !carBrand || !carModel) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const data = await resend.emails.send({
      from: 'Импорт Авто <onboarding@resend.dev>',
      to: 'timfesc@gmail.com',
      subject: `Новая заявка: ${carYear} ${carBrand} ${carModel}`,
      text: `
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
      `,
    });

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      data: data
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
}
```

4. **"Commit changes"**

---

## ✅ YOUR FINAL GITHUB STRUCTURE:

```
car-sales-app/
├── index.html           ← Main website
├── api/
│   └── send-email.js   ← Email function
└── README.md           ← (optional)
```

That's it! Only 2 files! 🎉

---

## ⏳ THEN WAIT FOR VERCEL TO DEPLOY:

1. Go to Vercel
2. Wait 2-3 minutes
3. You should see green checkmark ✅

---

## ✅ TEST IT:

1. Open your Vercel URL
2. Fill form
3. Submit
4. Check email! 📧

---

**Do this now!** 🚀
