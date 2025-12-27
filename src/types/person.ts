// Person interface
export interface Person {
    id: string;
    title: string;
    firstname: string;
    lastname: string;
    birthday: string; // ISO string for localStorage compatibility
    nationality: string;
    citizenId: string[]; // 5 parts: [x, xxxx, xxxxx, xx, x]
    gender: 'male' | 'female' | 'unspecified';
    countryCode: string;
    phone: string;
    passportNo?: string;
    expectedSalary: number;
}

// Form values interface (for Ant Design Form)
export interface PersonFormValues {
    title: string;
    firstname: string;
    lastname: string;
    birthday: any; // dayjs object
    nationality: string;
    citizenId1: string;
    citizenId2: string;
    citizenId3: string;
    citizenId4: string;
    citizenId5: string;
    gender: 'male' | 'female' | 'unspecified';
    countryCode: string;
    phone: string;
    passportNo?: string;
    expectedSalary: number;
}
