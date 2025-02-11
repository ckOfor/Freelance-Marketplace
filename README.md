# Decentralized Freelance Marketplace

A blockchain-based platform that connects clients with freelancers, featuring secure payments through smart contracts and a decentralized reputation system.

## Features

### Job Posting Contract
- Post job listings with detailed requirements and budgets
- Apply for jobs with proposals and estimated timelines
- Auto-matching system based on skills and reputation
- Job milestone tracking and completion verification

### Escrow Contract
- Secure fund holding during project execution
- Milestone-based payment release system
- Automatic payment distribution upon milestone completion
- Protection for both clients and freelancers

### Dispute Resolution Contract
- Fair and transparent conflict resolution
- Multi-signature arbitration system
- Time-locked dispute period
- Evidence submission and review process
- Automated resolution for common disputes

### Reputation Contract
- Immutable rating system for both clients and freelancers
- Weighted review calculations based on transaction value
- Skill endorsement mechanism
- Historical performance tracking
- Sybil-resistant identity verification

## Technical Architecture

### Smart Contracts
```solidity
// Core contract interfaces
interface IJobPosting {
    function postJob(string memory description, uint256 budget) external;
    function applyForJob(uint256 jobId, string memory proposal) external;
    function acceptProposal(uint256 jobId, address freelancer) external;
}

interface IEscrow {
    function depositFunds(uint256 jobId) external payable;
    function releaseMilestonePayment(uint256 jobId, uint256 milestone) external;
    function refundClient(uint256 jobId) external;
}

interface IDispute {
    function initiateDispute(uint256 jobId) external;
    function submitEvidence(uint256 disputeId, string memory evidence) external;
    function resolveDispute(uint256 disputeId, address payable winner) external;
}

interface IReputation {
    function submitRating(address user, uint8 rating, string memory review) external;
    function getUserReputation(address user) external view returns (uint256);
}
```

### Technology Stack
- Blockchain: Ethereum
- Smart Contract Language: Solidity
- Frontend: React.js
- Web3 Integration: ethers.js
- IPFS: For storing job descriptions and proposals
- Backend API: Node.js with Express
- Database: PostgreSQL for off-chain data

## Getting Started

### Prerequisites
- Node.js v16 or higher
- Hardhat for smart contract development
- MetaMask wallet
- Local blockchain network (Hardhat Network or Ganache)

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/decentralized-freelance-marketplace.git

# Install dependencies
cd decentralized-freelance-marketplace
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your configuration

# Deploy smart contracts
npx hardhat run scripts/deploy.js --network <your-network>

# Start the development server
npm run dev
```

### Testing
```bash
# Run smart contract tests
npx hardhat test

# Run frontend tests
npm run test
```

## Security Considerations

### Smart Contract Security
- All contracts are audited by [Audit Firm Name]
- Implements reentrancy guards
- Uses OpenZeppelin security contracts
- Time-locked administrative functions
- Emergency pause functionality

### User Security
- Multi-signature wallet support
- Rate limiting for contract interactions
- Secure fund management through escrow
- Encrypted communication channels

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Create a Pull Request

Please read CONTRIBUTING.md for detailed guidelines.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Contact

- Project Link: https://github.com/your-username/decentralized-freelance-marketplace
- Discord: [Your Discord Community Link]
- Twitter: [@YourProjectHandle]

## Acknowledgments

- OpenZeppelin for secure smart contract libraries
- The Ethereum community for inspiration and support
- All contributors who have helped shape this project
