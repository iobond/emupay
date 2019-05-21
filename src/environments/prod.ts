import { EnvironmentSchema } from './schema';

/**
 * Environment: prod
 */
const env: EnvironmentSchema = {
  name: 'production',
  enableAnimations: true,
  ratesAPI: {
    btc: 'https://bitpay.com/api/rates',
    bch: 'https://bitpay.com/api/rates/bch'
  },
  activateScanner: true
};

/* When DefaultAsset defined here does exist in BWS db, Default Asset will be used to create default wallet
   When DefaultAsset doesn't exist in BWS db but there are assets defined in BWS db and the first available asset
   will be used as DefaultAsset to create wallet.
   When there is no asset defined in BWS DB, BaseCoin will be used to create the default wallet.
   When BaseCoin is not defined here, default wallet creation will fail
 */

 
export const DefaultAsset = 'LOON2';
export const BaseCoin = 'AIB';
export const DefaultWalletServiceUrl = "https://bws.aib.cash/bws/api";
export default env;
