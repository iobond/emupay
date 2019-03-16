export class Token {
  public id: string;
  public version: string;
  public address: string;
  public deposit: number;
  public txid: string;
  public symbol: string;
  public factor: number;
  public fullName: string;
  public hex: string;

  constructor() {
    this.version = '1.0.0';
  }

  public create(opts?): Token {
    opts = opts ? opts : {};
    let x = new Token();
    x.id = opts.id;
    x.address = opts.address;
    x.deposit = opts.deposit;
    x.txid = opts.txid;
    x.symbol = opts.symbol;
    x.factor = opts.factor;
    x.fullName = opts.fullName;
    x.hex = opts.hex;

    return x;
  }

  public fromObj(obj): Token {
    let x = new Token();

    x.id = obj.id;
    x.address = obj.address;
    x.deposit = obj.deposit;
    x.txid = obj.txid;
    x.symbol = obj.symbol;
    x.factor = obj.factor;
    x.fullName = obj.fullName;
    x.hex = obj.hex;

    return x;
  }

  public fromString(str: string): Token {
    return this.fromObj(JSON.parse(str));
  }

  public toObj(): string {
    return JSON.stringify(this);
  }
}
