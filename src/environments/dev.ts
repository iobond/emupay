import production from './prod';
import { EnvironmentSchema } from './schema';

/**
 * Environment: dev
 */
export const env: EnvironmentSchema = {
  // Start with production config,
  ...production,
  // override for development:
  name: 'development'
};

export default env;
