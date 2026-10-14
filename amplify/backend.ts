import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

const backend = defineBackend({
  auth,
  data,
});

// ZWINGT AMPLIFY DAZU, EINEN NEUEN API-KEY ZU ERZEUGEN:
backend.data.resources.cfnResources.cfnApiKey?.overrideLogicalId(
  `recoverApiKey${new Date().getTime()}`
);
