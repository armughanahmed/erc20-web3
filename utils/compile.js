const path = require('path');
const fs = require('fs');
const solc = require('solc');
const tokenPath = path.join('/media/armughan/Local Disk/xord-windows/erc20', '/contracts', 'Token.sol');
console.log(tokenPath)
const source = fs.readFileSync(tokenPath, 'utf8');
// var input = {
//     language: 'Solidity',
//     sources: {
//         'Token.sol' : {
//             content: source
//         }
//     },
//     settings: {
//         outputSelection: {
//             '*': {
//                 '*': [ '*' ]
//             }
//         }
//     }
// };
module.exports = solc.compile(
    JSON.stringify({
      language: "Solidity",
      sources: {
        "lottery.sol": {
          content: source
        }
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["evm", "bytecode"]
          }
        }
      }
    })
  );