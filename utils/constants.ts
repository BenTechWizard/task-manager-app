// Exports

export const columnDataTypes = {
    id: 'SERIAL PRIMARY KEY',
    uuid: 'UUID DEFAULT gen_random_uuid()',
    text: 'TEXT',
    varchar: (n: number = 255) => `VARCHAR(${n})`,
    integer: 'INTEGER',
    bigInt: 'BIGINT',
    decimal: (p: number = 10, s: number = 2) => `DECIMAL(${p}, ${s})`,
    float: 'REAL',
    boolean: 'BOOLEAN',
    date: 'DATE',
    time: 'TIME',
    timeWithZone: 'TIME WITH TIME ZONE',
    timestamp: 'TIMESTAMP',
    timestampWithZone: 'TIMESTAMP WITH TIME ZONE',
    interval: 'INTERVAL',
    json: 'JSON',
    jsonb: 'JSONB',
    array: (type: string) => `${type}[]`,
    bytea: 'BYTEA',
};
