# Skill Sequence: A Comprehensive Training Application

## Introduction
Skill Sequence is an application designed to guide users through a series of training videos while tracking their progress and providing feedback on their completion status. Built with a modern stack, it ensures a seamless and user-friendly experience.

## Application Architecture
The application follows a client-server architecture with three key components:

1. **Frontend**: Built using React.js, it handles user interaction, displays video content, and updates the UI based on user progress.
2. **Backend**: Powered by Node.js and Express.js, it serves as the API layer, managing database operations and application logic.
3. **Database**: A MySQL database stores user information, video data, and progress details.

---

## Features
- User progress tracking with feedback on completion status.
- Intuitive video playback and module navigation.
- Secure backend API for data management.
- Comprehensive dashboard for managing training content.

---

## Tech Stack
### Frontend
- **React.js**: Core framework for building the user interface.
- **React Router**: Navigation between application pages.
- **Axios**: HTTP client for API requests.
- **React Icons**: Provides icons for the UI.
- **React Player**: Video player for HTML5 content.
- **Tailwind CSS**: Styling components.
- **Chakra UI**: Circular progress bar for visual feedback.

### Backend
- **Express.js**: REST API development.
- **MySQL**: Relational database for data storage.
- **CORS**: Middleware for cross-origin requests.
- **Body-Parser**: Middleware for parsing incoming request bodies.

---

## Installation
### Prerequisites
- Node.js
- MySQL

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/devampatel03/skill-sequence.git
   ```
2. Navigate to the project directory:
   ```bash
   cd skill-sequence
   ```
3. Install dependencies for both frontend and backend:
   ```bash
   npm install
   cd client && npm install
   ```
4. Configure the database connection in `backend/config.js`.
5. Start the application:
   ```bash
   npm start
   ```

---

## Screenshots


---

## Contributing
1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push them:
   ```bash
   git commit -m "Add feature"
   git push origin feature-name
   ```
4. Submit a pull request.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---


