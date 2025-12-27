'use client';

import React from 'react';
import '@/styles/shapes.scss';

// Shape type definitions
export type ShapeType =
    | 'square'
    | 'circle'
    | 'oval'
    | 'trapezoid'
    | 'rectangle'
    | 'parallelogram'
    | 'triangle-up'
    | 'triangle-down'
    | 'triangle-left'
    | 'triangle-right';

interface ShapeProps {
    type: ShapeType;
}

// Individual shape components
export const Square: React.FC = () => (
    <div className="shape-container">
        <div className="shape-square" />
    </div>
);

export const Circle: React.FC = () => (
    <div className="shape-container">
        <div className="shape-circle" />
    </div>
);

export const Oval: React.FC = () => (
    <div className="shape-container">
        <div className="shape-oval" />
    </div>
);

export const Rectangle: React.FC = () => (
    <div className="shape-container">
        <div className="shape-rectangle" />
    </div>
);

export const Trapezoid: React.FC = () => (
    <div className="shape-container">
        <div className="shape-trapezoid-container" />
    </div>
);

export const Parallelogram: React.FC = () => (
    <div className="shape-container">
        <div className="shape-parallelogram" />
    </div>
);

export const TriangleUp: React.FC = () => (
    <div className="shape-container">
        <div className="shape-triangle-up" />
    </div>
);

export const TriangleDown: React.FC = () => (
    <div className="shape-container">
        <div className="shape-triangle-down" />
    </div>
);

export const TriangleLeft: React.FC = () => (
    <div className="shape-container">
        <div className="shape-triangle-left" />
    </div>
);

export const TriangleRight: React.FC = () => (
    <div className="shape-container">
        <div className="shape-triangle-right" />
    </div>
);

// Shape renderer that takes a type and renders the appropriate shape
export const Shape: React.FC<ShapeProps> = ({ type }) => {
    const shapeComponents: Record<ShapeType, React.FC> = {
        'square': Square,
        'circle': Circle,
        'oval': Oval,
        'trapezoid': Trapezoid,
        'rectangle': Rectangle,
        'parallelogram': Parallelogram,
        'triangle-up': TriangleUp,
        'triangle-down': TriangleDown,
        'triangle-left': TriangleLeft,
        'triangle-right': TriangleRight,
    };

    const ShapeComponent = shapeComponents[type];
    return ShapeComponent ? <ShapeComponent /> : null;
};

export default Shape;
