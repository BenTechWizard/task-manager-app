// Imports

import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';
import { ReturnObject } from '../types';
import { databaseConfiguration } from '../utils/databaseConfiguration';

dotenv.config();

// Types

export type DatabaseClient = PoolClient | null;

// Constants

export const temporaryPool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'postgres',
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: databaseConfiguration.name,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});

// Exports

export async function connectToDatabase(pool: Pool): Promise<ReturnObject<PoolClient | null>> {
    try{

        const client = await pool.connect();
        return {
            status: true,
            data: client,
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

export async function closeDatabaseConnection(client: PoolClient): Promise<ReturnObject<boolean>> {
    try{

        client.release();
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