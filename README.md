# `Beetrace_dapp`

## 🌟 Project Summary

BeeTrace is a decentralized platform designed to empower Kenyan beekeepers by addressing critical challenges in the sector. It leverages NFT-based honey traceability to combat adulteration, facilitates tokenized crowdfunding using the $BEE token to overcome funding shortages for modern hives, and introduces pollination carbon credits to monetize the essential environmental benefits provided by bees. Through these innovative solutions, BeeTrace aims to unlock Kenya's full beekeeping potential, boost honey yields and exports, and promote vital conservation efforts.

## ✨ Project Overview

BeeTrace leverages the Internet Computer Protocol (ICP)'s blockchain to transform Kenya's beekeeping industry.

* **Problem Statement:**
    Kenya’s beekeeping sector currently produces a mere 11,000 tonnes of honey annually, significantly below its estimated potential of 55,000 tonnes. This underperformance is largely due to three key challenges:
    * **Adulteration:** The prevalence of adulterated honey erodes consumer trust and severely limits export opportunities, with only 2% of production currently reaching international markets.
    * **Capital Shortages:** A significant barrier for Kenya's 2 million beekeepers is the lack of access to capital, preventing them from adopting modern beehives that yield 20–40 kg of honey compared to 5–10 kg from traditional hives.
    * **Unmonetized Pollination Benefits:** The critical role of bees in biodiversity and carbon sequestration remains unrewarded financially, offering no direct incentive for conservation efforts.

* **Solution Description:**
    BeeTrace provides a comprehensive, blockchain-native solution to these issues, built on the Internet Computer Protocol:
    * **NFT-based Honey Tracking:** We ensure unparalleled transparency and authenticity throughout the honey supply chain. Each batch of honey is represented by an ICRC-7 NFT, securely storing vital data from the beekeeper, including ID, location, and quality. This enables buyers to verify honey authenticity via QR codes, restoring trust and opening up export markets.
    * **$BEE Token Crowdfunding:** To address capital shortages, BeeTrace enables beekeepers to list hive expansion projects on the platform. Investors can then purchase $BEE tokens (an ICRC-1 standard token), providing beekeepers with the necessary funds for modern equipment. Investors, in turn, receive returns from future honey sales.
    * **Tokenized Carbon Credits:** We monetize the invaluable pollination services provided by bees. By simulating IoT data, we tokenize pollination activities, creating tradable carbon credit NFTs. This incentivizes conservation and sustainable beekeeping practices.

    By tackling these challenges, BeeTrace aims to unlock Kenya’s beekeeping potential, significantly increase yields, boost export capabilities, and promote environmental conservation through a sustainable economic model.

* **Features:**
    * **Honey Traceability:**
        * Mint NFTs (ICRC-7) for individual honey batches.
        * Securely store beekeeper ID, location, and quality data on-chain.
        * Enable transparent buyer verification via QR codes.
    * **Crowdfunding:**
        * Beekeepers can easily list and manage hive expansion projects.
        * Investors purchase $BEE tokens (ICRC-1) to fund projects and earn returns.
    * **Pollination Credits:**
        * Simulate IoT data (e.g., hive activity, environmental metrics) to tokenize pollination efforts.
        * Create tradable carbon credit NFTs, offering new revenue streams for conservation.
    * **Mobile-First Interface:**
        * Designed for beekeepers with a responsive, intuitive mobile-first user interface.
        * Optimized for low-literacy users to easily manage their honey data and projects.

* **Architecture:**
    _(Optional: Describe the components like frontend (Next.js), backend canisters (Rust), and how they interact on the Internet Computer. You can include a diagram if you have one.)_

## 🚀 Demo

### Functional Demo Video

_(To provide a link to a functional demo video. This video should walk through the key features and functionalities of deployed application.)_

**[Link to  Demo Video - e.g., YouTube, Loom]**

### Demo Screenshots

_Include several screenshots that showcase key aspects of your application's user interface and functionality. Provide captions for each screenshot._

![Screenshot 1: Main Dashboard/Landing Page](path/to/screenshot1.png)
_Caption: A screenshot of the main page where users can [describe what the screenshot shows]._

![Screenshot 2: Key Feature A in Action](path/to/screenshot2.png)
_Caption: Demonstrating [Key Feature A] such as [specific action shown]._

![Screenshot 3: Another Important View/Feature](path/to/screenshot3.png)
_Caption: This image highlights [another important aspect or feature]._

## 🛠 Getting Started & Running the project locally

