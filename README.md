# Asset Tracker Admin Dashboard

A comprehensive asset management system with a modern React frontend and Node.js backend.

## Features

- **Asset Management**: Track, manage, and monitor all company assets
- **User Management**: Role-based access control with admin, manager, and user roles
- **Reporting**: Generate detailed reports on assets, maintenance, and depreciation
- **Audit Trail**: Complete logging of all system activities
- **Settings**: Configurable system settings and preferences
- **File Upload**: Support for asset images and documents
- **Real-time Updates**: Live dashboard with key metrics

## Tech Stack

### Frontend
- React 18 with TypeScript
- Redux Toolkit for state management
- Material-UI for components
- Axios for API calls

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- Multer for file uploads
- Helmet for security
- Rate limiting

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd asset-tracker
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
```

4. **Set up environment variables**
Create a `.env` file in the backend directory:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/asset-tracker
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
NODE_ENV=development
```

5. **Start MongoDB**
Make sure MongoDB is running on your system.

6. **Seed the database**
```bash
cd backend
npm run seed
```

7. **Start the backend server**
```bash
npm run dev
```

8. **Start the frontend**
In a new terminal:
```bash
npm start
```

## Default Login Credentials

After seeding the database, you can use these credentials:

- **Admin**: admin@assettracker.com / admin123
- **Manager**: manager@assettracker.com / manager123
- **User**: user@assettracker.com / user123

## API Endpoints

### Authentication
- POST `/api/auth/login` - User login
- POST `/api/auth/register` - User registration
- POST `/api/auth/logout` - User logout
- GET `/api/auth/me` - Get current user
- PUT `/api/auth/updatepassword` - Update password

### Assets
- GET `/api/assets` - Get all assets
- POST `/api/assets` - Create new asset
- GET `/api/assets/:id` - Get single asset
- PUT `/api/assets/:id` - Update asset
- DELETE `/api/assets/:id` - Delete asset
- POST `/api/assets/:id/assign` - Assign asset to user
- POST `/api/assets/:id/unassign` - Unassign asset
- GET `/api/assets/stats` - Get asset statistics

### Users
- GET `/api/users` - Get all users
- POST `/api/users` - Create new user
- GET `/api/users/:id` - Get single user
- PUT `/api/users/:id` - Update user
- DELETE `/api/users/:id` - Deactivate user

### Reports
- GET `/api/reports` - Get all reports
- POST `/api/reports` - Generate new report
- GET `/api/reports/:id` - Get single report
- DELETE `/api/reports/:id` - Delete report

### Settings
- GET `/api/settings` - Get all settings
- POST `/api/settings` - Create new setting
- GET `/api/settings/:key` - Get single setting
- PUT `/api/settings/:key` - Update setting
- DELETE `/api/settings/:key` - Delete setting

### Dashboard
- GET `/api/dashboard/stats` - Get dashboard statistics

### Audit
- GET `/api/audit` - Get audit logs

## File Structure

```
asset-tracker/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js
│   ├── uploads/
│   └── package.json
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── theme/
│   └── App.tsx
├── public/
└── package.json
```

## Development

### Backend Development
```bash
cd backend
npm run dev  # Start with nodemon
```

### Frontend Development
```bash
npm start  # Start React development server
```

### Database Management
```bash
# Seed database with sample data
cd backend
npm run seed

# Reset database
npm run seed
```

## Production Deployment

### Environment Variables for Production
```bash
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
```

### Build Commands
```bash
# Build frontend
npm run build

# Start backend in production
cd backend
npm start
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Input validation
- Role-based access control
- Audit logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
