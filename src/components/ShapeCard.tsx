'use client';

import React from 'react';
import { Card } from 'antd';

interface ShapeCardProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

const ShapeCard: React.FC<ShapeCardProps> = ({ children, onClick, className }) => {
    return (
        <Card
            className={`shape-card ${className || ''}`}
            onClick={onClick}
            hoverable
        >
            {children}
        </Card>
    );
};

export default ShapeCard;
