'use client';

import React, { useEffect } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import '@/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import PersonForm from '@/components/PersonForm';
import PersonTable from '@/components/PersonTable';
import ReduxProvider from '@/components/ReduxProvider';
import { useAppDispatch } from '@/store/hooks';
import { initializeFromStorage } from '@/store/personSlice';

// Inner component that uses Redux hooks
function Test3Content() {
    const { t } = useTranslation();
    const router = useRouter();
    const dispatch = useAppDispatch();

    // Load data from localStorage on mount
    useEffect(() => {
        dispatch(initializeFromStorage());
    }, [dispatch]);

    return (
        <div className="page-container test3-page">
            <LanguageSwitcher />

            <Button
                className="home-button"
                onClick={() => router.push('/')}
            >
                {t('formTable.home')}
            </Button>

            <h1 className="page-header">{t('formTable.header')}</h1>

            <div className="test3-content">
                <PersonForm />
                <PersonTable />
            </div>
        </div>
    );
}

// Wrap with Redux Provider
export default function Test3Page() {
    return (
        <ReduxProvider>
            <Test3Content />
        </ReduxProvider>
    );
}
