// Exports

export interface ReturnObject <T> {
    status: boolean;
    data: T;
    error: string;
}

export interface ColumnConfiguration {
    name: string;
    type: string;
}

export interface TableConfiguration {
    name: string;
    columns: ColumnConfiguration[];
}

export interface DatabaseConfiguration {
    name: string;
    tables: TableConfiguration[];
}