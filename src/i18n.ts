'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Home Page
      'test1.title': 'Test 1',
      'test1.description': 'Layout & Style',
      'test2.title': 'Test 2',
      'test2.description': 'Connect API',
      'test3.title': 'Test 3',
      'test3.description': 'Form & Table',
      
      // Test 1 Page
      'layoutStyle.header': 'Layout & Style',
      'layoutStyle.moveShape': 'Move shape',
      'layoutStyle.movePosition': 'Move position',
      
      // Language
      'language': 'Language',
    }
  },
  th: {
    translation: {
      // Home Page
      'test1.title': 'แบบทดสอบที่ 1',
      'test1.description': 'การจัดการหน้าเว็บ',
      'test2.title': 'แบบทดสอบที่ 2',
      'test2.description': 'การเชื่อมต่อ API',
      'test3.title': 'แบบทดสอบที่ 3',
      'test3.description': 'การจัดการหน้าฟอร์ม',
      
      // Test 1 Page
      'layoutStyle.header': 'การจัดการหน้าเว็บ',
      'layoutStyle.moveShape': 'เลื่อนรูปแบบ',
      'layoutStyle.movePosition': 'เปลี่ยนตำแหน่ง',
      
      // Language
      'language': 'ภาษา',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'th', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
