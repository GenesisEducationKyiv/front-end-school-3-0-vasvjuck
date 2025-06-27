# Musicvvv - Real-time Music Track Management

A modern music track management application with real-time active track display functionality.

## Features

- **Real-time Active Track Display**: Shows the currently playing track with live updates via WebSocket
- **Track Management**: Create, edit, delete, and organize music tracks
- **Advanced Filtering**: Search, sort, and filter tracks by various criteria
- **Bulk Operations**: Select and perform actions on multiple tracks
- **Responsive Design**: Modern UI that works on desktop and mobile devices

## Real-time Active Track Feature

The application includes a real-time active track display that:
- Shows the currently playing track name
- Updates automatically every 1-2 seconds via WebSocket
- Displays connection status (Connected, Connecting, Error)
- Automatically reconnects if the connection is lost

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Set up environment variables:
```bash
# Create .env.local file
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:8080
```

### Running the Application

1. **Start the WebSocket Server** (for real-time active track updates):
```bash
npm run websocket-server
# or
yarn websocket-server
```

2. **Start the Next.js Development Server**:
```bash
npm run dev
# or
yarn dev
```

3. **Start your API Server** (backend):
```bash
# Start your backend server on port 3001
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── app/               # Application-specific components
│   │   ├── ActiveTrackDisplay.tsx  # Real-time track display
│   │   └── ...
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
│   ├── api/               # API-related hooks
│   │   └── useActiveTrack.ts  # WebSocket hook for active track
│   └── common/            # Common utility hooks
├── lib/                   # Utility libraries
│   ├── websocket/         # WebSocket-related code
│   │   ├── server.js      # WebSocket server
│   │   └── types.ts       # TypeScript types
│   └── ...
└── store/                 # State management (Zustand)
```

## WebSocket Server

The WebSocket server (`lib/websocket/server.js`) provides real-time active track updates:

- **Port**: 8080 (configurable via environment)
- **Protocol**: WebSocket
- **Message Format**: JSON with `type` and `data` fields
- **Auto-reconnection**: Client automatically reconnects on disconnection
- **Random Track Updates**: Changes active track every 1-2 seconds

### WebSocket Message Format

```json
{
  "type": "ACTIVE_TRACK_UPDATE",
  "data": {
    "trackName": "Bohemian Rhapsody - Queen"
  }
}
```

## Development

### Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run websocket-server` - Start WebSocket server
- `npm run generate:types` - Generate TypeScript types from OpenAPI spec

### Adding New Features

1. **Real-time Features**: Use the existing WebSocket infrastructure
2. **API Integration**: Follow the pattern in `hooks/api/`
3. **State Management**: Use Zustand store in `store/`
4. **UI Components**: Create reusable components in `components/ui/`

## Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **Real-time**: WebSocket (ws library)
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.