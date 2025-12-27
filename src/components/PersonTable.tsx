'use client';

import React, { useState } from 'react';
import { Table, Button, Checkbox, Space, Pagination } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deletePerson, bulkDelete, setEditingId } from '../store/personSlice';
import { Person } from '../types/person';

const PersonTable: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { people } = useAppSelector(state => state.person);

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    // Handle select all
    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(people.map(p => p.id));
        } else {
            setSelectedIds([]);
        }
    };

    // Handle single select
    const handleSelect = (id: string, checked: boolean) => {
        if (checked) {
            setSelectedIds([...selectedIds, id]);
        } else {
            setSelectedIds(selectedIds.filter(i => i !== id));
        }
    };

    // Handle bulk delete
    const handleBulkDelete = () => {
        dispatch(bulkDelete(selectedIds));
        setSelectedIds([]);
    };

    // Handle single delete
    const handleDelete = (id: string) => {
        dispatch(deletePerson(id));
        setSelectedIds(selectedIds.filter(i => i !== id));
    };

    // Handle edit
    const handleEdit = (id: string) => {
        dispatch(setEditingId(id));
        // Scroll to top to show form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Get gender display text
    const getGenderText = (gender: string) => {
        switch (gender) {
            case 'male': return t('form.male');
            case 'female': return t('form.female');
            default: return t('form.unspecified');
        }
    };

    // Get nationality display text
    const getNationalityText = (nationality: string) => {
        return t(`nationality.${nationality}`);
    };

    // Calculate pagination
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPeople = people.slice(startIndex, endIndex);
    const totalPages = Math.ceil(people.length / pageSize);

    const columns = [
        {
            title: '',
            key: 'select',
            width: 50,
            render: (_: any, record: Person) => (
                <Checkbox
                    checked={selectedIds.includes(record.id)}
                    onChange={(e) => handleSelect(record.id, e.target.checked)}
                />
            ),
        },
        {
            title: t('table.name'),
            key: 'name',
            sorter: (a: Person, b: Person) =>
                `${a.firstname} ${a.lastname}`.localeCompare(`${b.firstname} ${b.lastname}`),
            render: (_: any, record: Person) => `${record.firstname} ${record.lastname}`,
        },
        {
            title: t('table.gender'),
            key: 'gender',
            sorter: (a: Person, b: Person) => a.gender.localeCompare(b.gender),
            render: (_: any, record: Person) => getGenderText(record.gender),
        },
        {
            title: t('table.mobilePhone'),
            key: 'phone',
            render: (_: any, record: Person) => `${record.countryCode}${record.phone}`,
        },
        {
            title: t('table.nationality'),
            key: 'nationality',
            sorter: (a: Person, b: Person) => a.nationality.localeCompare(b.nationality),
            render: (_: any, record: Person) => getNationalityText(record.nationality),
        },
        {
            title: t('table.manage'),
            key: 'manage',
            render: (_: any, record: Person) => (
                <Space>
                    <Button type="link" onClick={() => handleEdit(record.id)}>
                        {t('table.edit')}
                    </Button>
                    <Button type="link" onClick={() => handleDelete(record.id)}>
                        {t('table.delete')}
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="person-table-container">
            {/* Select All & Delete */}
            <div className="table-actions">
                <Checkbox
                    checked={selectedIds.length === people.length && people.length > 0}
                    indeterminate={selectedIds.length > 0 && selectedIds.length < people.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                >
                    {t('table.selectAll')}
                </Checkbox>
                <Button
                    onClick={handleBulkDelete}
                    disabled={selectedIds.length === 0}
                    style={{ marginLeft: 16 }}
                >
                    {t('table.delete')}
                </Button>
            </div>

            {/* Custom Pagination at top-right */}
            <div className="table-pagination-top">
                <span
                    className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                >
                    {t('table.prev')}
                </span>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <span
                        key={page}
                        className={`pagination-page ${page === currentPage ? 'active' : ''}`}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </span>
                ))}
                <span
                    className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                >
                    {t('table.next')}
                </span>
            </div>

            {/* Table */}
            <Table
                columns={columns}
                dataSource={paginatedPeople}
                rowKey="id"
                pagination={false}
                className="person-table"
            />
        </div>
    );
};

export default PersonTable;