This section provides instructions for setting up and running the `beetrace_dapp` project on your local development environment.

### Prerequisites

* **DFINITY Canister SDK:** Ensure `dfx` is installed. It's recommended to use a version like `0.28.0` or newer.
    * Install via: `sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"`
* **Node.js & npm:** For the frontend development. Node.js v18 or v20.
* **Rust Toolchain:** For backend canister development.
* **`cargo-audit` (Optional but Recommended):** For checking Rust dependencies for vulnerabilities.
    * Install via: `cargo install cargo-audit`

### Installation and Local Deployment

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Beetrace-Ke/beetrace.git
    cd beetrace/
    ```

2.  **Start the local DFINITY replica:**
    This command starts the Internet Computer replica in the background.
    ```bash
    dfx start --background
    ```

3.  **Deploy your canisters:**
    This command compiles your backend, deploys all canisters to the local replica, and generates your Candid interface definitions (including TypeScript types for your frontend).
    ```bash
    dfx deploy
    ```
    * **Troubleshooting `dfx deploy` / Type Generation:**
        If you encounter issues during deployment, especially with type generation (e.g., `Module '...' has no exported member 'HoneyBatch'.`), try these steps:
        ```bash
        dfx stop
        dfx cache delete
        rm -rf src/declarations # Cleans previously generated types
        dfx start --background
        dfx deploy
        ```
        If the type generation issue persists even after these steps and DFX reinstallation, it might indicate a deeper environment-specific problem.

4.  **Install frontend dependencies:**
    Navigate into the frontend directory and install its Node.js dependencies.
    ```bash
    cd src/frontend
    npm install
    ```
    * **Troubleshooting Frontend Module Not Found (e.g., `@dfinity/agent`):**
        If you see `Module not found: Can't resolve '@dfinity/agent'`, ensure core DFINITY JS packages are explicitly installed and clear Next.js's cache:
        ```bash
        npm install @dfinity/agent @dfinity/candid @dfinity/principal
        rm -rf .next/ # Clear Next.js cache
        ```
        Also, verify correct import paths, e.g., in `src/frontend/src/pages/_app.tsx`:
        `import { WalletProvider } from '../../components/WalletContext';` (note `../../`).

5.  **Run the frontend development server:**
    This will start the Next.js development server.
    ```bash
    npm run dev
    ```
    Your application will typically be available at `http://localhost:3000`. API requests will be proxied to your local replica.

### Note on frontend environment variables

If you are hosting frontend code somewhere without using DFX, you may need to make one of the following adjustments to ensure your project does not fetch the root key in production:

* set `DFX_NETWORK` to `ic` if you are using Webpack
* use your own preferred method to replace `process.env.DFX_NETWORK` in the autogenerated declarations
    * Setting `canisters -> {asset_canister_id} -> declarations -> env_override to a string` in `dfx.json` will replace `process.env.DFX_NETWORK` with the string in the autogenerated declarations
* Write your own `createActor` constructor

## 🗺 Future Roadmap 

_Describes plans for the project beyond the current submission. (features we intend to add,What improvements we will  make?)_

* **Enhanced Traceability:** Integrate IoT sensors directly into hives for real-time data on temperature, humidity, and location, feeding directly into NFT metadata.
* **Advanced Crowdfunding Features:** Implement milestone-based funding releases and automated payout mechanisms for investors based on honey yield targets.
* **Deeper Carbon Credit Integration:** Explore partnerships with established carbon registries and develop on-chain verification mechanisms for pollination impact.
* **Community Governance:** Introduce a DAO structure for key decisions regarding the platform's development, fund allocation, and rule changes.
* **Mobile App Expansion:** Develop native mobile applications for both Android and iOS to provide an even more seamless experience for beekeepers.

## 🧑‍💻 Core Team Introduction 

_Briefly introduce your team members, their roles, and relevant experience._

* **Sammy Kioko:** _Blockchain Developer_
* **Warren Mikongoi:** _Blockchain Engineer_
* **Christal Riziki:** _" "_


---

## 📚 DFINITY Developer Resources

To learn more about Internet Computer development, see the following documentation available online:

* [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
* [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)
* [Rust Canister Development Guide](https://internetcomputer.org/docs/current/developer-docs/backend/rust/)
* [ic-cdk](https://docs.rs/ic-cdk)
* [ic-cdk-macros](https://docs.rs/ic-cdk-macros)
* [Candid Introduction](https://internetcomputer.org/docs/current/developer-docs/backend/candid/)