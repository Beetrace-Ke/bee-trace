import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const WalletLogin = ({ login }) => {
  const [connecting, setConnecting] = useState(false);

  const handleWalletConnect = () => {
    setConnecting(true);

    login()
      .then(() => {
        setConnecting(false);

        // Check if user already has a role selected
        const existingRole = localStorage.getItem("userRole");

        if (existingRole) {
          // User already has a role, redirect to appropriate dashboard
          localStorage.setItem("walletConnected", "true");
          if (existingRole === "beekeeper") {
            window.location.href =
              "/dashboard?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai";
          } else {
            window.location.href =
              "/investor-dashboard?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai";
          }
        } else {
          // New user, redirect to role selection
          window.location.href =
            "/role-selection?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai";
        }
      })
      .catch((error) => {
        setConnecting(false);
        console.error("Login failed:", error);
      });
  };

  if (login) {
    return (
      <div
        className="d-flex justify-content-center flex-column text-center"
        style={{ background: "#000", minHeight: "100vh" }}
      >
        <div className="mt-auto text-light mb-5">
          <div
            className="ratio ratio-1x1 mx-auto mb-2"
            style={{ maxWidth: "320px" }}
          >
            {/* <img src={coverImg} alt="" /> */}
          </div>
          <h1 className="mb-3">
            Connect Your{" "}
            <span style={{ 
              background: "linear-gradient(45deg, #fbbf24, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Wallet
            </span>
          </h1>
          <p className="mb-4">Choose your preferred wallet to access the BeeTrace platform</p>
          
          {/* Internet Identity Card */}
          <div className="mb-3">
            <div 
              className="card bg-dark border-secondary mx-auto" 
              style={{ maxWidth: "400px", cursor: "pointer" }}
              onClick={handleWalletConnect}
            >
              <div className="card-body d-flex align-items-center">
                <div className="me-3">
                  <img
                    src="https://identity.ic0.app/favicon.ico"
                    alt="Internet Identity"
                    style={{ height: "24px", width: "24px" }}
                  />
                </div>
                <div className="text-start">
                  <h6 className="card-title mb-1 text-light">Internet Identity</h6>
                  <small className="text-muted">Secure authentication for Internet Computer</small>
                </div>
              </div>
            </div>
          </div>

          {/* NFID Card */}
          <div className="mb-4">
            <div 
              className="card bg-dark border-secondary mx-auto" 
              style={{ maxWidth: "400px", cursor: "pointer" }}
              onClick={handleWalletConnect}
            >
              <div className="card-body d-flex align-items-center">
                <div 
                  className="me-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    width: "32px", 
                    height: "32px", 
                    background: "linear-gradient(45deg, #10b981, #059669)",
                    borderRadius: "6px"
                  }}
                >
                  <span style={{ color: "white", fontSize: "16px", fontWeight: "bold" }}>⚡</span>
                </div>
                <div className="text-start">
                  <h6 className="card-title mb-1 text-light">NFID</h6>
                  <small className="text-muted">Next-generation identity for Web3</small>
                </div>
              </div>
            </div>
          </div>

          {connecting && (
            <div className="mb-3">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-muted">Connecting to wallet...</p>
            </div>
          )}

        </div>
        <p className="mt-auto text-secondary">Powered by Internet Computer</p>
      </div>
    );
  }
  return null;
};

WalletLogin.propTypes = {
  login: PropTypes.func.isRequired,
};

export default WalletLogin;