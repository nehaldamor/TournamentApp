
# TournamentApp

A full-stack tournament application built with React, Node.js, and MongoDB.

## Features

- **User Authentication**: Registration, login, and OTP verification
- **Contest Management**: Create, join, and view tournament contests
- **Payment Integration**: Razorpay integration for contest payments
- **Admin Dashboard**: Manage contests and users
- **User Profiles**: Update profile information and manage wallets
- **Email Notifications**: OTP and email services

## Project Structure

### Frontend
- React + Vite
- Authentication context
- Protected routes
- Pages: Home, Login, Register, Contest Details, Profile, etc.

### Backend
- Node.js + Express
- MongoDB database
- Authentication & authorization middleware
- Controllers for auth, contests, payments, and admin operations
- Razorpay payment integration

### Admin Frontend
- React + Vite
- Admin dashboard for contest and user management
- Contest creation and updates

## Tech Stack

- **Frontend**: React, Vite, CSS
- **Backend**: Node.js, Express, MongoDB
- **Payments**: Razorpay
- **Authentication**: JWT, OTP

## Installation

1. Clone the repository
2. Install dependencies in each folder:
    ```bash
    cd Frontend && npm install
    cd Backend && npm install
    cd AdminFrontend && npm install
    ```
3. Configure `.env` files in each directory
4. Start the development servers

## Environment Variables

Create `.env` files in Backend, Frontend, and AdminFrontend directories with required configurations.


Backend `.env`:
```MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
FAST2SMS_API_KEY=your_fast2sms_api_key
ADMIN_SECRET=your_admin_secret
MONGO_URI=your_mongodb_uri
PORT=3000
EMAIL_USER=your_email_user
# EMAIL_PASS=your_email_pass
PORT_EMAIL=587

SMTP_HOST=for_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass


frontend `.env`:
```VITE_API_URL=http://localhost:3000/api
VITE_RAZORPAY_KEY_ID=`your_razorpay_key_id
adminfrontend `.env`:
```VITE_API_URL=http://localhost:3000/api
