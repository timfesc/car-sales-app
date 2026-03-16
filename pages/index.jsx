import React, { useState } from 'react';
import { Send, Car, CheckCircle } from 'lucide-react';

export default function CarSalesWebsite() {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    customerName: '',
    customerPhone: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ALL brands from Kolesa.kz - NO exclusions
  const brands = [
    'Acura', 'AITO', 'Alfa Romeo', 'Alga', 'Alpina', 'Aston Martin', 'Audi', 'Avatr',
    'BAIC', 'Bentley', 'BMW', 'BYD', 'Cadillac', 'Changan', 'Chery', 'Chevrolet', 'Chrysler',
    'Citroen', 'Daewoo', 'Dodge', 'EXEED', 'FAW', 'Ferrari', 'Ford', 'GAC', 'Geely',
    'Genesis', 'GMC', 'Great Wall', 'Haval', 'Honda', 'Hongqi', 'Hummer', 'Hyundai',
    'Infiniti', 'JAC', 'Jaecoo', 'Jaguar', 'Jeep', 'Jetour', 'Kia', 'Lamborghini',
    'Land Rover', 'Lexus', 'Li Auto (LiXiang)', 'Lifan', 'Lincoln', 'Lotus', 'Maserati',
    'Mazda', 'Mercedes-Benz', 'Mini', 'Mitsubishi', 'Nio', 'Nissan', 'OMODA', 'Opel',
    'Peugeot', 'Porsche', 'RAM', 'Renault', 'Rolls-Royce', 'Skoda', 'SsangYong', 'Subaru',
    'Suzuki', 'Tank', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo', 'Voyah', 'Zeekr',
    'ВАЗ (Lada)', 'ГАЗ', 'КАМАЗ', 'УАЗ'
  ];

  // All models from the provided document
  const modelsByBrand = {
    'Acura': ['CL', 'CSX', 'EL', 'ILX', 'Integra', 'Legend', 'MDX', 'NSX', 'RDX', 'RL', 'RLX', 'RSX', 'SLX', 'TL', 'TLX', 'TSX', 'Vigor', 'ZDX'],
    'AITO': ['M5', 'M7', 'M9'],
    'Alfa Romeo': ['145', '147', '155', '156', '159', '164', '166', 'Brera', 'Giulia', 'Giulietta', 'GT', 'GTV', 'MiTo', 'Spider', 'Stelvio', 'Tonale'],
    'Alga': ['AS6', 'AS7', 'AS9'],
    'Alpina': ['B3', 'B5', 'B7', 'B10', 'B12', 'D3', 'D5', 'XD3', 'XB7'],
    'Aston Martin': ['DB9', 'DB11', 'DBS', 'DBX', 'Rapide', 'V8 Vantage', 'Vanquish'],
    'Audi': ['80', '100', '200', 'A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'e-tron', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'RS3', 'RS4', 'RS5', 'RS6', 'RS7', 'S5', 'S8', 'TT'],
    'Avatr': ['11', '12'],
    'BAIC': ['BJ40', 'BJ80', 'D20', 'EU5', 'U5 Plus', 'X35', 'X55', 'X7'],
    'Bentley': ['Arnage', 'Bentayga', 'Continental GT', 'Flying Spur', 'Mulsanne'],
    'BMW': ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', '8 Series', 'i3', 'i4', 'i7', 'iX', 'M2', 'M3', 'M4', 'M5', 'M8', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'XM', 'Z4'],
    'BYD': ['Atto 3', 'Chaser 05', 'Dolphin', 'E2', 'F3', 'Han', 'Qin Plus', 'Seagull', 'Seal', 'Song Plus', 'Tang', 'Yuan Plus'],
    'Cadillac': ['ATS', 'CT4', 'CT5', 'CT6', 'CTS', 'Escalade', 'SRX', 'XT4', 'XT5', 'XT6'],
    'Changan': ['Alsvin', 'CS35 Plus', 'CS55 Plus', 'CS75 Plus', 'CS85', 'CS95', 'Eado', 'Hunter', 'Lamore', 'Raeton', 'UNI-K', 'UNI-T', 'UNI-V'],
    'Chery': ['Arrizo 7', 'Arrizo 8', 'Tiggo 2', 'Tiggo 4 Pro', 'Tiggo 7 Pro', 'Tiggo 8 Pro', 'Tiggo 8 Pro Max', 'Tiggo 9'],
    'Chevrolet': ['Aveo', 'Captiva', 'Cobalt', 'Cruze', 'Damas', 'Epica', 'Equinox', 'Lacetti', 'Lanos', 'Malibu', 'Monza', 'Nexia', 'Orlando', 'Spark', 'Suburban', 'Tahoe', 'Tracker', 'TrailBlazer', 'Traverse'],
    'Chrysler': ['300C', 'Aspen', 'Pacifica', 'PT Cruiser', 'Sebring', 'Town & Country'],
    'Citroen': ['Berlingo', 'C-Elysee', 'C3', 'C4', 'C5', 'DS3', 'DS4', 'DS5', 'Jumper'],
    'Daewoo': ['Damas', 'Espero', 'Gentra', 'Lacetti', 'Lanos', 'Leganza', 'Magnus', 'Matiz', 'Nexia', 'Nubira', 'Tico', 'Winstorm'],
    'Dodge': ['Challenger', 'Charger', 'Caravan', 'Durango', 'Journey', 'RAM 1500', 'TRX'],
    'EXEED': ['LX', 'RX', 'TXL', 'VX'],
    'FAW': ['Bestune T77', 'T99', 'V5', 'J6/J7 (Trucks)'],
    'Ferrari': ['296 GTB', '458', '488', '812', 'F8', 'Portofino', 'Purosangue', 'Roma', 'SF90'],
    'Ford': ['Bronco', 'EcoSport', 'Edge', 'Escape', 'Expedition', 'Explorer', 'F-150', 'Fiesta', 'Focus', 'Fusion', 'Kuga', 'Mondeo', 'Mustang', 'Ranger', 'Transit'],
    'GAC': ['EMKOO', 'GS3', 'GS8', 'M8'],
    'Geely': ['Atlas', 'Atlas Pro', 'Azkarra', 'Coolray', 'Emgrand', 'Geometry C', 'Monjaro', 'Okavango', 'Preface', 'Tugella'],
    'Genesis': ['G70', 'G80', 'G90', 'GV70', 'GV80'],
    'GMC': ['Acadia', 'Savana', 'Sierra', 'Terrain', 'Yukon'],
    'Great Wall': ['Hover H3', 'Hover H5', 'Poer', 'Wingle'],
    'Haval': ['Dargo', 'F7', 'F7x', 'H6', 'H9', 'Jolion', 'M6'],
    'Honda': ['Accord', 'Civic', 'CR-V', 'Crosstour', 'Elysion', 'Fit', 'HR-V', 'Insight', 'Legend', 'Odyssey', 'Pilot', 'Stepwgn'],
    'Hongqi': ['E-HS9', 'H5', 'H9', 'HS5', 'HS7'],
    'Hummer': ['H1', 'H2', 'H3'],
    'Hyundai': ['Accent', 'Bayon', 'Creta', 'Elantra', 'Genesis', 'Getz', 'Grandeur', 'H-1', 'i10', 'i20', 'i30', 'i40', 'IONIQ 5', 'Kona', 'Palisade', 'Santa Fe', 'Solaris', 'Sonata', 'Staria', 'Tucson'],
    'Infiniti': ['EX', 'FX35', 'FX37', 'FX45', 'G25', 'G35', 'G37', 'JX', 'M', 'Q50', 'Q60', 'Q70', 'QX50', 'QX56', 'QX60', 'QX70', 'QX80'],
    'JAC': ['J7', 'JS4', 'JS6', 'S3', 'S5', 'T6', 'T8'],
    'Jaecoo': ['J7', 'J8'],
    'Jaguar': ['E-Pace', 'F-Pace', 'F-Type', 'I-Pace', 'XE', 'XF', 'XJ'],
    'Jeep': ['Cherokee', 'Compass', 'Gladiator', 'Grand Cherokee', 'Renegade', 'Wrangler'],
    'Jetour': ['Dashing', 'Traveller', 'X70 Plus', 'X90 Plus'],
    'Kia': ['Carnival', 'Ceed', 'Cerato', 'EV6', 'EV9', 'K5', 'K7', 'K8', 'K9', 'Mohave', 'Morning', 'Optima', 'Picanto', 'Rio', 'Seltos', 'Sorento', 'Soul', 'Sportage', 'Stinger', 'Telluride'],
    'Lamborghini': ['Aventador', 'Huracán', 'Murciélago', 'Urus', 'Revuelto'],
    'Land Rover': ['Defender', 'Discovery', 'Freelander', 'Range Rover', 'Evoque', 'Sport', 'Velar'],
    'Lexus': ['CT', 'ES', 'GS', 'GX 460', 'GX 470', 'GX 550', 'IS', 'LS', 'LX 470', 'LX 570', 'LX 600', 'NX', 'RC', 'RX 300', 'RX 350', 'UX'],
    'Li Auto (LiXiang)': ['L6', 'L7', 'L8', 'L9', 'One'],
    'Lifan': ['320', '520', '620', 'Myway', 'Solano', 'X60'],
    'Lincoln': ['Aviator', 'Continental', 'Corsair', 'MKZ', 'Navigator', 'Town Car'],
    'Lotus': ['Eletre', 'Emira'],
    'Maserati': ['Ghibli', 'Grecale', 'Levante', 'Quattroporte'],
    'Mazda': ['2', '3', '5', '6', '323', '626', 'CX-30', 'CX-5', 'CX-7', 'CX-9', 'MPV'],
    'Mercedes-Benz': ['A', 'B', 'C', 'CL', 'CLA', 'CLK', 'CLS', 'E', 'G', 'GL', 'GLA', 'GLB', 'GLC', 'GLE', 'GLK', 'GLS', 'ML', 'R', 'S-Class', 'SL', 'SLK', 'Sprinter', 'V-Class', 'Vito'],
    'Mini': ['Clubman', 'Countryman', 'Hatch'],
    'Mitsubishi': ['ASX', 'Colt', 'Delica', 'Galant', 'L200', 'Lancer', 'Montero Sport', 'Outlander', 'Pajero', 'Pajero Sport'],
    'Nio': ['EC6', 'ES6', 'ES8', 'ET5', 'ET7'],
    'Nissan': ['Almera', 'Altima', 'Juke', 'Leaf', 'Maxima', 'Murano', 'Note', 'Pathfinder', 'Patrol', 'Primera', 'Qashqai', 'Sentra', 'Teana', 'Terrano', 'Tiida', 'X-Trail'],
    'OMODA': ['C5', 'S5'],
    'Opel': ['Astra', 'Corsa', 'Insignia', 'Mokka', 'Vectra', 'Zafira'],
    'Peugeot': ['206', '207', '301', '308', '408', '508', '2008', '3008', '5008', 'Partner'],
    'Porsche': ['911', 'Boxster', 'Cayenne', 'Cayman', 'Macan', 'Panamera', 'Taycan'],
    'RAM': ['1500', '2500', 'TRX'],
    'Renault': ['Arkana', 'Captur', 'Duster', 'Fluence', 'Kangoo', 'Kaptur', 'Koleos', 'Laguna', 'Logan', 'Megane', 'Sandero', 'Symbol'],
    'Rolls-Royce': ['Cullinan', 'Ghost', 'Phantom', 'Spectre'],
    'Skoda': ['Fabia', 'Karoq', 'Kodiaq', 'Octavia', 'Rapid', 'Superb', 'Yeti'],
    'SsangYong': ['Actyon', 'Korando', 'Kyron', 'Musso', 'Rexton'],
    'Subaru': ['Forester', 'Impreza', 'Legacy', 'Outback', 'Tribeca', 'XV'],
    'Suzuki': ['Alto', 'Baleno', 'Grand Vitara', 'Jimny', 'Swift', 'SX4', 'Vitara'],
    'Tank': ['300', '400', '500', '700'],
    'Tesla': ['Model 3', 'Model S', 'Model X', 'Model Y', 'Cybertruck'],
    'Toyota': ['4Runner', 'Alphard', 'Avalon', 'Avensis', 'Camry', 'Carina', 'Corolla', 'Crown', 'Fortuner', 'Hiace', 'Highlander', 'Hilux', 'Land Cruiser 100', 'Land Cruiser 200', 'Land Cruiser 300', 'Prado 120', 'Prado 150', 'Prado 250', 'Mark II', 'Prius', 'RAV4', 'Sequoia', 'Sienna', 'Tundra', 'Yaris'],
    'Volkswagen': ['Amarok', 'Beetle', 'Caddy', 'Golf', 'ID.4', 'ID.6', 'Jetta', 'Multivan', 'Passat', 'Polo', 'Teramont', 'Tiguan', 'Touareg', 'Transporter'],
    'Volvo': ['S60', 'S90', 'XC40', 'XC60', 'XC90'],
    'Voyah': ['Free', 'Dreamer', 'Passion'],
    'Zeekr': ['001', '007', '009', 'X', '7X'],
    'ВАЗ (Lada)': ['2101-2115', 'Granta', 'Kalina', 'Largus', 'Niva', 'Niva Travel', 'Priora', 'Vesta', 'XRAY'],
    'ГАЗ': ['21', '24', '3110', 'Gazelle', 'Gazelle NEXT', 'Sobol'],
    'КАМАЗ': ['54901', '65115', '43118'],
    'УАЗ': ['469', 'Hunter', 'Patriot', 'Pickup', 'Bukhanka']
  };

  const colors = ['Белый', 'Чёрный', 'Серебристый', 'Серый', 'Красный', 'Синий', 'Зелёный', 'Золотой', 'Бежевый', 'Коричневый', 'Оранжевый', 'Жёлтый'];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Send to Vercel backend function
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
          carBrand: formData.brand,
          carModel: formData.model,
          carYear: formData.year,
          carColor: formData.color,
          submissionTime: new Date().toLocaleString('ru-RU')
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка отправки');
      }

      console.log('Email sent successfully:', data);
      
      setLoading(false);
      setSubmitted(true);
      
      setTimeout(() => {
        setFormData({
          brand: '',
          model: '',
          year: currentYear,
          color: '',
          customerName: '',
          customerPhone: ''
        });
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error('Error sending email:', err);
      setError('Ошибка при отправке заявки. Попробуйте еще раз.');
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="w-12 sm:w-16 h-12 sm:h-16 text-slate-100" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-100 mb-2">Заявка отправлена</h1>
          <p className="text-slate-400 text-sm sm:text-base mb-2">Мы получили вашу заявку:</p>
          <p className="text-slate-200 font-medium text-base sm:text-lg mb-6">
            {formData.year} {formData.brand} {formData.model}
          </p>
          <p className="text-slate-500 text-xs sm:text-sm">Мы свяжемся с вами по номеру {formData.customerPhone}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <header className="border-b border-slate-800 sticky top-0 bg-slate-950 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-3">
          <Car className="w-5 sm:w-6 h-5 sm:h-6 text-slate-100" />
          <h1 className="text-lg sm:text-xl font-semibold text-slate-100">Импорт автомобилей</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* Form Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-6 sm:mb-8">Заявка на автомобиль</h2>
          
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-400 mb-2">Марка</label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition text-sm sm:text-base"
                >
                  <option value="">Выберите марку...</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-400 mb-2">Модель</label>
                <select
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  required
                  disabled={!formData.brand}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition disabled:bg-slate-800 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  <option value="">
                    {formData.brand ? 'Выберите модель...' : 'Сначала выберите марку...'}
                  </option>
                  {formData.brand && modelsByBrand[formData.brand]?.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-400 mb-2">Год</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition text-sm sm:text-base"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-400 mb-2">Цвет</label>
                <select
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition text-sm sm:text-base"
                >
                  <option value="">Выберите цвет...</option>
                  {colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-6">
              <h3 className="text-xs sm:text-sm font-semibold text-slate-300 mb-4 sm:mb-6">Ваши контактные данные</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-400 mb-2">Имя</label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    required
                    placeholder="Иван Иванов"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-400 mb-2">Телефон</label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    required
                    placeholder="+7 (999) 123-45-67"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 sm:mt-8 px-6 sm:px-8 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium text-sm sm:text-base"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Отправка...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Отправить заявку
                </>
              )}
            </button>
          </form>
        </section>

        {/* Info Section */}
        <section className="border-t border-slate-800 pt-12 sm:pt-16">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-6 sm:mb-8">О нас</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8">
            <div>
              <div className="text-2xl sm:text-3xl font-semibold text-slate-100 mb-2">85+</div>
              <p className="text-slate-400 text-xs sm:text-sm">Марок автомобилей доступных</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-semibold text-slate-100 mb-2">1000+</div>
              <p className="text-slate-400 text-xs sm:text-sm">Моделей на выбор</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-semibold text-slate-100 mb-2">24/7</div>
              <p className="text-slate-400 text-xs sm:text-sm">Поддержка клиентов</p>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="text-slate-600 text-sm mt-0.5 flex-shrink-0">•</span>
              <p className="text-slate-400 text-xs sm:text-sm">Международная гарантия включена</p>
            </div>
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="text-slate-600 text-sm mt-0.5 flex-shrink-0">•</span>
              <p className="text-slate-400 text-xs sm:text-sm">Профессиональная проверка и сертификация</p>
            </div>
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="text-slate-600 text-sm mt-0.5 flex-shrink-0">•</span>
              <p className="text-slate-400 text-xs sm:text-sm">Гибкие варианты финансирования</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 mt-12 sm:mt-16 py-6 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center text-slate-600 text-xs sm:text-sm">
          <p>© 2025 Импорт автомобилей. Все права защищены. | Дилер премиум автомобилей</p>
        </div>
      </footer>
    </div>
  );
}
