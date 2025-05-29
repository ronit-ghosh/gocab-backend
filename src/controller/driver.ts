import { Router } from 'express';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { program, backendAuthority } from '../utils/anchorClient';
import { checkBalance, checkConnection } from '../utils/walletChecks';
import { driverDb } from '@/utils/firestoreClient';

const driverRouter = Router();

driverRouter.get('/', async (req, res) => {
  const balance = await checkBalance();
  checkConnection()
  res.json({ message: 'Driver route root', balance });
});

driverRouter.get('/getAll', async (req, res) => {
  try {
    const snapshot = await driverDb.collection('drivers').get();
    const drivers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ message: 'data retrieved successfully', drivers });
  } catch (error) {
    console.error('Error getting all drivers:', error);
    res.status(500).json({ error: error|| 'Internal server error' });
  }
});

driverRouter.post('/ride/complete', async (req, res): Promise<any> => {
  try {
    const { rideId, passenger, driver, companyWallet } = req.body;
    if (!rideId || !passenger || !driver || !companyWallet) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    const [configPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('config')],
      program.programId
    );

    const [rideAccountPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('escrow'), Buffer.from(rideId)],
      program.programId
    );

    const [vaultPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('vault'), Buffer.from(rideId)],
      program.programId
    );

    await program.methods
      .completeRide()
      .accounts({
        rideAccount: rideAccountPda,
        vault: vaultPda,
        config: configPda,
        passenger: new PublicKey(passenger),
        driver: new PublicKey(driver),
        companyWallet: new PublicKey(companyWallet),
        authority: backendAuthority.publicKey,
        systemProgram: SystemProgram.programId
      })
      .signers([backendAuthority])
      .rpc();

    res.json({ message: 'Ride completed and payment released' });
  } catch (error: any) {
    console.error('Error completing ride:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

export default driverRouter;
