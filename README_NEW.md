# Employee Polls

A React/Redux web application that allows employees to create and vote on "Would You Rather" polls within their company.

## Features

- **Authentication System**: Simple login with predefined users
- **Home Dashboard**: View and filter answered/unanswered polls
- **Poll Creation**: Create new "Would You Rather" polls with two options
- **Poll Voting**: Vote on polls and see real-time results with percentages
- **Leaderboard**: View user rankings based on polls created and answered
- **Responsive Design**: Modern UI built with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:5173`

### Demo User Credentials

The application comes with three pre-configured users for testing:

- **Sarah Edo**: `sarahedo` / `password123`
- **Tyler McGinnis**: `tylermcginnis` / `abc321`
- **Mike Tsamis**: `mtsamis` / `xyz123`

## How to Use

### Logging In

1. Go to the login page
2. Select a user from the dropdown
3. Enter the corresponding password
4. Click "Sign In"

### Viewing Polls

- The home page displays polls in two categories:
  - **Unanswered Polls**: Polls you haven't voted on yet (default view)
  - **Answered Polls**: Polls you've already answered
- Polls are sorted by most recent first
- Click "View Poll" to see details and vote

### Voting on Polls

1. Click on an unanswered poll
2. Select either Option A or Option B
3. Click "Submit Vote"
4. View the results with vote counts and percentages
5. Your choice will be highlighted

### Creating New Polls

1. Click "New Poll" in the navigation
2. Enter text for both options (minimum 5 characters each)
3. Options must be different from each other
4. Click "Create Poll"
5. You'll be redirected to the home page where your new poll appears

### Viewing the Leaderboard

1. Click "Leaderboard" in the navigation
2. See all users ranked by their total activity
3. Rankings are based on questions asked + questions answered
4. View individual stats for questions asked, answered, and total score

## Technical Stack

- **Frontend**: React 19, TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Testing**: Jest, React Testing Library (configured)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AppLayout.tsx    # Main layout wrapper
│   ├── LoginPage.tsx    # Authentication page
│   ├── Navigation.tsx   # Navigation bar
│   ├── PollCard.tsx     # Poll preview card
│   └── ProtectedRoute.tsx # Route protection
├── features/            # Redux slices
│   ├── auth/           # Authentication state
│   ├── questions/      # Questions state
│   └── users/          # Users state
├── store/              # Redux store configuration
├── utils/              # Utility functions and data
└── __tests__/          # Test files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run typecheck` - Run TypeScript checks

## Data Structure

The application uses a simulated database with the following structure:

### Users

```typescript
{
  id: string;
  name: string;
  avatarURL: string;
  answers: Record<string, 'optionOne' | 'optionTwo'>;
  questions: string[];
}
```

### Questions

```typescript
{
  id: string;
  author: string;
  timestamp: number;
  optionOne: {
    votes: string[];
    text: string;
  };
  optionTwo: {
    votes: string[];
    text: string;
  };
}
```

## Security Note

This is a demo application with simplified authentication. In a production environment, you would implement proper authentication with secure password handling, JWT tokens, and server-side validation.

## Browser Support

This application works in all modern browsers that support ES2022 features.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is for educational purposes as part of the Udacity React Nanodegree program.
