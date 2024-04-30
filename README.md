# Gemini Portal Backend

This repository contains the backend server for the Gemini Portal application.

## Development Setup

To set up the development environment for this project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone git@github.com:ashraf-gemini/gemini-portal-be.git
   ```

2. **Install dependencies:**

   ```bash
   cd gemini-portal-be
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory of the project and add the following variables:

   ```
   PORT=8080
   DATABASE_URL=<MongoDB connection string>
   PORTAL_API_KEY=<your Portal API key>
   ```

4. **Start the development server:**

   ```bash
   npm start
   ```

5. **Access the backend server:**
   The server will be running on `http://localhost:8080/users`.

## Deployment

This project can be deployed using Netlify Functions. Follow these steps to deploy the backend server:

1. **Install the Netlify CLI globally:**

   ```bash
   npm install -g netlify-cli
   ```

2. **Build & Deploy the project:**

   ```bash
   npm run build
   ```

3. **Follow the prompts to log in to your Netlify account and complete the deployment.**

Access the deployed BE on [https://gemini-portal-be.netlify.app/users](https://gemini-portal-be.netlify.app/users)

## Additional Notes

- Ensure that your MongoDB database is properly configured and accessible from the application.

- Make sure to secure your environment variables, especially the `PORTAL_API_KEY`.
