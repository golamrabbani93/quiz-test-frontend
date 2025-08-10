# EForgeIT Quiz Test

A modern React + TypeScript + Vite application for online quizzes and assessments. This project
features authentication, role-based dashboards, quiz management, and step-based assessments with
timer and auto-submit functionality.

## Features

- React 19 + TypeScript + Vite
- Ant Design UI components
- Tailwind CSS for custom styling
- Redux Toolkit for state management
- RTK Query for API calls
- Authentication (login, register, OTP verification)
- Role-based dashboard (admin, student)
- Step-based quiz assessment with timer and auto-submit
- Modal dialogs for feedback and info
- CORS-ready API integration

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Yarn or npm

### Installation

```bash
git clone https://github.com/golamrabbani93/quiz-test-frontend.git
cd quiz-test-frontend
yarn install # or npm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```
VITE_API_URL=https://your-api-url.com
```

Replace with your actual backend API URL.

### Running the App

```bash
yarn dev # or npm run dev
```

The app will run at `http://localhost:5173` by default.

## Project Structure

```
├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── types/
│   ├── hooks/
│   ├── utils/
│   └── ...
├── public/
├── package.json
├── vite.config.ts
├── tsconfig.json
└── ...
```

## API & CORS

Make sure your backend API allows CORS requests from your frontend domain. See project documentation
for details.

## Customization

- Update styles in `src/App.css` and Tailwind config
- Add new pages/components in `src/pages` and `src/components`
- Extend Redux slices and API endpoints as needed

## License

MIT

---

Made by Golam Rabbani
