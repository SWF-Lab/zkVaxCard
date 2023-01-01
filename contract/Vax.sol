//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";

contract Vaccination {
    event NewVaccinater1(uint256 identityCommitment, bytes32 username);
    event NewVaccinater2(uint256 identityCommitment, bytes32 username);
    event NewVaccinater3(uint256 identityCommitment, bytes32 username);
    event NewVaccinater4(uint256 identityCommitment, bytes32 username);
    event NewVaccinater5(uint256 identityCommitment, bytes32 username);
    
    ISemaphore public semaphore;

    uint256 public vacId1;
    uint256 public vacId2;
    uint256 public vacId3;
    uint256 public vacId4;
    uint256 public vacId5;

    mapping(uint256 => uint256[3]) public users;

    constructor(
        address semaphoreAddress, 
        uint256 _vacId1, 
        uint256 _vacId2, 
        uint256 _vacId3, 
        uint256 _vacId4, 
        uint _vacId5
    ) {
        semaphore = ISemaphore(semaphoreAddress);
        vacId1 = _vacId1;
        vacId2 = _vacId2;
        vacId3 = _vacId3;
        vacId4 = _vacId4;
        vacId5 = _vacId5;
        
        semaphore.createGroup(vacId1, 20, 0, address(this));
        semaphore.createGroup(vacId2, 20, 0, address(this));
        semaphore.createGroup(vacId3, 20, 0, address(this));
        semaphore.createGroup(vacId4, 20, 0, address(this));
        semaphore.createGroup(vacId5, 20, 0, address(this));
    }

    function joinGroup(uint256 identityCommitment, bytes32 username, uint256 groupId) external {
        semaphore.addMember(groupId, identityCommitment);

        if (groupId == vacId1) emit NewVaccinater1(identityCommitment, username);
        else if (groupId == vacId2) emit NewVaccinater2(identityCommitment, username);
        else if (groupId == vacId3) emit NewVaccinater3(identityCommitment, username);
        else if (groupId == vacId4) emit NewVaccinater4(identityCommitment, username);
        else if (groupId == vacId5) emit NewVaccinater5(identityCommitment, username);
    }

    function verify(
        bytes32 message,
        uint256 groupId,
        uint256 merkleTreeRoot,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external {
        // function verifyProof(uint256 groupId, uint256 merkleTreeRoot, bytes32 signal, uint256 nullifierHash, uint256 externalNullifier, uint256[] calldata proof) external
        semaphore.verifyProof(groupId, merkleTreeRoot, message, nullifierHash, groupId, proof);
    }
}
