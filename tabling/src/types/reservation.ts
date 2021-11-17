export interface CUSTOMER {
    id: string;
    name: string;
    level: string;
    timeVisitedLast: string;
    adult: number;
    child: number;
    memo: string;
    request: string;
}

export interface TABLE {
    id: number;
    floor: number;
    name: string;
    min: number;
    max: number;
}

export interface MENU {
    id: string;
    name: string;
    qty: number;
}

export interface RESERVATION {
    id: string;
    status: string;
    timeRegistered: string;
    timeReserved: string;
    customer: CUSTOMER;
    tables: TABLE[];
    menus: MENU[];
}
