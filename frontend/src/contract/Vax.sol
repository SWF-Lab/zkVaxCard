//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";
// 0x5259d32659F1806ccAfcE593ED5a89eBAb85262f
contract Vaccination {
    event NewVaccinater1(uint256 identityCommitment, bytes32 username);
    event NewVaccinater2(uint256 identityCommitment, bytes32 username);
    event NewVaccinater3(uint256 identityCommitment, bytes32 username);
    event NewVaccinater4(uint256 identityCommitment, bytes32 username);
    event NewVaccinater5(uint256 identityCommitment, bytes32 username);
    
    ISemaphore public semaphore;
    uint256[5] public vacId;
    mapping(uint256 => uint256[5]) public users;

    constructor(
        address semaphoreAddress
    ) {
        semaphore = ISemaphore(semaphoreAddress);
        vacId[0] = 4567654321;
        vacId[1] = 4567654322;
        vacId[2] = 4567654323;
        vacId[3] = 4567654324;
        vacId[4] = 4567654325;
        
        semaphore.createGroup(vacId[0], 20, 0, address(this));
        semaphore.createGroup(vacId[1], 20, 0, address(this));
        semaphore.createGroup(vacId[2], 20, 0, address(this));
        semaphore.createGroup(vacId[3], 20, 0, address(this));
        semaphore.createGroup(vacId[4], 20, 0, address(this));
    }

    function joinGroup(uint256 identityCommitment, bytes32 username, uint256 groupId) external {
        semaphore.addMember(groupId, identityCommitment);
        if (groupId == vacId[0]) emit NewVaccinater1(identityCommitment, username);
        else if (groupId == vacId[1]) emit NewVaccinater2(identityCommitment, username);
        else if (groupId == vacId[2]) emit NewVaccinater3(identityCommitment, username);
        else if (groupId == vacId[3]) emit NewVaccinater4(identityCommitment, username);
        else if (groupId == vacId[4]) emit NewVaccinater5(identityCommitment, username);
    }

    function verify(
        string calldata message,
        uint256 merkleTreeRoot,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external {
        semaphore.verifyProof(
            4567654324,
            merkleTreeRoot,
            keccak256(abi.encodePacked(message)),
            nullifierHash,
            4567654324,
            proof
        );
    }
}