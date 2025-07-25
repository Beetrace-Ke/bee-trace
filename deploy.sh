 dfx stop && dfx start --host 127.0.0.1:8000 --background --clean
./deploy-local-ledger.sh
AZLE_AUTORELOAD=true dfx  deploy internet_identity
AZLE_AUTORELOAD=true dfx deploy backend && dfx generate backend
AZLE_AUTORELOAD=true dfx deploy frontend 