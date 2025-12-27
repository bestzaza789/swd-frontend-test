'use client';

import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import '@/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ShapeCard from '@/components/ShapeCard';
import { Shape, ShapeType } from '@/components/shapes/Shapes';
import { TriangleLeft, TriangleRight, TriangleUp, TriangleDown } from '@/components/shapes/Shapes';

// Initial shapes for the grid
const initialShapes: ShapeType[] = [
    'square', 'circle', 'oval',
    'trapezoid', 'rectangle', 'parallelogram'
];

export default function Test1Page() {
    const { t } = useTranslation();
    const router = useRouter();

    // State for shapes array
    const [shapes, setShapes] = useState<ShapeType[]>(initialShapes);
    // State for row alignment toggle (false = row1 left, row2 right; true = row1 right, row2 left)
    const [isAlignmentSwapped, setIsAlignmentSwapped] = useState(false);

    // Move Left: first element goes to end
    const moveLeft = () => {
        setShapes(prev => [...prev.slice(1), prev[0]]);
    };

    // Move Right: last element goes to beginning
    const moveRight = () => {
        setShapes(prev => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    };

    // Move Position: toggle row alignment (left/right offset)
    const movePosition = () => {
        setIsAlignmentSwapped(prev => !prev);
    };

    // Shuffle: random order (called on mouseup after click)
    const shuffleShapes = () => {
        setShapes(prev => [...prev].sort(() => Math.random() - 0.5));
    };

    // Split shapes into two rows (shapes don't change, only alignment changes)
    const row1 = shapes.slice(0, 3);
    const row2 = shapes.slice(3, 6);

    // Row alignment classes - staggered effect
    const row1Class = isAlignmentSwapped ? 'shapes-row shapes-row-right' : 'shapes-row shapes-row-left';
    const row2Class = isAlignmentSwapped ? 'shapes-row shapes-row-left' : 'shapes-row shapes-row-right';

    return (
        <div className="page-container">
            <LanguageSwitcher />

            <Button
                className="back-button"
                icon={<ArrowLeftOutlined />}
                onClick={() => router.push('/')}
            />

            <h1 className="page-header">{t('layoutStyle.header')}</h1>

            {/* Control Cards - 80% width */}
            <div className="control-cards-container">
                {/* Move Shape Left */}
                <Card className="control-card" onClick={moveLeft}>
                    <div className="control-icon">
                        <TriangleLeft />
                    </div>
                    <div className="control-label">{t('layoutStyle.moveShape')}</div>
                </Card>

                {/* Move Position */}
                <Card className="control-card" onClick={movePosition}>
                    <div className="control-icon">
                        <TriangleUp />
                        <TriangleDown />
                    </div>
                    <div className="control-label">{t('layoutStyle.movePosition')}</div>
                </Card>

                {/* Move Shape Right */}
                <Card className="control-card" onClick={moveRight}>
                    <div className="control-icon">
                        <TriangleRight />
                    </div>
                    <div className="control-label">{t('layoutStyle.moveShape')}</div>
                </Card>
            </div>

            {/* Divider line */}
            <div className="divider-line"></div>

            {/* Shapes Grid - 80% width with staggered rows */}
            <div className="shapes-grid">
                {/* Row 1 */}
                <div className={row1Class}>
                    {row1.map((shape, index) => (
                        <ShapeCard
                            key={`row1-${index}`}
                            onClick={shuffleShapes}
                        >
                            <Shape type={shape} />
                        </ShapeCard>
                    ))}
                </div>

                {/* Row 2 */}
                <div className={row2Class}>
                    {row2.map((shape, index) => (
                        <ShapeCard
                            key={`row2-${index}`}
                            onClick={shuffleShapes}
                        >
                            <Shape type={shape} />
                        </ShapeCard>
                    ))}
                </div>
            </div>
        </div>
    );
}
