import { Injectable } from '@angular/core';
import { BaseCoin, DefaultAsset } from '../environments/prod';
import { Token } from "../models/services/token.model";
import { Logger } from '../providers/logger/logger';

import {BwcProvider} from "../providers/bwc/bwc";


@Injectable()
export class ShareService {
    walletTypes: string[];
    defalutWalletType: string;
    tokens: Token[];

    constructor(
        private bwcProvider: BwcProvider,
        private logger: Logger,
    ){
        this.walletTypes = [];
        this.tokens = [];
        this.initData();
    };

    /*async function getHero(handle: string) {

        return new Promise<{name: string; alias: string}>(res => {

            setTimeout(() => {

                res(hero[handle]);

            }, 1000);

        });

    }*/

    public async initData(): Promise<any> {
        /* this.onGoingProcessProvider.set('gettingWalletTypes');*/

        var opts = {
            symbolOnly: false,
            limit: 20,
        };

        await this.getWalletTypes(opts)
                .then(tokens =>{
                    this.tokens = tokens;
                    this._getWalletTypes(tokens);
                })
                .catch(err =>{
                    this.logger.error('Getting wallet types: could not get wallet types', err);
                    return;
                });
    }

    public getWalletTypes(opts): Promise<any> {
        return new Promise((resolve, reject) => {
            let walletClient = this.bwcProvider.getClient();
            walletClient.getWalletTypes(opts,(err,walletTypes) =>{
                if (err) reject(err)
                else return resolve(walletTypes);
            });
        }).then(tokens =>{
            return tokens;
        });
    }

    private _getWalletTypes(tokens):void {
        /* symbols.push(Constants.COINS.BTC); */
        /* symbols.push(Constants.COINS.BCH); */
        this.walletTypes = [];
        var symbols = [];

        tokens.map( (token) => {
            symbols.push(token.symbol);
        });
        /* When DefaultAsset defined here does exist in BWS db, Default Asset will be used to create default wallet
           When DefaultAsset doesn't exist in BWS db but there are assets defined in BWS db and the first available asset
           will be used as DefaultAsset to create wallet.
           When there is no asset defined in BWS DB, BaseCoin will be used to create the default wallet.
           When BaseCoin is not defined here, default wallet creation will fail
         */
        if (DefaultAsset && symbols.indexOf(DefaultAsset.toUpperCase())!= -1) {
            this.defalutWalletType = DefaultAsset;
            this.walletTypes = symbols;
            this.walletTypes.push(BaseCoin.toUpperCase()); // add Base coin to the end of wallet Types
        } else {
            if (symbols.length > 0) {
                this.defalutWalletType = symbols[0];
                this.walletTypes = symbols[0];
            } else {
                this.walletTypes.push((BaseCoin.toUpperCase())); //  BaseCoin if defined is added to wallet Types
                this.defalutWalletType = BaseCoin.toUpperCase();
            }
        }
    }

    public isValidToken(token):any {
        return token != BaseCoin && this.walletTypes.indexOf(token) != -1;
    }

    public getTokenInfo(tokenName,tokenSignature?):any {
        var tokenInfo = this.tokens.filter(token =>{
            return token.symbol == tokenName;
        });

        //  TODO: simplify signature checking by unify hex string and op_return data string
        if (tokenSignature && !!tokenInfo && tokenInfo.length > 0) {
            var dbTokenSignature = tokenInfo[0].hex;
            if (tokenSignature.substring(0,2) != '74')
                dbTokenSignature = dbTokenSignature.substring(2);
            return dbTokenSignature == tokenSignature ? tokenInfo[0] : null;
        }
        return tokenInfo.length > 0 ? tokenInfo[0] : null;
    }
}