import { useEffect, useRef, useState } from 'react';
import type { WebSocketMessage, ActiveTrackState } from '@/lib/websocket/types';

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:8080';

export function useActiveTrack() {
    const [state, setState] = useState<ActiveTrackState>({
        trackName: null,
        isConnected: false,
        error: null,
    });

    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const connect = () => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            return;
        }

        try {
            const ws = new WebSocket(WEBSOCKET_URL);
            wsRef.current = ws;

            ws.onopen = () => {
                console.log('WebSocket connected');
                setState(prev => ({
                    ...prev,
                    isConnected: true,
                    error: null,
                }));
            };

            ws.onmessage = (event: MessageEvent<string>) => {
                try {
                    const parsedData = JSON.parse(event.data) as WebSocketMessage;

                    if (parsedData.type === 'ACTIVE_TRACK_UPDATE') {
                        setState(prev => ({
                            ...prev,
                            trackName: parsedData.data.trackName,
                        }));
                    }
                } catch (error) {
                    console.error('Failed to parse WebSocket message:', error);
                }
            };

            ws.onclose = () => {
                console.log('WebSocket disconnected');
                setState(prev => ({
                    ...prev,
                    isConnected: false,
                }));

                reconnectTimeoutRef.current = setTimeout(() => {
                    connect();
                }, 3000);
            };

            ws.onerror = (error: Event) => {
                console.error('WebSocket error:', error);
                setState(prev => ({
                    ...prev,
                    error: 'Connection failed',
                    isConnected: false,
                }));
            };
        } catch (error) {
            console.error('Failed to create WebSocket connection:', error);
            setState(prev => ({
                ...prev,
                error: 'Failed to connect',
                isConnected: false,
            }));
        }
    };

    const disconnect = () => {
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
        }

        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }

        setState({
            trackName: null,
            isConnected: false,
            error: null,
        });
    };

    const isConnected = () => {
        return wsRef.current?.readyState === WebSocket.OPEN;
    };

    useEffect(() => {
        connect();

        return () => {
            disconnect();
        };
    }, []);

    return {
        ...state,
        connect,
        disconnect,
        isConnected,
    };
} 