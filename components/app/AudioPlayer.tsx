import React from 'react';

interface AudioPlayerProps {
    trackId: string;
    isPlaying: boolean;
    onToggle: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
    trackId,
    isPlaying,
    onToggle,
}) => {
    return (
        <div data-testid={`audio-player-${trackId}`}>
            <button
                data-testid={!isPlaying ? `play-button-${trackId}` : `pause-button-${trackId}`}
                onClick={onToggle}
                className="absolute inset-0 m-auto flex items-center justify-center gap-0.5 bg-secondary rounded-full w-[42px] h-[42px]"
            >
                {isPlaying ? (
                    <React.Fragment data-testid={`audio-progress-${trackId}`}>
                        {[1, 2, 3, 4].map(bar => (
                            <div
                                key={bar}
                                className="indicator-line active"
                                style={{ animationDelay: `${bar * 0.1}s` }}
                            />
                        ))}
                    </React.Fragment>
                ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5,3 19,12 5,21" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default AudioPlayer; 