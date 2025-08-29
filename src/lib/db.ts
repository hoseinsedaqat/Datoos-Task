import Dexie, { Table } from "dexie";
import { Crypto } from "./types";

export class CryptoDB extends Dexie {
  cryptos!: Table<Crypto, number>;

  constructor() {
    super("CryptoDB");
    this.version(1).stores({
      cryptos: "id,cmc_rank,name,symbol",
    });
  }
}

export const db = new CryptoDB();
