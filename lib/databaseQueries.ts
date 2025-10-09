// Imports

import { PoolClient } from 'pg';
import { ReturnObject, ColumnConfiguration } from '../types';

// Exports

export async function checkDatabaseConnection(client: PoolClient): Promise<ReturnObject<string | null>> {
    try{
        const result = await client.query('SELECT current_database()');
        const dbName = result.rows[0].current_database;
        return {
            status: true,
            data: dbName,
            error: '',
        };
    } catch (error) {
        return {
            status: false,
            data: null,
            error: error as string,
        };
    }
}

export async function checkIfDatabaseExists(client: PoolClient, databaseName: string): Promise<ReturnObject<boolean>> {
    try{

        const res = await client.query(
            'SELECT 1 FROM pg_database WHERE datname = $1', 
            [databaseName]
        );
        return {
            status: true,
            data: res.rows.length > 0,
            error: '',
        };

    } catch (error) {
        return {
            status: false,
            data: false,
            error: error as string,
        };
    }
}

export async function createDatabase(client: PoolClient, databaseName: string): Promise<ReturnObject<boolean>> {
    try{

        const safeName = databaseName.replace(/[^a-zA-Z0-9_]/g, '');
        await client.query(`CREATE DATABASE "${safeName}"`);

        return {
            status: true,
            data: true,
            error: '',
        };

    } catch (error) {
        return {
            status: false,
            data: false,
            error: error as string,
        };
    }
}

export async function createTable(client: PoolClient, tableName: string, columns: ColumnConfiguration[]): Promise<ReturnObject<boolean>> {
    try{

        const columnDefs = columns.map(col => `"${col.name}" ${col.type}`).join(',\n  ');
        const createTableSQL = `CREATE TABLE IF NOT EXISTS "${tableName}" (\n  ${columnDefs}\n);`;

        await client.query(createTableSQL);

        return {
            status: true,
            data: true,
            error: '',
        };

    } catch (error) {
        return {
            status: false,
            data: false,
            error: error as string,
        };
    }
}

export async function getAllRows(client: PoolClient, tableName: string): Promise<ReturnObject<any[]>> {
    try{

        const result = await client.query(`SELECT * FROM "${tableName}"`);

        return {
            status: true,
            data: result.rows.length > 0 ? result.rows : [],
            error: '',
        };

    } catch (error) {
        return {
            status: false,
            data: [],
            error: error as string,
        };
    }
}