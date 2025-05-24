import { Router } from 'express';
import { program, backendAuthority } from '@utils/anchorClient';
import { PublicKey, SystemProgram } from '@solana/web3.js';

const driverRouter = Router();

driverRouter.get('/', (req, res) => {
  res.json({ message: 'Driver route root' });
});

driverRouter.post('/ride/complete', async (req, res) : Promise<any> => {
  try {
    const { rideId, passenger, driver, companyWallet } = req.body;

    if (!rideId || !passenger || !driver || !companyWallet) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const [configPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("config")],
      program.programId
    );
    const [escrowPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("escrow"), Buffer.from(rideId)],
      program.programId
    );

    await program.methods
      .completeRide()
      .accounts({
        escrow: escrowPda,
        config: configPda,
        passenger: new PublicKey(passenger),
        driver: new PublicKey(driver),
        companyWallet: new PublicKey(companyWallet),
        authority: backendAuthority.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([backendAuthority])
      .rpc();

    res.json({ message: 'Ride completed and payment released' });

  } catch (error: any) {
    console.error("Error completing ride:", error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

export default driverRouter;


