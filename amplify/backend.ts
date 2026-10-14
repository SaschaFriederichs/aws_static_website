import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

const backend = defineBackend({
  auth,
  data,
});

// Force Amplify to generate an new api key:
//backend.data.resources.cfnResources.cfnApiKey?.overrideLogicalId(
//  `recoverApiKey${new Date().getTime()}`
//);
