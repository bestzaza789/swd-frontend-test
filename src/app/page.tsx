'use client';

import React from 'react';
import { Card, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import '@/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface TestCard {
  key: string;
  titleKey: string;
  descriptionKey: string;
  route: string;
}

const testCards: TestCard[] = [
  { key: '1', titleKey: 'test1.title', descriptionKey: 'test1.description', route: '/test1' },
  { key: '2', titleKey: 'test2.title', descriptionKey: 'test2.description', route: '/test2' },
  { key: '3', titleKey: 'test3.title', descriptionKey: 'test3.description', route: '/test3' },
];

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleCardClick = (route: string) => {
    router.push(route);
  };

  return (
    <div className="page-container">
      <LanguageSwitcher />

      <div className="test-cards-container">
        <Row gutter={[24, 24]} justify="center" align="middle">
          {testCards.map((card) => (
            <Col key={card.key}>
              <Card
                className="test-card"
                onClick={() => handleCardClick(card.route)}
                hoverable
              >
                <div className="card-title">{t(card.titleKey)}</div>
                <div className="card-description">{t(card.descriptionKey)}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
