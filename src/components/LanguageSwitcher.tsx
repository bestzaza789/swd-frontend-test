'use client';

import React from 'react';
import { Dropdown, Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { MenuProps } from 'antd';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const items: MenuProps['items'] = [
        {
            key: 'en',
            label: 'EN',
        },
        {
            key: 'th',
            label: 'TH',
        },
    ];

    const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
        i18n.changeLanguage(key);
    };

    return (
        <div className="language-switcher">
            <Dropdown
                menu={{ items, onClick: handleMenuClick, selectedKeys: [i18n.language] }}
                placement="bottomRight"
            >
                <Button icon={<GlobalOutlined />}>
                    {i18n.language === 'th' ? 'ไทย' : 'EN'}
                </Button>
            </Dropdown>
        </div>
    );
};

export default LanguageSwitcher;
