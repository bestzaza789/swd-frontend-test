'use client';

import React, { useEffect, useRef } from 'react';
import { Form, Input, Select, DatePicker, Radio, InputNumber, Button, Card, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addPerson, updatePerson, setEditingId } from '../store/personSlice';
import { Person, PersonFormValues } from '../types/person';

const { Option } = Select;

// Generate unique ID
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const PersonForm: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();

    const { people, editingId } = useAppSelector(state => state.person);
    const editingPerson = editingId ? people.find(p => p.id === editingId) : null;

    // Refs for CitizenID auto-focus
    const citizenIdRefs = [
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
    ];

    // CitizenID field max lengths
    const citizenIdMaxLengths = [1, 4, 5, 2, 1];

    // Load editing person data into form
    useEffect(() => {
        if (editingPerson) {
            form.setFieldsValue({
                title: editingPerson.title,
                firstname: editingPerson.firstname,
                lastname: editingPerson.lastname,
                birthday: dayjs(editingPerson.birthday),
                nationality: editingPerson.nationality,
                citizenId1: editingPerson.citizenId[0],
                citizenId2: editingPerson.citizenId[1],
                citizenId3: editingPerson.citizenId[2],
                citizenId4: editingPerson.citizenId[3],
                citizenId5: editingPerson.citizenId[4],
                gender: editingPerson.gender,
                countryCode: editingPerson.countryCode,
                phone: editingPerson.phone,
                passportNo: editingPerson.passportNo,
                expectedSalary: editingPerson.expectedSalary,
            });
        }
    }, [editingPerson, form]);

    // Handle CitizenID auto-focus
    const handleCitizenIdChange = (index: number, value: string) => {
        const maxLength = citizenIdMaxLengths[index];
        if (value.length >= maxLength && index < 4) {
            // Focus next input
            citizenIdRefs[index + 1].current?.focus();
        }
    };

    // Handle form submit
    const onFinish = (values: PersonFormValues) => {
        const person: Person = {
            id: editingId || generateId(),
            title: values.title,
            firstname: values.firstname,
            lastname: values.lastname,
            birthday: values.birthday.toISOString(),
            nationality: values.nationality,
            citizenId: [
                values.citizenId1 || '',
                values.citizenId2 || '',
                values.citizenId3 || '',
                values.citizenId4 || '',
                values.citizenId5 || '',
            ],
            gender: values.gender,
            countryCode: values.countryCode,
            phone: values.phone,
            passportNo: values.passportNo,
            expectedSalary: values.expectedSalary,
        };

        if (editingId) {
            dispatch(updatePerson(person));
        } else {
            dispatch(addPerson(person));
        }

        form.resetFields();
    };

    // Handle reset
    const handleReset = () => {
        form.resetFields();
        dispatch(setEditingId(null));
    };

    return (
        <Card className="form-card">
            <Form
                form={form}
                layout="horizontal"
                onFinish={onFinish}
                initialValues={{
                    countryCode: '+66',
                    gender: 'male',
                }}
            >
                {/* Row 1: Title, Firstname, Lastname */}
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item
                            name="title"
                            label={t('form.title')}
                            rules={[{ required: true, message: t('validation.required') }]}
                        >
                            <Select placeholder={t('form.selectTitle')}>
                                <Option value="mr">{t('form.mr')}</Option>
                                <Option value="mrs">{t('form.mrs')}</Option>
                                <Option value="ms">{t('form.ms')}</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={9}>
                        <Form.Item
                            name="firstname"
                            label={t('form.firstname')}
                            rules={[{ required: true, message: t('validation.required') }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={9}>
                        <Form.Item
                            name="lastname"
                            label={t('form.lastname')}
                            rules={[{ required: true, message: t('validation.required') }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Row 2: Birthday, Nationality */}
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="birthday"
                            label={t('form.birthday')}
                            rules={[{ required: true, message: t('validation.required') }]}
                        >
                            <DatePicker style={{ width: '100%' }} format="MM/DD/YYYY" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="nationality"
                            label={t('form.nationality')}
                            rules={[{ required: true, message: t('validation.required') }]}
                        >
                            <Select placeholder={t('form.pleaseSelect')}>
                                <Option value="thai">{t('nationality.thai')}</Option>
                                <Option value="american">{t('nationality.american')}</Option>
                                <Option value="british">{t('nationality.british')}</Option>
                                <Option value="chinese">{t('nationality.chinese')}</Option>
                                <Option value="japanese">{t('nationality.japanese')}</Option>
                                <Option value="korean">{t('nationality.korean')}</Option>
                                <Option value="other">{t('nationality.other')}</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                {/* Row 3: CitizenID (5 inputs) */}
                <Row gutter={8} align="middle">
                    <Col>
                        <span className="form-label">{t('form.citizenId')}:</span>
                    </Col>
                    <Col span={2}>
                        <Form.Item name="citizenId1" noStyle>
                            <Input
                                ref={citizenIdRefs[0]}
                                maxLength={1}
                                onChange={(e) => handleCitizenIdChange(0, e.target.value)}
                                style={{ textAlign: 'center' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col><span>-</span></Col>
                    <Col span={4}>
                        <Form.Item name="citizenId2" noStyle>
                            <Input
                                ref={citizenIdRefs[1]}
                                maxLength={4}
                                onChange={(e) => handleCitizenIdChange(1, e.target.value)}
                                style={{ textAlign: 'center' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col><span>-</span></Col>
                    <Col span={5}>
                        <Form.Item name="citizenId3" noStyle>
                            <Input
                                ref={citizenIdRefs[2]}
                                maxLength={5}
                                onChange={(e) => handleCitizenIdChange(2, e.target.value)}
                                style={{ textAlign: 'center' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col><span>-</span></Col>
                    <Col span={3}>
                        <Form.Item name="citizenId4" noStyle>
                            <Input
                                ref={citizenIdRefs[3]}
                                maxLength={2}
                                onChange={(e) => handleCitizenIdChange(3, e.target.value)}
                                style={{ textAlign: 'center' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col><span>-</span></Col>
                    <Col span={2}>
                        <Form.Item name="citizenId5" noStyle>
                            <Input
                                ref={citizenIdRefs[4]}
                                maxLength={1}
                                style={{ textAlign: 'center' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Row 4: Gender */}
                <Row gutter={16} style={{ marginTop: 16 }}>
                    <Col span={24}>
                        <Form.Item
                            name="gender"
                            label={t('form.gender')}
                            rules={[{ required: true, message: t('validation.required') }]}
                        >
                            <Radio.Group>
                                <Radio value="male">{t('form.male')}</Radio>
                                <Radio value="female">{t('form.female')}</Radio>
                                <Radio value="unspecified">{t('form.unspecified')}</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>

                {/* Row 5: Mobile Phone */}
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item
                            name="countryCode"
                            label={t('form.mobilePhone')}
                        >
                            <Select style={{ width: '100%' }}>
                                <Option value="+66">
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <img src="https://flagcdn.com/w20/th.png" alt="TH" style={{ width: '20px', height: 'auto' }} /> +66
                                    </span>
                                </Option>
                                <Option value="+1">
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <img src="https://flagcdn.com/w20/us.png" alt="US" style={{ width: '20px', height: 'auto' }} /> +1
                                    </span>
                                </Option>
                                <Option value="+44">
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <img src="https://flagcdn.com/w20/gb.png" alt="GB" style={{ width: '20px', height: 'auto' }} /> +44
                                    </span>
                                </Option>
                                <Option value="+81">
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <img src="https://flagcdn.com/w20/jp.png" alt="JP" style={{ width: '20px', height: 'auto' }} /> +81
                                    </span>
                                </Option>
                                <Option value="+82">
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <img src="https://flagcdn.com/w20/kr.png" alt="KR" style={{ width: '20px', height: 'auto' }} /> +82
                                    </span>
                                </Option>
                                <Option value="+86">
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <img src="https://flagcdn.com/w20/cn.png" alt="CN" style={{ width: '20px', height: 'auto' }} /> +86
                                    </span>
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col><span style={{ lineHeight: '32px' }}>-</span></Col>
                    <Col span={10}>
                        <Form.Item
                            name="phone"
                            rules={[{ required: true, message: t('validation.required') }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Row 6: Passport No */}
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="passportNo"
                            label={t('form.passportNo')}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Row 7: Expected Salary + Buttons */}
                <Row gutter={16} justify="space-between" align="middle">
                    <Col span={12}>
                        <Form.Item
                            name="expectedSalary"
                            label={t('form.expectedSalary')}
                            rules={[{ required: true, message: t('validation.required') }]}
                        >
                            <InputNumber style={{ width: '100%' }} min={0} />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Button onClick={handleReset} style={{ marginRight: 8 }}>
                            {t('form.reset')}
                        </Button>
                        <Button type="primary" htmlType="submit">
                            {editingId ? t('form.update') : t('form.submit')}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export default PersonForm;
