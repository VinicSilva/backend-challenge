export const fakeFirstPlace: any = {
    id: 1,
    name: "Morumbi",
    country: "Brazil",
    goal: "06/2023",
    flagUrl: "any_flagUrl",
    createdAt: "2022-07-15 00:00:00.123",
    updatedAt: "2022-07-15 00:00:00.456",
};

export const fakePlaces: any = [
    {
        ...fakeFirstPlace
    },
    {
        id: 2,
        name: "Jericoacoara",
        country: "Brazil",
        goal: "11/2022",
        flagUrl: "any_flagUrl",
        createdAt: "2022-07-15 06:00:00.123",
        updatedAt: "2022-07-15 06:00:00.456",
    }
];

export const savedFakePlace: any = {
    id: 3,
    name: "Dubai",
    country: "Qatar",
    goal: "02/2026",
    flagUrl: "any_flagUrl",
    createdAt: "2022-07-18 06:04:00.123",
    updatedAt: "2022-07-18 06:04:00.456",
};

export const updatedFakePlace: any = {
    id: 1,
    name: "Santos",
    country: "Brazil",
    goal: "10/2023",
    flagUrl: "any_flagUrl",
    createdAt: "2022-07-15 00:00:00.123",
    updatedAt: "2022-07-18 00:00:00.456",
};

export const mockPlaceRepository = {
    find: jest.fn(() => Promise.resolve(fakePlaces)),
    findOne: jest.fn(() => Promise.resolve(fakeFirstPlace)),
    create: jest.fn(() => Promise.resolve(savedFakePlace)),
    save: jest.fn(() => Promise.resolve({})),
    update: jest.fn(() => Promise.resolve(updatedFakePlace)),
    delete: jest.fn(() => Promise.resolve({ affected: true })),
};
