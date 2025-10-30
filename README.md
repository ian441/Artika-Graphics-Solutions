# Artika Graphics Solutions

A full-stack web application for showcasing graphic design portfolio, managing client communications, and providing administrative tools for Artika Graphics Solutions.

## 🚀 Features

### Public Features
- **Portfolio Showcase**: Display graphic design projects with categories, filtering, and detailed project views
- **Contact Form**: Allow visitors to submit inquiries and project requests
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Modern UI**: Clean, professional interface with smooth animations

### Admin Features
- **Dashboard**: Comprehensive admin panel with multiple management sections
- **User Management**: View and manage registered users
- **Portfolio Management**: Add, edit, and delete portfolio projects
- **Communication Hub**: Send messages to clients and manage contact submissions
- **System Settings**: Configure application settings
- **Blog Management**: Create and manage blog posts
- **Order Management**: Track and manage client orders

### Client Features
- **User Authentication**: Secure sign-up and sign-in functionality
- **Personal Dashboard**: View orders, messages, and favorites
- **Message Center**: Communicate with administrators
- **Project Tracking**: Monitor project progress and status

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **CORS**: Enabled for cross-origin requests

### Frontend
- **Framework**: React 18
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Testing**: Jest + React Testing Library
- **Build Tool**: Create React App

### Development Tools
- **Version Control**: Git
- **API Testing**: Postman/Insomnia
- **Database Management**: pgAdmin / psql
- **Deployment**: Render (PostgreSQL + Web Services)

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager
- Git

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd artika-graphics-solutions
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

4. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   ```

## ⚙️ Setup

### Database Setup

1. **Install PostgreSQL** on your system
2. **Create a database**:
   ```sql
   CREATE DATABASE portfolio_db;
   ```
3. **Run migrations** (in order):
   ```bash
   # From the backend directory
   cd backend
   # Run each migration file in numerical order
   psql -d portfolio_db -U your_username -f migrations/001_extend_user.sql
   psql -d portfolio_db -U your_username -f migrations/002_create_projects.sql
   # ... continue with all migration files
   ```

### Environment Configuration

1. **Backend (.env)**
   Create `backend/.env`:
   ```env
   DB_USER=your_postgres_username
   DB_HOST=localhost
   DB_NAME=portfolio_db
   DB_PASSWORD=your_postgres_password
   DB_PORT=5432
   PORT=5000
   JWT_SECRET=your_secure_jwt_secret_key
   NODE_ENV=development
   ```

2. **Frontend (.env)**
   Create `client/.env`:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

### Create Admin User

```bash
cd backend
node create_admin.js
```

Follow the prompts to create an admin user account.

## 🚀 Running the Application

### Development Mode

1. **Start the backend server**:
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on `http://localhost:5000`

2. **Start the frontend** (in a new terminal):
   ```bash
   cd client
   npm start
   ```
   Frontend runs on `http://localhost:3000`

### Production Mode

1. **Build the frontend**:
   ```bash
   cd client
   npm run build
   ```

2. **Start the backend**:
   ```bash
   cd backend
   npm start
   ```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/auth/profile` - Get user profile (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)

### Portfolio Endpoints
- `GET /api/portfolio` - Get all portfolio projects
- `GET /api/portfolio/:id` - Get specific project
- `GET /api/portfolio/categories` - Get all categories
- `POST /api/portfolio` - Create new project (admin only)
- `PUT /api/portfolio/:id` - Update project (admin only)
- `DELETE /api/portfolio/:id` - Delete project (admin only)

### Admin Endpoints
- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/contacts` - Get contact submissions
- `POST /api/admin/messages` - Send message to user
- `GET /api/admin/messages` - Get message history

### Contact & Communication
- `POST /api/contact` - Submit contact form
- `GET /api/messages` - Get user messages (authenticated)
- `POST /api/messages` - Send message to admin (authenticated)

### Blog Endpoints
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:id` - Get specific blog post
- `POST /api/blog` - Create blog post (admin only)
- `PUT /api/blog/:id` - Update blog post (admin only)
- `DELETE /api/blog/:id` - Delete blog post (admin only)

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd client
npm test
```

### Full Test Suite
```bash
# From root directory
npm test
```

## 🚀 Deployment

### Using Render (Recommended)

1. **Create Render Account** and connect your GitHub repository

2. **Deploy PostgreSQL Database**:
   - Create new PostgreSQL instance on Render
   - Note connection details

3. **Deploy Backend**:
   - Create new Web Service
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Set environment variables (DB_HOST, DB_NAME, etc.)

4. **Deploy Frontend**:
   - Create new Static Site
   - Build Command: `cd client && npm install && npm run build`
   - Publish Directory: `client/build`
   - Set `REACT_APP_API_URL` to your backend URL

### Using render.yaml Blueprint

The repository includes a `render.yaml` file for automated deployment:

1. In Render dashboard, create a new Blueprint
2. Connect your repository
3. Render will create services based on the configuration
4. Manually set environment variables

## 📁 Project Structure

```
artika-graphics-solutions/
├── backend/
│   ├── app/
│   │   ├── controllers/     # Route handlers
│   │   ├── models/         # Database models
│   │   ├── middleware/     # Express middleware
│   │   └── routes/         # API routes
│   ├── migrations/         # Database migrations
│   ├── __tests__/          # Backend tests
│   ├── index.js            # Server entry point
│   └── package.json
├── client/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   └── App.js          # Main app component
│   └── package.json
├── package.json            # Root package.json
├── render.yaml             # Render deployment config
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 📞 Support

For support or questions, please contact the development team or create an issue in the repository.

## 🔄 Recent Updates

- ✅ Portfolio management system fully implemented
- ✅ Admin dashboard with comprehensive management tools
- ✅ Client communication system
- ✅ User authentication and authorization
- ✅ Responsive design across all devices
- ✅ Database migrations and setup scripts
- ✅ Testing suite for both frontend and backend
- ✅ Deployment configuration for Render

---

**Artika Graphics Solutions** - Showcasing creativity through technology
