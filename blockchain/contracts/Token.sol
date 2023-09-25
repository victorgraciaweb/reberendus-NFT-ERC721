// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Uncomment this line to use console.log
import "hardhat/console.sol";

// Importation OpenZeppelin
import "@openzeppelin/contracts@4.4.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.4.2/utils/Counters.sol";

contract Token is ERC721, Ownable {

    // Constructor
    constructor (string memory _name, string memory _symbol)
    ERC721(_name, _symbol){}

    // Counters NFTs
    using Counters for Counters.Counter;
    Counters.Counter private _tokensIds;

    // Pricing of NFT Tokens (price of the artwork)
    uint256 public feeToken = 5 ether;

    // Pricing of Update NFT Tokens
    uint256 public feeUpdate = 1 ether;

    // Data structure with the properties of the artwork
    struct Art {
        string name;
        uint256 id;
        uint256 dna;
        uint8 level;
        uint8 rarity;
        uint8 price;
        uint8 availableForBuy;
    }

    // Storage structure for keeping artworks
    Art [] public art_works;

    // Declaration of an event
    event NewArtWork (address indexed owner, uint256 id, uint256 dna);

    // ============================================
    // Help functions
    // ============================================

    // Creation of a random number (required for NFT token properties)
    function _createRandomNum(uint256 _mod) internal view returns (uint256){
        bytes32 has_randomNum = keccak256(abi.encodePacked(block.timestamp, msg.sender));
        uint256 randonNum = uint256(has_randomNum);
        return randonNum % _mod;
    }

    // NFT Token Creation (Artwork)
    function _createArtWork(string memory _name) internal {
        uint8 randRarity = uint8(_createRandomNum(100));
        uint256 randDna = _createRandomNum(10**16);
        uint256 newItemId = _tokensIds.current();
        Art memory newArtWork = Art(_name, newItemId, randDna, 1, randRarity, 0, 0);
        art_works.push(newArtWork);
        _safeMint(msg.sender, newItemId);
        emit NewArtWork(msg.sender, newItemId, randDna);
        _tokensIds.increment();
    }

    function totalSupply() public view returns (uint) {
        return art_works.length;
    }

    // NFT Token Price Update
    function updateFeeToken(uint256 _feeToken) external onlyOwner {
        feeToken = _feeToken;
    }

    // Visualize the balance of the Smart Contract (ethers)
    function infoSmartContract() public view returns(address, uint256){
        address SC_address = address(this);
        uint256 SC_money = address(this).balance / 10**18;
        return (SC_address, SC_money);
    }

    // Obtaining all created NFT tokens (artwork)
    function getArtWorks() public view returns (Art [] memory){
        return art_works;
    }

    // Obtaining a user's NFT tokens
    function getOwnerArtWork(address _owner) public view returns (Art [] memory){
        Art [] memory result = new Art[](balanceOf(_owner));
        uint256 counter_owner = 0;
        for (uint256 i = 0; i < art_works.length; i++){
            if (ownerOf(i) == _owner){
                result[counter_owner] = art_works[i];
                counter_owner++;
            }
        }
        return result;
    }

    // ============================================
    // NFT Token Development
    // ============================================

    // NFT Token Payment
    function createRandomArtWork(string memory _name) public payable {
        require(msg.value >= feeToken);
        _createArtWork(_name);
    }

    // Extraction of ethers from the Smart Contract to the Owner
    function withdraw() external payable onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    // Level up NFT Tokens
    function levelUp(uint256 _artId) public payable {
        require(ownerOf(_artId) == msg.sender, "Error: Only Token Owner can up level");
        require(msg.value >= feeUpdate, "Error: Is necessary send fee for up level");
        Art storage art = art_works[_artId];
        art.level++;
    }

    // ============================================
    // NFT Business logic
    // ============================================

    // Change Status Available (Active)
    function changeAvailableActive(uint256 _artId, uint8 _priceToken) external returns (Art memory) {
        require(ownerOf(_artId) == msg.sender, "Error: Only Token Owner can change available status");
        require(_priceToken > 0, "Error: Price token can't 0");
        Art storage token = art_works[_artId];
        token.availableForBuy = 1;
        token.price = _priceToken;
        return token;
    }

    // Change Status Available (Inactive)
    function changeAvailableInactive(uint256 _artId) external returns (Art memory) {
        require(ownerOf(_artId) == msg.sender, "Error: Only Token Owner can change available status");
        Art storage token = art_works[_artId];
        token.availableForBuy = 0;
        token.price = 0;
        return token;
    }

    // Buy tokens beetwen owners
    function buyToken(uint256 _artId) public payable {
        Art storage token = art_works[_artId];
        require(ownerOf(_artId) != msg.sender, "Error: Token is just your");
        require(token.availableForBuy == 1, "Error: Token is not Available for buy");
        require(msg.value >= token.price, "Error: Is necessary send Token price for to buy it");
        payable(ownerOf(_artId)).transfer(msg.value);
        _transfer(ownerOf(_artId), msg.sender, _artId);
        token.availableForBuy = 0;
        token.price = 0;
    }
}