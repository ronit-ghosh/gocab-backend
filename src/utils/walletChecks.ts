import * as anchor from "@coral-xyz/anchor";
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import escrow_wallet from '../keys/escrow_wallet.json'

const backendAuthority = Keypair.fromSecretKey(Uint8Array.from(escrow_wallet));

const connection = new anchor.web3.Connection(
  "https://api.devnet.solana.com",
  "confirmed"
);

const provider = new anchor.AnchorProvider(
  connection,
  new anchor.Wallet(backendAuthority),
  { preflightCommitment: "confirmed" }
);
anchor.setProvider(provider);

export async function checkConnection(): Promise<void> {
  try {
    const version = await provider.connection.getVersion();
    console.log("✅ RPC connection OK. Node version:", version);
  } catch (err) {
    console.error("❌ Failed to connect to Solana RPC:", err);
  }
}

export async function checkBalance(): Promise<number> {
  try {
    const publicKey: PublicKey = backendAuthority.publicKey;
    const lamports = await provider.connection.getBalance(publicKey);
    const sol = lamports / LAMPORTS_PER_SOL;
    console.log(`💰 Escrow wallet (${publicKey.toBase58()}): ${sol} SOL`);
    return sol;
  } catch (err) {
    console.error("❌ Failed to fetch balance:", err);
    throw err;
  }
}

