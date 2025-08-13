# ✉️ AI Email Sender

AI Email Sender 2 is a modern web application that leverages artificial intelligence to compose and send personalized emails. Built with a React frontend using Tailwind CSS and Redux for state management, and a FastAPI backend integrated with the Gemini API for AI-driven content generation. The application utilizes Celery for asynchronous task processing, ensuring efficient email dispatch.

---
## Video Demo

https://github.com/user-attachments/assets/a73dbf1e-502a-402a-9d1c-41dbcf15db20

---
## 🧩 Features





- **AI-Powered Email Composition**: Generate personalized email content using the Gemini API.
- **Responsive UI**: Built with React and styled using Tailwind CSS for a modern, mobile-first design.
- **State Management**: Utilizes Redux for predictable state management across the application.
- **Asynchronous Email Sending**: Employs Celery with Redis for handling email dispatch in the background.
- **Secure Communication**: Axios is used for making HTTP requests between the frontend and backend.
- **User Authentication**: Secure login and registration system to manage user sessions.

---

## 🛠️ Technologies Used

- **Frontend**:
  - React
  - Tailwind CSS
  - Redux
  - Axios

- **Backend**:
  - FastAPI
  - Celery
  - Redis
  - Gemini API

- **Development Tools**:
  - Python
  - Node.js
  - npm

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/manishgk9/ai_email_sender_2.git
cd ai_email_sender_2
````

### 2. Backend Setup (FastAPI with Celery)

#### a. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

#### b. Set Up Environment Variables

Create a `.env` file in the `backend` directory and add your Gemini API key:

```
GEMINI_API_KEY=your_api_key_here
```

#### c. Run Redis Server

Ensure Redis is installed and running on your machine. You can start Redis using:

```bash
redis-server
```

#### d. Start Celery Worker

In the `backend` directory, run:

```bash
celery -A app.celery worker --loglevel=info
```

#### e. Start FastAPI Server

Still in the `backend` directory, run:

```bash
uvicorn app.main:app --reload
```

The backend server should now be running at `http://localhost:8000`.

### 3. Frontend Setup (React with Tailwind CSS)

#### a. Install Node.js Dependencies

```bash
cd frontend
npm install
```

#### b. Start Development Server

```bash
npm start
```

The frontend should now be accessible at `http://localhost:3000`.

---

## 📸 Screenshots

*Include screenshots of the application interface here.*

---

## 🧪 Testing

To run tests for the backend:

```bash
cd backend
uvicorn main:app
```

For frontend testing, consider using tools like Jest and React Testing Library.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request with your proposed changes.

---

## 📬 Contact

For any inquiries or feedback, please open an issue on the [GitHub repository](https://github.com/manishgk9/ai_email_sender_2/issues).

---

*Note: This README is based on the available information and may require updates as the project evolves.*

```
