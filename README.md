# Food Delivery Website

## Project Overview

This project is a food delivery website with three main components: **Admin**, **Frontend**, and **Backend**. The admin can manage food items and orders, while clients can browse, order, and track their food deliveries. The backend handles all the core functionalities and data management.

## Folder Structure

- **admin**: Contains the admin side functionalities.
- **frontend**: The client-facing side of the website.
- **backend**: Handles the core functionalities and data processing.

## Admin Features

- **Add New Food Items**: Admin can add new food items to the menu.
- **Delete Food Items**: Admin can remove food items from the menu.
- **Manage Food Items**: Admin has access to all food items and can edit their details.
- **Update Delivery Status**: Admin can update the status of food delivery from 'Processing' to 'On the Way' to 'Delivered'.

## Frontend Features

- **User Registration**: New users can register to create an account.
- **User Login**: Existing users can log in to their accounts.
- **Browse Food Items**: Clients can browse different food items.
- **Order Food**: Clients can order food by providing address details.
- **Payment Integration**: Payments are handled using Razorpay.
- **Order Tracking**: Clients can track the status of their orders.

## Backend

All the above functionalities are supported by the backend code. The backend handles data storage, processing, and communication between the admin and frontend.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/food-delivery-website.git
cd food-delivery-website
npm install

Set Up Environment Variables:

Create a .env file in the root directory.
Add necessary environment variables for database connection, Razorpay API keys, 

cd backend
npm start

cd frontend
npm start


cd admin
npm start
