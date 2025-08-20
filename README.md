# WeatherNow - Modern Weather App

A beautiful, responsive weather application that provides real-time weather information for any city worldwide.

## 🌟 Features

- **Modern Design**: Beautiful gradient background with glass morphism effects
- **Real-time Weather Data**: Powered by OpenWeatherMap API
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Weather History**: Stores recent searches in local storage
- **Comprehensive Weather Info**: Temperature, humidity, wind speed, pressure, visibility, and cloudiness
- **Smart Error Handling**: User-friendly error messages and graceful fallbacks
- **Loading Animation**: Beautiful preloader with weather-themed animations

## 🚀 Live Demo

Visit the live application: [Your Netlify URL here]

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations and responsive design
- **JavaScript (ES6+)**: Dynamic functionality and API integration
- **jQuery**: DOM manipulation and AJAX requests
- **Font Awesome**: Beautiful weather icons
- **Google Fonts**: Poppins font family
- **OpenWeatherMap API**: Real-time weather data

## 📱 Screenshots

[Add screenshots of your app here]

## 🔧 Setup & Installation

### For Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/olathatcode/weather-app.git
   cd weather-app
   ```

2. **Get your API key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Get your API key

3. **Configure the app**
   - Open `js/config.js`
   - Replace the API key with your own:
   ```javascript
   const WEATHER_CONFIG = {
       API_KEY: 'your-api-key-here',
       // ... other config
   };
   ```

4. **Run locally**
   - Simply open `index.html` in your browser
   - Or use a local server like Live Server in VS Code

### For Netlify Deployment

1. **Fork/Clone this repository**

2. **Update API Key** (if needed)
   - Edit `js/config.js` with your OpenWeatherMap API key

3. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set build command: (leave empty for static site)
   - Set publish directory: `/` (root directory)
   - Deploy!

## 🌐 API Configuration

The app uses the OpenWeatherMap API. You can customize the configuration in `js/config.js`:

```javascript
const WEATHER_CONFIG = {
    API_KEY: 'your-api-key-here',
    API_URL: 'https://api.openweathermap.org/data/2.5/weather',
    UNITS: 'metric', // 'metric', 'imperial', or 'kelvin'
    TIMEOUT: 15000 // Request timeout in milliseconds
};
```

## 📁 Project Structure

```
weather-app/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styling and animations
├── js/
│   ├── config.js       # API configuration
│   └── script.js       # Main JavaScript functionality
├── img/                # Images and assets
└── README.md          # This file
```

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `css/styles.css`:
```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --accent-color: #ffd700;
    /* Add more custom properties */
}
```

### Adding New Features
- Weather history is stored in localStorage
- Add new weather parameters by modifying the API response handling
- Customize the UI by editing the HTML structure and CSS

## 🔒 Environment Variables (Optional)

For enhanced security, you can use environment variables:

1. Create a `.env` file (don't commit this)
2. Add: `WEATHER_API_KEY=your-api-key-here`
3. Use a build process to inject the variable

## 🐛 Troubleshooting

### Common Issues

1. **"City not found" error**
   - Check spelling of city name
   - Try using city name with country code (e.g., "London,UK")

2. **API key errors**
   - Ensure your API key is valid and active
   - Check if you've exceeded the free tier limits

3. **CORS errors**
   - This shouldn't happen with OpenWeatherMap API
   - If it does, check your API key and endpoint

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Developed and Designed By OlaThatCodes**

- GitHub: [@olathatcode](https://github.com/olathatcode)
- Website: [(https://spidertemplate.netlify.app/)]

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⭐ Show your support

Give a ⭐️ if this project helped you!
