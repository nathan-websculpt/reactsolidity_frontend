window.rpsv1_abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "GetGameOutcome",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "Received",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "playerBalances",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "fundContract",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getContractBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "contractBalance",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "playerAddress",
        "type": "address"
      }
    ],
    "name": "getPlayerBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "playerBalance",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getMsgSender",
    "outputs": [
      {
        "internalType": "address",
        "name": "msgsender",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_playerOneChoice",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_playerTwoChoice",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_gameStake",
        "type": "uint256"
      }
    ],
    "name": "playGame",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "gameOutcome",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

window.rpsv2_abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "enum RPSv2.GameOutcome",
        "name": "",
        "type": "uint8"
      }
    ],
    "name": "GetGameOutcome",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "games",
    "outputs": [
      {
        "internalType": "address",
        "name": "playerOne",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "playerTwo",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "stake",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "playerOneChoice",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "playerTwoChoice",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "playerOneHash",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "playerTwoHash",
        "type": "bytes32"
      },
      {
        "internalType": "enum RPSv2.GameStatus",
        "name": "status",
        "type": "uint8"
      },
      {
        "internalType": "enum RPSv2.GameOutcome",
        "name": "outcome",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "playerBalances",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "gameHash",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "opponent",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "gameStake",
        "type": "uint256"
      }
    ],
    "name": "startGame",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "gameHash",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "opponent",
        "type": "address"
      }
    ],
    "name": "participateGame",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "choice",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "salt",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "playerOne",
        "type": "address"
      }
    ],
    "name": "revealChoice",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "playerOne",
        "type": "address"
      }
    ],
    "name": "endGame",
    "outputs": [
      {
        "internalType": "enum RPSv2.GameOutcome",
        "name": "gameResult",
        "type": "uint8"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getContractBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "contractBalance",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "playerAddress",
        "type": "address"
      }
    ],
    "name": "getPlayerBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "playerBalance",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getMsgSender",
    "outputs": [
      {
        "internalType": "address",
        "name": "msgsender",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];