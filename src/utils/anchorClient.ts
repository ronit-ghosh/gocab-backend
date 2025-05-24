import * as anchor from '@coral-xyz/anchor';
import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import { Program } from '@coral-xyz/anchor';
import { RidePayment } from '../../target/types/ride_payment';
import idl from '../solana/idl/ride_payment.json';
import fs from 'fs';

const programId = new PublicKey("CHK9W5TLQ5roAbGwdY3eKDKpeCFFG7mfd6TTXXFb8ztS");

const backendKey = JSON.parse(fs.readFileSync('./src/keys/escrow_wallet.json', 'utf8'));
const backendAuthority = Keypair.fromSecretKey(Uint8Array.from(backendKey));

const provider = new anchor.AnchorProvider(
  new anchor.web3.Connection("https://api.devnet.solana.com", "confirmed"),
  new anchor.Wallet(backendAuthority),
  { preflightCommitment: "confirmed" }
);

anchor.setProvider(provider);

const program = new anchor.Program(
  idl as anchor.Idl,
  programId,
  provider
) as Program<RidePayment>;

export { program, backendAuthority };
