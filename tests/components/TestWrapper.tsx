import React from 'react';
import '../../app/globals.css';

interface CtTestsWrapperProps {
    children: React.ReactNode;
}

export const CtTestsWrapper: React.FC<CtTestsWrapperProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {children}
        </div>
    );
}; 