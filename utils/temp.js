var Web3 = require('web3')
var axios = require('axios')
const BigNumber = require('bignumber.js');
const abi=[
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "ApproveHelper",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_tokenOwner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
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
          "internalType": "address",
          "name": "_spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_tokens",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_tokenOwner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
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
      "inputs": [],
      "name": "decimal",
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
      "inputs": [],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isOwner",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalsupply",
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
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_tokens",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_tokens",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_receiver",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "transferHelper",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
const OPTIONS = {
    // defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
};
//const web3 = new Web3("https://mainnet.infura.io/v3/ff4d778692ad42f7966a456564283e9d", null, OPTIONS) // for main net

const web3 = new Web3("https://ropsten.infura.io/v3/7bce91b43a4e4216a7a55b94cf051cfb", null, OPTIONS) // for rinkeby test net


const contract = new web3.eth.Contract(abi, '0xb313311C445D374D9Eb1Df4e925263d4923F2583')

exports.Transfer = async (_to,_tokens) => {
    try {

        let gasPrices = await exports.getCurrentGasPrices();

        let nonce = await exports.getNonceByEthAddress("0x39eD02366b3134740108bF1b362E69c4B9E041cC");

        let rawTransaction = {
            from:"0x39eD02366b3134740108bF1b362E69c4B9E041cC",
            to: '0xb313311C445D374D9Eb1Df4e925263d4923F2583',
            data: contract.methods.transfer(_to,_tokens).encodeABI(),
            gasPrice: gasPrices.medium * 1000000000, // converts the gwei price to wei
            nonce: web3.utils.toHex(nonce),
            gasLimit: web3.utils.toHex(300000)
            //chainId: 1// EIP 155 chainId - mainnet: 1, rinkeby: 4
        };

        const signed=await web3.eth.accounts.signTransaction(rawTransaction, "e425e8c53ac5fbae76b339a5948a826c38faf6949b833a120937c694c6d0bb5a" )
            web3.eth.sendSignedTransaction(signed.rawTransaction)
                .on('confirmation', (confirmationNumber, receipt) => {
                    if (confirmationNumber === 1) {
                        console.log(receipt)
                    }
                })
                .on('error', (error) => {
                    console.log(error)
                })
                .on('transactionHash', async (hash) => {
                    console.log(hash);
        });


    } catch (e) {
        console.log(e)
    }
};
exports.Approve = async (_address,_token) => {
    try {

        let gasPrices = await exports.getCurrentGasPrices();

        let nonce = await exports.getNonceByEthAddress("0x39eD02366b3134740108bF1b362E69c4B9E041cC");

        let rawTransaction = {
            from:"0x39eD02366b3134740108bF1b362E69c4B9E041cC",
            to: '0xb313311C445D374D9Eb1Df4e925263d4923F2583',
            data: contract.methods.approve(_address,token).encodeABI(),
            gasPrice: gasPrices.medium * 1000000000, // converts the gwei price to wei
            nonce: web3.utils.toHex(nonce),
            gasLimit: web3.utils.toHex(300000)
            //chainId: 1// EIP 155 chainId - mainnet: 1, rinkeby: 4
        };

        const signed=await web3.eth.accounts.signTransaction(rawTransaction, "e425e8c53ac5fbae76b339a5948a826c38faf6949b833a120937c694c6d0bb5a" )
            web3.eth.sendSignedTransaction(signed.rawTransaction)
                .on('confirmation', (confirmationNumber, receipt) => {
                    if (confirmationNumber === 1) {
                        console.log(receipt)
                    }
                })
                .on('error', (error) => {
                    console.log(error)
                })
                .on('transactionHash', async (hash) => {
                    console.log(hash);
        });


    } catch (e) {
        console.log(e)
    }
};
exports.TransferFrom = async (_sender,_to,_tokens) => {
    try {

        let gasPrices = await exports.getCurrentGasPrices();

        let nonce = await exports.getNonceByEthAddress("0x39eD02366b3134740108bF1b362E69c4B9E041cC");

        let rawTransaction = {
            from:"0x39eD02366b3134740108bF1b362E69c4B9E041cC",
            to: '0xb313311C445D374D9Eb1Df4e925263d4923F2583',
            data: contract.methods.transferFrom(_sender,_to,_tokens).encodeABI(),
            gasPrice: gasPrices.medium * 1000000000, // converts the gwei price to wei
            nonce: web3.utils.toHex(nonce),
            gasLimit: web3.utils.toHex(300000)
            //chainId: 1// EIP 155 chainId - mainnet: 1, rinkeby: 4
        };

        const signed=await web3.eth.accounts.signTransaction(rawTransaction, "e425e8c53ac5fbae76b339a5948a826c38faf6949b833a120937c694c6d0bb5a" )
            web3.eth.sendSignedTransaction(signed.rawTransaction)
                .on('confirmation', (confirmationNumber, receipt) => {
                    if (confirmationNumber === 1) {
                        console.log(receipt)
                    }
                })
                .on('error', (error) => {
                    console.log(error)
                })
                .on('transactionHash', async (hash) => {
                    console.log(hash);
        });


    } catch (e) {
        console.log(e)
    }
};

/*** to get data from smart contract ***/
exports.balanceOf = async (address)=>{
    try{
        let getData = await contract.methods.balanceOf(address).call();
        console.log(getData)
        return getData
    }catch (e) {
        console.log(e)
    }
};

exports.Allowance = async (owner,spender)=>{
    try{
        let getData = await contract.methods.allowance(owner,spender).call();
        console.log(getData)
        return getData
    }catch (e) {
        console.log(e)
    }
};


exports.getCurrentGasPrices = async () => {
    try {
        let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
        let prices = {
            low: response.data.safeLow / 10,
            medium: response.data.average / 10,
            high: response.data.fast / 10
        };

        return prices;
    } catch (e) {
        console.log(e)
    }

};

exports.getNonceByEthAddress = async (eth_address) => {
    try {
        let nonce = await web3.eth.getTransactionCount(eth_address, "pending");
        console.log(nonce);
        return nonce;

    } catch (e) {

    }
}

