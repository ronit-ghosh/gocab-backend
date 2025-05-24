import { AnchorProvider, Program, Idl } from '@coral-xyz/anchor';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { RidePayment } from '../lib/ride_payment';
import escrow_wallet from '../keys/escrow_wallet.json';
import idlFile from '../lib/ride_payment.json'

const PROGRAM_ID = new PublicKey('CHK9W5TLQ5roAbGwdY3eKDKpeCFFG7mfd6TTXXFb8ztS');
const idl = idlFile as Idl;

const backendAuthority = Keypair.fromSecretKey(Uint8Array.from(escrow_wallet));

const connection = new Connection('https://api.devnet.solana.com', {
  commitment: 'confirmed',
});

const wallet = {
  publicKey: backendAuthority.publicKey,
  signTransaction: async (tx: any) => {
    tx.sign(backendAuthority);
    return tx;
  },
  signAllTransactions: async (txs: any[]) => {
    return txs.map(tx => {
      tx.sign(backendAuthority);
      return tx;
    });
  },
};

const provider = new AnchorProvider(connection, wallet, {
  preflightCommitment: 'confirmed',
});

const program = new Program<RidePayment>(idl as RidePayment, PROGRAM_ID, provider);

export { program, backendAuthority, PROGRAM_ID };
