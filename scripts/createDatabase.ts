// Imports

import { connectToDatabase, closeDatabaseConnection, temporaryPool, DatabaseClient, pool } from "../lib/databaseConnection";
import { checkIfDatabaseExists, createDatabase, createTable, checkDatabaseConnection } from "../lib/databaseQueries";
import { databaseConfiguration } from "../utils/databaseConfiguration";
import { DatabaseConfiguration } from "../types";

// Exports

async function createDatabaseScript(configuration: DatabaseConfiguration) {

    let temporaryDatabaseClient: DatabaseClient = null;
    let client: DatabaseClient = null;

    try{

        console.log('Creating database...');

        const temporaryDatabaseConnection = await connectToDatabase(temporaryPool);
        if(!temporaryDatabaseConnection.status || !temporaryDatabaseConnection.data) {
            console.error('Failed to connect to temporary database');
            return;
        }

        temporaryDatabaseClient = temporaryDatabaseConnection.data;

        const checkIfDatabaseExistsObject = await checkIfDatabaseExists(temporaryDatabaseClient, configuration.name);
        if(!checkIfDatabaseExistsObject.status) {
            console.error('Failed to check if database exists');
            return;
        }

        const databaseExists = checkIfDatabaseExistsObject.data;
        
        if(!databaseExists) {

            console.log('Database does not exist');

            const createDatabaseObject = await createDatabase(temporaryDatabaseClient, configuration.name);
            if(!createDatabaseObject.status || !createDatabaseObject.data) {
                console.error('Failed to create database');
                return;
            }

            const closeTemporaryDatabaseObject = await closeDatabaseConnection(temporaryDatabaseClient);
            if(!closeTemporaryDatabaseObject.status || !closeTemporaryDatabaseObject.data) {
                console.error('Failed to close temporary database');
                return;
            }

            temporaryDatabaseClient = null;

            const connectToDatabaseObject = await connectToDatabase(pool);
            if(!connectToDatabaseObject.status || !connectToDatabaseObject.data) {
                console.error('Failed to connect to database');
                return;
            }

            client = connectToDatabaseObject.data;

            const checkDatabaseConnectionObject = await checkDatabaseConnection(client);
            if(!checkDatabaseConnectionObject.status || !checkDatabaseConnectionObject.data) {
                console.error('Failed to check database connection');
                return;
            }
            
            console.log(`Connected to database: ${checkDatabaseConnectionObject.data}`);

            for(const table of configuration.tables) {
                
                const createTableObject = await createTable(client, table.name, table.columns);
                if(!createTableObject.status || !createTableObject.data) {
                    console.error('Failed to create table');
                    return;
                }

                console.log(`Table Created: ${table.name}`);

            }

        } else {

            console.log('Database already exists');
            return;

        }

    } catch (error) {

        console.error(error);

    } finally {

        if(temporaryDatabaseClient) {
            const closeTemporaryDatabaseObject = await closeDatabaseConnection(temporaryDatabaseClient);
            if(!closeTemporaryDatabaseObject.status || !closeTemporaryDatabaseObject.data) {
                console.error('Failed to close temporary database');
            }
        } else {
            console.error('Temporary database client is null');
        }

        if(client) {
            const closeDatabaseObject = await closeDatabaseConnection(client);
            if(!closeDatabaseObject.status || !closeDatabaseObject.data) {
                console.error('Failed to close database');
            }
        } else {
            console.error('Database client is null');
        }

    }
}

// Run Function

createDatabaseScript(databaseConfiguration);