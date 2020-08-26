var Web3=require('web3');
const Token=require('/media/armughan/Local Disk/xord-windows/erc20/build/contracts/Token.json')
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
  const HDWalletProvider=require('@truffle/hdwallet-provider');
  const owner='0x39eD02366b3134740108bF1b362E69c4B9E041cC';
  const privateKey='e425e8c53ac5fbae76b339a5948a826c38faf6949b833a120937c694c6d0bb5a';
  //const owner='0x6672f16a73C054f8da00A7861C0E4B3392CE68A3'; -> original owneer
  const provider=new HDWalletProvider(
    privateKey,
    'https://ropsten.infura.io/v3/7bce91b43a4e4216a7a55b94cf051cfb'
  )
  const web3=new Web3(provider);
  let contract=new web3.eth.Contract(
    Token.abi,'0xb313311C445D374D9Eb1Df4e925263d4923F2583'
  )
  const deploy=async ()=>{
    try{
      // contract=await contract.deploy({data:Token.bytecode}).send({from:owner});
      // console.log('Contract deployed to ', contract.options.address);
      //await contract.methods.initialize().send({from:owner});
      const _balanceOf= await contract.methods.balanceOf(owner).call();
      console.log(_balanceOf);
    }
    catch(e){
      console.log(e);
    }
  }
  deploy();
    //var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
   // const id =  web3.eth.net.getId();
    //const deployedNetwork=Token.networks[id];
    //const addresses= web3.eth.getAccounts();
    //const contract=new web3.eth.Contract(abi,'0x5706d26242A1835CC00D953332E79031D98dB26E')
    const Approve=async (address,token)=>{
        const _approve=await contract.methods.approve(address,token).send({
            from:owner
        });
    }
    const Transfer=async (address,token)=>{
        const _transfer=await contract.methods.transfer(address,token).send({
            from:owner
        });
    }
    const TransferFrom=async (sender,to,tokens)=>{
        const _transferFrom=await contract.methods.transferFrom(sender,to,tokens).send({
            from:owner
        });
    }
    const balanceOf= async (address)=>{
        const _balanceOf= await contract.methods.balanceOf(address).call();
        //console.log(_balanceOf);
        return _balanceOf;
    }
    const Allowance= async (owner,spender)=>{
        const _allowance= await contract.methods.allowance(owner,spender).call();
        return _allowance;
    }
    // Approve();
    // TransferFrom();
    //balanceOf(owner);
    module.exports={
        balanceOf:balanceOf,
        Approve:Approve,
        Transfer:Transfer,
        TransferFrom:TransferFrom,
        Allowance:Allowance
    }