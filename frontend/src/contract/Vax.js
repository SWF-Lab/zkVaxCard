const abi = 
	[
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "identityCommitment",
					"type": "uint256"
				},
				{
					"internalType": "bytes32",
					"name": "username",
					"type": "bytes32"
				},
				{
					"internalType": "uint256",
					"name": "groupId",
					"type": "uint256"
				}
			],
			"name": "joinGroup",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "semaphoreAddress",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "identityCommitment",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "bytes32",
					"name": "username",
					"type": "bytes32"
				}
			],
			"name": "NewVaccinater1",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "identityCommitment",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "bytes32",
					"name": "username",
					"type": "bytes32"
				}
			],
			"name": "NewVaccinater2",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "identityCommitment",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "bytes32",
					"name": "username",
					"type": "bytes32"
				}
			],
			"name": "NewVaccinater3",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "identityCommitment",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "bytes32",
					"name": "username",
					"type": "bytes32"
				}
			],
			"name": "NewVaccinater4",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "identityCommitment",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "bytes32",
					"name": "username",
					"type": "bytes32"
				}
			],
			"name": "NewVaccinater5",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "message",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "merkleTreeRoot",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "nullifierHash",
					"type": "uint256"
				},
				{
					"internalType": "uint256[8]",
					"name": "proof",
					"type": "uint256[8]"
				}
			],
			"name": "verify",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "semaphore",
			"outputs": [
				{
					"internalType": "contract ISemaphore",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "users",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "vacId",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]

export { abi };