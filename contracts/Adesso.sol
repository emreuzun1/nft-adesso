// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Adesso is ERC721, Ownable, ERC721Enumerable {
    uint256 public mintPrice;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() ERC721("AdessoNFT", "ADS") {
        mintPrice = 0.01 ether;
        maxSupply = 100;
        maxPerWallet = 5;
    }

    function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "Token does not exists");
        return string(abi.encodePacked(baseTokenUri, Strings.toString(_tokenId), ".json"));
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{value: address(this).balance}('');
        require(success, "withdraw failed");
    }

    function mint(uint256 _quantity) public payable {
        require(msg.value == _quantity * mintPrice, "not enough money");
        require(totalSupply() + _quantity <= maxSupply, "sold out");
        require(walletMints[msg.sender] + _quantity <= maxPerWallet, "exceed max wallet");

        for(uint256 i = 0 ; i < _quantity ; i++) {
            uint256 newTokenId = totalSupply() + 1;
            _safeMint(msg.sender, newTokenId);
            walletMints[msg.sender] += 1;
        }
    }

    function transferFrom(address from, address to, uint256 tokenId) public override(ERC721, IERC721) {
        walletMints[msg.sender] -= 1;
        super.transferFrom(from,to,tokenId);
    }

    function tokensOfOwner(address _owner) external view returns(uint256[] memory) {
        uint256 count = balanceOf(_owner);
        if(count <= 0 ) return new uint256[](0);
        uint256[] memory tokens = new uint256[](count);
        for(uint i = 0 ; i < count ; i++) {
            tokens[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokens;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal virtual override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}