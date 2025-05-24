export type RidePayment = {
  "version": "0.1.0",
  "name": "ride_payment",
  "instructions": [
    {
      "name": "initializeConfig",
      "docs": [
        "Initializes the program config with company wallet, backend authority, and admin."
      ],
      "accounts": [
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "companyWallet",
          "type": "publicKey"
        },
        {
          "name": "backendAuthority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateConfig",
      "docs": [
        "Updates the company wallet and/or backend authority (admin only)."
      ],
      "accounts": [
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "companyWallet",
          "type": {
            "option": "publicKey"
          }
        },
        {
          "name": "backendAuthority",
          "type": {
            "option": "publicKey"
          }
        }
      ]
    },
    {
      "name": "initializeRide",
      "docs": [
        "Initializes the ride by transferring SOL from the passenger to the escrow vault PDA."
      ],
      "accounts": [
        {
          "name": "rideAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "passenger",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "driver",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "rideId",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "completeRide",
      "docs": [
        "Completes the ride, distributing 5% to the company and 95% to the driver."
      ],
      "accounts": [
        {
          "name": "rideAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "passenger",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "driver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "companyWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "config",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "companyWallet",
            "type": "publicKey"
          },
          {
            "name": "backendAuthority",
            "type": "publicKey"
          },
          {
            "name": "admin",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "rideAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "passenger",
            "type": "publicKey"
          },
          {
            "name": "driver",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "rideId",
            "type": "string"
          },
          {
            "name": "completed",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "RideAlreadyCompleted",
      "msg": "Ride has already been completed"
    },
    {
      "code": 6001,
      "name": "Unauthorized",
      "msg": "Unauthorized authority"
    }
  ]
};

export const IDL: RidePayment = {
  "version": "0.1.0",
  "name": "ride_payment",
  "instructions": [
    {
      "name": "initializeConfig",
      "docs": [
        "Initializes the program config with company wallet, backend authority, and admin."
      ],
      "accounts": [
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "companyWallet",
          "type": "publicKey"
        },
        {
          "name": "backendAuthority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateConfig",
      "docs": [
        "Updates the company wallet and/or backend authority (admin only)."
      ],
      "accounts": [
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "companyWallet",
          "type": {
            "option": "publicKey"
          }
        },
        {
          "name": "backendAuthority",
          "type": {
            "option": "publicKey"
          }
        }
      ]
    },
    {
      "name": "initializeRide",
      "docs": [
        "Initializes the ride by transferring SOL from the passenger to the escrow vault PDA."
      ],
      "accounts": [
        {
          "name": "rideAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "passenger",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "driver",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "rideId",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "completeRide",
      "docs": [
        "Completes the ride, distributing 5% to the company and 95% to the driver."
      ],
      "accounts": [
        {
          "name": "rideAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "passenger",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "driver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "companyWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "config",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "companyWallet",
            "type": "publicKey"
          },
          {
            "name": "backendAuthority",
            "type": "publicKey"
          },
          {
            "name": "admin",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "rideAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "passenger",
            "type": "publicKey"
          },
          {
            "name": "driver",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "rideId",
            "type": "string"
          },
          {
            "name": "completed",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "RideAlreadyCompleted",
      "msg": "Ride has already been completed"
    },
    {
      "code": 6001,
      "name": "Unauthorized",
      "msg": "Unauthorized authority"
    }
  ]
};
