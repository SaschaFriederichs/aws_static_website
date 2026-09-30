import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/**
 * Define the GraphQL data schema for AWS AppSync and Amazon DynamoDB.
 */
const schema = a.schema({
    // The Counter model represents the table tracking page visits.
    Counter: a.model({
        // Unique identifier for the counter item (e.g., "global_website_counter")
        id: a.id().required(),
        
        // The metric storing the actual amount of page views
        views: a.integer()
    })
    // Grant public API Key authorization so unauthenticated visitors can view and update the count
    .authorization(allow => [allow.publicApiKey()])
});

// Export the generated schema type definitions for use in the frontend
export type Schema = ClientSchema<typeof schema>;

/**
 * Configure the Amplify Data backend service.
 */
export const data = defineData({
    schema,
    authorizationModes: {
        // Set public API key as the default authorization method
        defaultAuthorizationMode: 'apiKey',
    },
});
