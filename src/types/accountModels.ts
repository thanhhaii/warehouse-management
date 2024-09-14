export type Role = {
    id: number;
    name: string;
};

export type AccountModel = {
    id: number;
    fullName: string;
    phoneNumber: string;
    individualCard: string;
    email: string;
    roles: Role[];
    active?: boolean;
    address: string;
    password: string;
    username: string;
};
