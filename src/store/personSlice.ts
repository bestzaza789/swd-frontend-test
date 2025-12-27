import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from '../types/person';

// LocalStorage key
const STORAGE_KEY = 'personData';

// Mock data - 5 people
const mockData: Person[] = [
    {
        id: 'mock-1',
        title: 'mr',
        firstname: 'Test',
        lastname: 'Test',
        birthday: '1990-01-15T00:00:00.000Z',
        nationality: 'thai',
        citizenId: ['1', '2345', '67890', '12', '3'],
        gender: 'male',
        countryCode: '+66',
        phone: '0123456789',
        passportNo: '',
        expectedSalary: 50000,
    },
    {
        id: 'mock-2',
        title: 'mrs',
        firstname: 'Jane',
        lastname: 'Doe',
        birthday: '1985-05-20T00:00:00.000Z',
        nationality: 'american',
        citizenId: ['2', '3456', '78901', '23', '4'],
        gender: 'female',
        countryCode: '+1',
        phone: '5551234567',
        passportNo: 'AB1234567',
        expectedSalary: 75000,
    },
    {
        id: 'mock-3',
        title: 'mr',
        firstname: 'Takeshi',
        lastname: 'Yamamoto',
        birthday: '1992-08-10T00:00:00.000Z',
        nationality: 'japanese',
        citizenId: ['3', '4567', '89012', '34', '5'],
        gender: 'male',
        countryCode: '+81',
        phone: '9012345678',
        passportNo: 'JP9876543',
        expectedSalary: 80000,
    },
    {
        id: 'mock-4',
        title: 'ms',
        firstname: 'Kim',
        lastname: 'Soo-yeon',
        birthday: '1995-12-25T00:00:00.000Z',
        nationality: 'korean',
        citizenId: ['4', '5678', '90123', '45', '6'],
        gender: 'female',
        countryCode: '+82',
        phone: '1098765432',
        passportNo: 'KR1234567',
        expectedSalary: 65000,
    },
    {
        id: 'mock-5',
        title: 'mr',
        firstname: 'Wei',
        lastname: 'Zhang',
        birthday: '1988-03-30T00:00:00.000Z',
        nationality: 'chinese',
        citizenId: ['5', '6789', '01234', '56', '7'],
        gender: 'male',
        countryCode: '+86',
        phone: '13812345678',
        passportNo: 'CN7654321',
        expectedSalary: 70000,
    },
    {
        id: 'mock-6',
        title: 'mr',
        firstname: 'James',
        lastname: 'Smith',
        birthday: '1991-07-12T00:00:00.000Z',
        nationality: 'british',
        citizenId: ['6', '7890', '12345', '67', '8'],
        gender: 'male',
        countryCode: '+44',
        phone: '7712345678',
        passportNo: 'GB1234567',
        expectedSalary: 85000,
    },
    {
        id: 'mock-7',
        title: 'ms',
        firstname: 'Somchai',
        lastname: 'Jaidee',
        birthday: '1993-09-18T00:00:00.000Z',
        nationality: 'thai',
        citizenId: ['7', '8901', '23456', '78', '9'],
        gender: 'unspecified',
        countryCode: '+66',
        phone: '0891234567',
        passportNo: '',
        expectedSalary: 45000,
    },
];

// Load initial state from localStorage
const loadFromStorage = (): Person[] => {
    if (typeof window === 'undefined') return [];
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            const parsed = JSON.parse(data);
            return parsed.length > 0 ? parsed : mockData;
        }
        // Return mock data if localStorage is empty
        return mockData;
    } catch {
        return mockData;
    }
};

// Save to localStorage
const saveToStorage = (people: Person[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
};

interface PersonState {
    people: Person[];
    editingId: string | null;
}

const initialState: PersonState = {
    people: [],
    editingId: null,
};

const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
        // Load data from localStorage (call on app init)
        initializeFromStorage: (state) => {
            state.people = loadFromStorage();
        },

        // Add new person
        addPerson: (state, action: PayloadAction<Person>) => {
            state.people.push(action.payload);
            saveToStorage(state.people);
        },

        // Update existing person
        updatePerson: (state, action: PayloadAction<Person>) => {
            const index = state.people.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.people[index] = action.payload;
                saveToStorage(state.people);
            }
            state.editingId = null;
        },

        // Delete single person
        deletePerson: (state, action: PayloadAction<string>) => {
            state.people = state.people.filter(p => p.id !== action.payload);
            saveToStorage(state.people);
        },

        // Bulk delete
        bulkDelete: (state, action: PayloadAction<string[]>) => {
            state.people = state.people.filter(p => !action.payload.includes(p.id));
            saveToStorage(state.people);
        },

        // Set editing ID
        setEditingId: (state, action: PayloadAction<string | null>) => {
            state.editingId = action.payload;
        },
    },
});

export const {
    initializeFromStorage,
    addPerson,
    updatePerson,
    deletePerson,
    bulkDelete,
    setEditingId,
} = personSlice.actions;

export default personSlice.reducer;
