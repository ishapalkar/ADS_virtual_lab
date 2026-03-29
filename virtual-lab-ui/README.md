# 🧪 ADS Virtual Lab - Advanced Data Science Interactive Platform

A modern, responsive React + Vite web application with a **whiteboard cartoony neobrutalism** UI theme for the Advanced Data Science (ADS) virtual lab. This platform provides an interactive interface for data exploration, cleaning, preprocessing, model training, and advanced data fusion techniques.

## 🎨 Design Features

- **Neobrutalism Aesthetic**: Bold borders, stark colors, geometric shapes
- **Whiteboard Style**: Light background, clean typography, playful geometry
- **Smooth Animations**: Splash screen with floating elements, bouncing effects, slide transitions
- **Responsive Design**: Mobile-first approach, works seamlessly on all devices
- **Cartoony Elements**: Geometric icons, colored boxes, hand-drawn feel

## 📦 Tech Stack

- **React 18.2** - UI framework
- **Vite 5** - Fast build tool
- **Lucide React** - Icon library
- **CSS3** - Modern styling with animations

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview built app
npm run preview
```

The dev server runs on `http://localhost:5173`

## 📁 Project Structure

```
virtual-lab-ui/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx         # Main dashboard with module grid
│   │   ├── Header.jsx            # App header with branding
│   │   ├── ModuleCard.jsx        # Reusable module card component
│   │   ├── SplashScreen.jsx      # Animated splash screen
│   │   └── modules/
│   │       ├── DataViewer.jsx    # Data loading & exploration
│   │       ├── CleaningModule.jsx # Data cleaning pipeline
│   │       ├── PreprocessingModule.jsx # Feature encoding & scaling
│   │       ├── ModelTrainingModule.jsx # Model training interface
│   │       └── FusionModule.jsx  # Data fusion orchestration
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Global styles
├── public/
│   └── favicon.svg              # App favicon
├── index.html                   # HTML template
├── vite.config.js               # Vite configuration
└── package.json                 # Dependencies
```

## 🎯 Modules Overview

### 1. **Data Loader** 📊
   - Load UCI Adult dataset (~48K rows, 14 features)
   - View dataset statistics and feature information
   - Identify data types and missing values

### 2. **Data Cleaning** 🧹
   - Handle missing values (replace `?` with NaN)
   - Remove duplicates
   - Fix inconsistent categories
   - Detect outliers using IQR method

### 3. **Preprocessing** ⚡
   - One-hot encoding for categorical features
   - StandardScaler for numerical features
   - Train-test split (80-20)

### 4. **Model Training** 🤖
   - Logistic Regression
   - Random Forest
   - XGBoost
   - Compare accuracy, precision, recall, F1-score, ROC-AUC

### 5. **Clustering** 📈
   - K-Means clustering
   - PCA visualization
   - Elbow method analysis
   - Silhouette & Davies-Bouldin scores

### 6. **Data Fusion** 🔗
   - **Early Fusion**: Merge data → train single model
   - **Late Fusion**: Train separate models → combine predictions
   - **Weighted Fusion**: Combine predictions with optimal weights
   - **Hybrid Fusion**: Multi-level integration
   - **Stacking**: Meta-model approach (optional)

## 🎨 Design System

### Colors (Neobrutalism Palette)
- **Primary**: Black (`#000`)
- **Secondary**: White (`#fff`)
- **Accent**: Bright Yellow (`#ffeb3b`)
- **Success**: Green (`#51cf66`)
- **Danger**: Red (`#ff6b6b`)

### Typography
- **Font**: Courier New (monospace)
- **Weight**: Bold, 900 for headings
- **Letter-spacing**: Wide for that bold neobrutalism feel

### Components
- **Borders**: 3px solid black
- **Shadows**: Hard drop shadows (0 offset)
- **Radius**: 0px (angular, no curves)
- **Transitions**: Smooth cubic-bezier easing

## ✨ Animations

- **Splash Screen**: Debut animation with floating geometric elements
- **Slide Transitions**: Elements slide in/out smoothly
- **Hover Effects**: Cards lift and shadow intensifies
- **Loading States**: Pulsing and progress animations
- **Floating Elements**: Geometric shapes float in background

## 📱 Responsive Breakpoints

- **Desktop**: Full grid layout, large typography
- **Tablet** (≤1024px): Adjusted grid, smaller padding
- **Mobile** (≤768px): 2-column grid
- **Small Mobile** (≤480px): Single column, optimized touch targets

## 🔌 API Integration (Future)

The UI is prepared to connect to:
- Python Flask backend (data processing)
- Machine learning endpoints (training, predictions)
- Data fusion services
- Result visualization endpoints

## 📊 Example Data Flow

```
1. Load Dataset → Data Viewer Module
2. Clean Data → Cleaning Module
3. Preprocess → Preprocessing Module
4. Split Train/Test → Ready for ML
5. Train Models → Model Training Module
6. Evaluate → Compare metrics
7. Data Fusion → Combine techniques
8. Results → Visualization Dashboard
```

## 🎯 Next Steps

1. **Connect Backend API**: Link React frontend to Python ML backend
2. **Real Data Integration**: Load actual UCI Adult dataset
3. **Interactive Visualizations**: Add charts, confusion matrices, PCA plots
4. **Export Results**: Download reports, model comparisons
5. **User Authentication**: Session management for multi-user lab
6. **Advanced Analytics**: Real-time metric tracking and dashboards

## 📝 Notes

- Currently a frontend prototype with mock data
- Designed for teaching/learning purposes
- Fully responsive and accessible
- Ready for backend integration
- Production-ready build system

---

Built with ⚡ Vite & ❤️ React
