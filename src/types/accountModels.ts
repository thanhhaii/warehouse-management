export type Role = {
    id: number;
    role: string;
};

export type AccountModel = {
    id: string;
    fullName: string;
    phone: string;
    individualCard: string;
    email: string;
    role: Role[];
    active?: boolean;
    address: string;
};
