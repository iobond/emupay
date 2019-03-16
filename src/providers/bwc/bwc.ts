import { Injectable } from '@angular/core';

import { Logger } from '../../providers/logger/logger';

import * as BWC from 'aibcore-wallet-client';
import {DefaultWalletServiceUrl} from "../../environments/prod";

@Injectable()
export class BwcProvider {
  public buildTx = BWC.buildTx;
  public parseSecret = BWC.parseSecret;
  public Client = BWC;
  constructor(private logger: Logger) {
    this.logger.debug('BwcProvider initialized');
  }
  public getBitcore() {
    return BWC.Bitcore;
  }

  public getBitcoreCash() {
    return BWC.BitcoreCash;
  }

  public getAibcore() {
    return BWC.Aibcore;
  }

  public getErrors() {
    return BWC.errors;
  }

  public getSJCL() {
    return BWC.sjcl;
  }

  public getUtils() {
    return BWC.Utils;
  }

  public getClient(walletData?, opts?) {
    opts = opts || {};

    // note opts use `bwsurl` all lowercase;
    let bwc = new BWC({
      baseUrl: opts.bwsurl || DefaultWalletServiceUrl,
      verbose: opts.verbose,
      timeout: 100000,
      transports: ['polling']
    });
    if (walletData) bwc.import(walletData, opts);
    return bwc;
  }
}
