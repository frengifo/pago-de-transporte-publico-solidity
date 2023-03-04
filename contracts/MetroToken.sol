// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract MetroToken is Initializable, ERC20Upgradeable, ERC20BurnableUpgradeable, PausableUpgradeable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() initializer public {
        __ERC20_init("Metro Token", "METROTKN");
        __ERC20Burnable_init();
        __Pausable_init();
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _mint(msg.sender, 100000 * 10 ** decimals());
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyRole(UPGRADER_ROLE)
        override
    {}
}


contract MetroTokenUpgradeable is Initializable, ERC20Upgradeable, ERC20BurnableUpgradeable, PausableUpgradeable, AccessControlUpgradeable, UUPSUpgradeable {

    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    uint256 public constant TICKET_PRICE = 10**16;
    string public constant OWNER_ADDRESS = "0x85268FbDF51cB153fcFf891Ee111fd9Dd979ca1c";

    struct Ticket {
        uint256 id;
        address owner;
        uint256 price;
        uint256 validUntil;
        bytes32 qrCode;
        bool isValid;
    }

    Ticket[] public tickets;

    mapping(bytes32 => bool) public usedQRCodes;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer  {}

    function mint2(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }


    event TicketPurchased(address indexed buyer, uint256 price);

   
    function buyTicketWithMatic() public payable returns (bytes32) {
        // uint256 ticketPrice = _data.getTicketPrice();
        require(msg.value == 0.01 ether, "Incorrect amount sent.");
        Ticket memory newTicket = Ticket({
            id: tickets.length,
            owner: msg.sender,
            price: msg.value,
            validUntil: block.timestamp + 1 hours, // ticket valid for 1 hour
            qrCode: keccak256(abi.encodePacked(msg.sender, block.timestamp)),
            isValid: true
        });
        tickets.push(newTicket);
        return newTicket.qrCode;
    }

    function validateTicket(bytes32 qrCode) public {
        require(usedQRCodes[qrCode] == false, "Ticket already used.");
        uint256 ticketIndex = findTicketByQRCode(qrCode);
        require(ticketIndex != uint256(0), "Ticket not found.");
        Ticket storage ticket = tickets[ticketIndex];
        require(ticket.isValid, "Ticket is not valid.");
        require(ticket.validUntil >= block.timestamp, "Ticket has expired.");
        usedQRCodes[qrCode] = true;
        ticket.isValid = false;
    }

    function findTicketByQRCode(bytes32 qrCode) internal view returns (uint256) {
        for (uint256 i = 0; i < tickets.length; i++) {
            if (tickets[i].qrCode == qrCode) {
                return i;
            }
        }
        return uint256(0);
    }

    function stringToAddress(string memory _addressString) public pure returns (address) {
        bytes memory addressBytes = bytes(_addressString);
        require(addressBytes.length == 42, "Invalid address string length");
        bytes20 addressBytes20 = bytes20(0);
        for (uint i = 0; i < 20; i++) {
            addressBytes20 |= bytes20(addressBytes[i + 2]) >> (i * 8);
        }
        return address(addressBytes20);
    }


    function _authorizeUpgrade(address newImplementation)
        internal
        onlyRole(UPGRADER_ROLE)
        override
    {}

}
