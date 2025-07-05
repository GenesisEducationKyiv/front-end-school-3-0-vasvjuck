'use client';

import React from 'react';
import { useActiveTrack } from '@/hooks/api/useActiveTrack';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Music, Wifi, WifiOff, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ActiveTrackDisplay() {
    const { trackName, isConnected, error } = useActiveTrack();

    const getConnectionStatus = () => {
        if (error) {
            return {
                icon: AlertCircle,
                text: 'Connection Error',
                className: 'text-red-500',
                badgeVariant: 'destructive' as const,
            };
        }

        if (isConnected) {
            return {
                icon: Wifi,
                text: 'Connected',
                className: 'text-green-500',
                badgeVariant: 'default' as const,
            };
        }

        return {
            icon: WifiOff,
            text: 'Connecting...',
            className: 'text-yellow-500',
            badgeVariant: 'secondary' as const,
        };
    };

    const status = getConnectionStatus();
    const StatusIcon = status.icon;

    return (
        <Card className="w-full max-w-md">
            <CardContent className="p-2">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Music className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">
                            Now Playing
                        </span>
                    </div>
                    <Badge variant={status.badgeVariant} className="text-xs">
                        <StatusIcon className={cn("h-3 w-3 mr-1", status.className)} />
                        {status.text}
                    </Badge>
                </div>

                <div className="min-h-[2.5rem] flex items-center">
                    {trackName ? (
                        <p className="text-lg font-semibold text-foreground leading-tight">
                            {trackName}
                        </p>
                    ) : (
                        <p className="text-sm text-muted-foreground italic">
                            {isConnected ? 'Waiting for track update...' : 'Connecting to server...'}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
} 