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

      // Test 3 Page - Form & Table
      'formTable.header': 'Form & Table',
      'formTable.home': 'Home',

      // Form Labels
      'form.title': 'Title',
      'form.firstname': 'Firstname',
      'form.lastname': 'Lastname',
      'form.birthday': 'Birthday',
      'form.nationality': 'Nationality',
      'form.citizenId': 'CitizenID',
      'form.gender': 'Gender',
      'form.mobilePhone': 'Mobile Phone',
      'form.passportNo': 'Passport No',
      'form.expectedSalary': 'Expected Salary',

      // Form Options
      'form.selectTitle': 'Title',
      'form.mr': 'Mr.',
      'form.mrs': 'Mrs.',
      'form.ms': 'Ms.',
      'form.male': 'Male',
      'form.female': 'Female',
      'form.unspecified': 'Unsex',
      'form.pleaseSelect': 'Please Select',

      // Nationalities
      'nationality.thai': 'Thai',
      'nationality.american': 'American',
      'nationality.british': 'British',
      'nationality.chinese': 'Chinese',
      'nationality.japanese': 'Japanese',
      'nationality.korean': 'Korean',
      'nationality.other': 'Other',

      // Form Buttons
      'form.reset': 'RESET',
      'form.submit': 'SUBMIT',
      'form.update': 'UPDATE',

      // Table
      'table.name': 'Name',
      'table.gender': 'Gender',
      'table.mobilePhone': 'Mobile Phone',
      'table.nationality': 'Nationality',
      'table.manage': 'MANAGE',
      'table.edit': 'EDIT',
      'table.delete': 'DELETE',
      'table.selectAll': 'Select All',
      'table.prev': 'PREV',
      'table.next': 'NEXT',

      // Validation
      'validation.required': 'This field is required',

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

      // Test 3 Page - Form & Table
      'formTable.header': 'การจัดการหน้าฟอร์ม',
      'formTable.home': 'หน้าหลัก',

      // Form Labels
      'form.title': 'คำนำหน้า',
      'form.firstname': 'ชื่อจริง',
      'form.lastname': 'นามสกุล',
      'form.birthday': 'วันเกิด',
      'form.nationality': 'สัญชาติ',
      'form.citizenId': 'เลขบัตรประชาชน',
      'form.gender': 'เพศ',
      'form.mobilePhone': 'หมายเลขโทรศัพท์',
      'form.passportNo': 'หนังสือเดินทาง',
      'form.expectedSalary': 'เงินเดือนที่คาดหวัง',

      // Form Options
      'form.selectTitle': 'คำนำหน้า',
      'form.mr': 'นาย',
      'form.mrs': 'นาง',
      'form.ms': 'นางสาว',
      'form.male': 'ผู้ชาย',
      'form.female': 'ผู้หญิง',
      'form.unspecified': 'ไม่ระบุ',
      'form.pleaseSelect': 'กรุณาเลือก',

      // Nationalities
      'nationality.thai': 'ไทย',
      'nationality.american': 'อเมริกัน',
      'nationality.british': 'อังกฤษ',
      'nationality.chinese': 'จีน',
      'nationality.japanese': 'ญี่ปุ่น',
      'nationality.korean': 'เกาหลี',
      'nationality.other': 'อื่นๆ',

      // Form Buttons
      'form.reset': 'ล้างข้อมูล',
      'form.submit': 'ส่งข้อมูล',
      'form.update': 'อัปเดต',

      // Table
      'table.name': 'ชื่อ',
      'table.gender': 'เพศ',
      'table.mobilePhone': 'หมายเลขโทรศัพท์',
      'table.nationality': 'สัญชาติ',
      'table.manage': 'จัดการ',
      'table.edit': 'แก้ไข',
      'table.delete': 'ลบ',
      'table.selectAll': 'เลือกทั้งหมด',
      'table.prev': 'ก่อนหน้า',
      'table.next': 'ถัดไป',

      // Validation
      'validation.required': 'กรุณากรอกข้อมูล',

      // Language
      'language': 'ภาษา',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
