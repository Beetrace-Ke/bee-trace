# Bee Trace  

A comprehensive beekeeping management system on the Internet Computer
 * handling honey traceability, hive management, carbon credits, and tokenized crowdfunding


## Things to be explained in the course:
1. What is Ledger? More details here: https://internetcomputer.org/docs/current/developer-docs/integrations/ledger/
2. What is Internet Identity? More details here: https://internetcomputer.org/internet-identity
3. What is Principal, Identity, Address? https://internetcomputer.org/internet-identity | https://yumimarketplace.medium.com/whats-the-difference-between-principal-id-and-account-id-3c908afdc1f9
4. Canister-to-canister communication and how multi-canister development is done? https://medium.com/icp-league/explore-backend-multi-canister-development-on-ic-680064b06320

## Features

### **CreateProperty**
- Allows users to create a new property with specific details.

### **GetAllProperty**
- Retrieves a list of all available properties.

### **GetOneProperty**
- Fetches details of a specific property by its unique identifier.

### **getMyProperty**
- Retrieves properties owned by the authenticated user.

### **Book**
- Allows users to book properties by providing necessary booking details.

### **BookByProperty**
- Retrieves all bookings made for a specific property.

### **MyBooking**
- Lists all bookings made by the authenticated user.

### **confirmBook**
- Confirms a booking based on the provided confirmation details.

### **verifyPayment**
- Verifies payments for bookings to ensure transactions are valid.

### **getAddressFromPrincipal**
- Retrieves the address associated with a specific user principal.

---

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **dfx**: You have installed the latest version of the DFINITY Canister SDK, `dfx`. You can download it from the DFINITY SDK page. [installation guide](https://demergent-labs.github.io/azle/get_started.html#installation)

 ```
  use version dfx 0.22.0
 ```
- **Node.js**: You have installed Node.js, version 18 or above.
```
 v20.12.2

```
- Azle version use 
 ```
  azle 0.24.1
 ```

 - podman verion use

 ```
  podman version 3.4.4
  
 ```
Please ensure all these prerequisites are met before proceeding with the setup of the project.


 # Installation 
  `
  - Clone the repository ` https://github.com/ndacyaAlice/Propreon.git`
  - ` cd Propreon`
  - install dependencies using `npm install`
  - Run this file ` deploy.sh` ex: on window in bash ` bash deploy.sh`

## Contributing
We welcome contributions to enhance the functionality and usability of this API. Feel free to submit issues or pull requests.

---

    