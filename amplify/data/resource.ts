import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

// 1. Definition des Datenbankschemas passend zu Ihrem Frontend-Code
const schema = a.schema({
  Counter: a
    .model({
      id: a.id().required(),
      views: a.integer().required(), // Entspricht counter.views in Ihrem React-Code
    })
    // Erlaubt öffentlichen Lese- und Schreibzugriff für jeden Website-Besucher via API Key
    .authorization((allow) => [allow.publicApiKey()]), 
});

export type Schema = ClientSchema<typeof schema>;

// 2. Export der Datenkonfiguration mit API Key als Standard-Auth-Modus
export const data = defineData({
  schema,
  authorizationModes: {
    // Erzwingt, dass Amplify standardmäßig den API Key nutzt (verhindert den JWT-Fehler)
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30, // Gültigkeit des Schlüssels (maximal 365 Tage erlaubt)
    },
  },
});