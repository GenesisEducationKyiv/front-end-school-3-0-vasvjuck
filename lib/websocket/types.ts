export interface WebSocketMessage {
    type: 'ACTIVE_TRACK_UPDATE';
    data: { trackName: string; };
}

export interface ActiveTrackState {
    trackName: string | null;
    isConnected: boolean;
    error: string | null;
}

export interface WebSocketClient {
    connect: () => void;
    disconnect: () => void;
    isConnected: () => boolean;
} 