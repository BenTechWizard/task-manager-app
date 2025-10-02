// Imports

import { DatabaseConfiguration } from "../types";
import { columnDataTypes } from "./constants";

// Exports

export const databaseConfiguration: DatabaseConfiguration = {
    name: 'task_manager',
    tables: [
        {
            name: 'task',
            columns: [
                {
                    name: 'id',
                    type: columnDataTypes.id,
                },
                {
                    name: 'title',
                    type: columnDataTypes.varchar(255),
                },
                {
                    name: 'description',
                    type: columnDataTypes.varchar(255),
                },
                {
                    name: 'is_completed',
                    type: columnDataTypes.boolean,
                },

            ]
        }
    ],
}