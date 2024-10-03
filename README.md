# HireDirect

HireDirect is an on-demand professional services marketplace where users can browse and book service providers across various categories. The platform supports user, provider, and admin roles with dedicated dashboards for each. Built using the MERN stack, HireDirect aims to streamline the process of connecting professionals with those who need their services.

## Key Features

1. **User Side:**
   - Browse and search for services
   - View provider profiles with ratings and reviews
   - Book services with date and time selection

2. **Provider Side:**
   - Manage personal services and bookings
   - Update provider profiles and availability

3. **Admin Side:**
   - Manage users, services, categories, and reviews
   - Oversee bookings and payment systems

## Installation

### Steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/HireDirect.git
   ```

2. Navigate to the project directory:

   ```bash
   cd HireDirect
   ```

3. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

4. Install client dependencies:

   ```bash
   cd ../client
   npm install
   ```

5. Set up environment variables by creating `.env` files in both `client` and `server` directories:

   ```plaintext
   MONGO_URI=your_mongodb_uri
   PORT=your_port_number
   ```

6. Run the project:

   - **Server**: Run the Node.js server:

     ```bash
     cd server
     npm run dev
     ```

   - **Client**: Run the React frontend:

     ```bash
     cd ../client
     npm start
     ```

