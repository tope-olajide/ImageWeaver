import { PublicClientApplication } from "@azure/msal-browser";
import { loginRequest, msalConfig } from "../authConfig";


const msalInstance = new PublicClientApplication(msalConfig);

export async function initializeMsal() {
    await msalInstance.initialize();
}

export async function getToken() {
    try {
        await initializeMsal();
        const account = msalInstance.getAllAccounts()[0]; // Get the first account
        if (!account) {
            throw new Error("No account found. User not logged in.");
        }
        // Attempt to get the token silently
        const response = await msalInstance.acquireTokenSilent({
            ...loginRequest,
            account,
        });
        const currentTime = Math.floor(Date.now() / 1000);

        if (response.expiresOn && response.expiresOn.getTime() / 1000 > currentTime) {
            return response.idToken;
        } else {
            throw new Error("Token expired");
        }

    } catch (error) {
        console.error("Failed to acquire token silently:", error);
        // You can initiate an interactive login if silent acquisition fails
        try {
            const response = await msalInstance.loginPopup(loginRequest);
            return response.idToken;
        } catch (loginError) {
            console.error("Login failed:", loginError);
            throw new Error("Failed to acquire token");
        }
    }
}