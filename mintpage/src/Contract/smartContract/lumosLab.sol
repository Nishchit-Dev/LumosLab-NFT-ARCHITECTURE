// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "https://github.com/chiru-labs/ERC721A/blob/main/contracts/ERC721A.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract Lumos is Ownable, ERC721A{

    // BaseURI = is the URL of Ipfs folder which contains metadata of your NFTs 
    string public baseURI = "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/";

    // set your max Supply
    uint public totalNFT = 10;

    // set price you want to
    uint public price = 0.002 ether;

    // set saleStart
    bool public mintEnabled;

    constructor() ERC721A("Lumos-NFT_Architecture_sessnio", "LumosLab"){}

    
    // this function return BaseUrl
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    // this function to startSales 
    function toggleMinting() external onlyOwner {
      mintEnabled = !mintEnabled;
    }

    // function to Withdraw the gathered tokens
    function withdraw() external payable onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }


    // this is a simple Mint function 
    function mint(uint quanitiy) public payable {


        // checking if supply does not exceed maxSupply 
        require( totalSupply()+quanitiy < totalNFT ,"Max supply exceed" );
        
        // if sender has sent the right amount according to qunatity he want to mint 
        require(msg.value >= (quanitiy*price),"not sent enough ehter");

            _safeMint(msg.sender,quanitiy);
     
    }

}