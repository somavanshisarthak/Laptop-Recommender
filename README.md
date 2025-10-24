# 🖥️ Laptop Recommender MVP

A full-stack web application that helps users find the perfect laptop based on their budget and use case. Built with React (frontend) and Flask (backend).

## 🎯 Features

- **Smart Recommendations**: Get top 5 laptop recommendations based on budget and use case
- **Use Case Categories**: Gaming, Office Work, Student, and Artistic/Creative
- **Beautiful UI**: Clean, responsive design with Tailwind CSS
- **Real-time Search**: Instant recommendations as you type
- **Value Scoring**: Laptops are ranked by value (performance per price)

## 🏗️ Project Structure

```
Laptop-Recommender/
├── backend/
│   ├── app.py                 # Flask API server
│   └── requirements.txt       # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── components/
│   │   │   └── LaptopCard.js # Laptop display component
│   │   ├── index.js          # React entry point
│   │   └── index.css         # Global styles with Tailwind
│   ├── public/
│   │   └── index.html        # HTML template
│   ├── package.json          # Node.js dependencies
│   ├── tailwind.config.js    # Tailwind configuration
│   └── postcss.config.js     # PostCSS configuration
├── data/
│   └── laptops.json          # Sample laptop data
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **Python** (v3.7 or higher)
- **npm** or **yarn**

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Laptop-Recommender
   ```

2. **Setup Backend (Flask)**
   ```bash
   # Navigate to backend directory
   cd backend
   
   # Create virtual environment (recommended)
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Run Flask server
   python app.py
   ```
   The Flask API will be available at `http://localhost:5001`

3. **Setup Frontend (React)**
   ```bash
   # Open a new terminal and navigate to frontend directory
   cd frontend
   
   # Install dependencies
   npm install
   
   # Start React development server
   npm start
   ```
   The React app will be available at `http://localhost:3000`

## 🎮 Usage

1. **Open your browser** and go to `http://localhost:3000`
2. **Enter your budget** in the budget field (in ₹)
3. **Select your use case** from the dropdown:
   - **Gaming**: High-performance laptops for gaming
   - **Office Work**: Business and productivity laptops
   - **Student**: Budget-friendly laptops for students
   - **Artistic**: Creative work laptops
4. **Click "Get Recommendations"** to see your top 5 laptop matches
5. **Browse the results** with detailed specifications and value scores

## 🔧 API Endpoints

### Backend API (Flask)

- **GET /** - Health check endpoint
  - Returns: `{"message": "Laptop Recommender API is running!"}`

- **GET /recommend** - Get laptop recommendations
  - Parameters:
    - `budget` (int): Maximum budget in ₹
    - `type` (string): Use case (Gaming, Office, Student, Artistic)
  - Returns: JSON with recommended laptops

  Example:
  ```bash
  curl "http://localhost:5001/recommend?budget=75000&type=Gaming"
  ```

## 📊 Sample Data

The application comes with 16 sample laptops across different categories:

- **Gaming Laptops**: HP Victus, ASUS ROG Strix, MSI Gaming, etc.
- **Office Laptops**: Dell Inspiron, Lenovo ThinkPad, HP EliteBook, etc.
- **Student Laptops**: HP Pavilion, ASUS VivoBook, Lenovo IdeaPad, etc.
- **Artistic Laptops**: MacBook Air M2, Dell XPS 13, Surface Laptop 4, etc.

## 🛠️ Development

### Adding New Laptops

To add new laptops, edit the `data/laptops.json` file:

```json
{
  "name": "Laptop Name",
  "cpu": "Processor Model",
  "gpu": "Graphics Card",
  "ram": 16,
  "storage": 512,
  "price": 75000,
  "use_case": "Gaming"
}
```

### Customizing the UI

- **Styling**: Modify `frontend/src/index.css` and component files
- **Colors**: Update `frontend/tailwind.config.js`
- **Components**: Edit `frontend/src/App.js` and `frontend/src/components/LaptopCard.js`

### Backend Customization

- **Recommendation Logic**: Modify the `sort_laptops_by_value()` function in `backend/app.py`
- **New Endpoints**: Add new routes in `backend/app.py`
- **Data Validation**: Update the validation logic in the `/recommend` endpoint

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure Flask-CORS is installed and enabled
2. **Port Conflicts**: Ensure ports 3000 and 5001 are available
3. **Module Not Found**: Run `npm install` and `pip install -r requirements.txt`
4. **API Connection**: Verify Flask server is running on port 5001

### Debug Mode

- **Flask**: Set `debug=True` in `app.py` (already enabled)
- **React**: Use browser developer tools and React DevTools

## 📝 Technologies Used

### Frontend
- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript ES6+**: Modern JavaScript features

### Backend
- **Flask**: Lightweight Python web framework
- **Flask-CORS**: Cross-Origin Resource Sharing support
- **JSON**: Data storage and API responses

### Development Tools
- **Create React App**: React development environment
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the console logs in your browser
3. Check the Flask server logs
4. Open an issue on GitHub

---

**Happy Laptop Hunting! 🎯**