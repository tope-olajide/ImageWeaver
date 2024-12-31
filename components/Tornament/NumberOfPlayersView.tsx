import AntDesign from "@expo/vector-icons/AntDesign";
import { Dispatch, SetStateAction, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { View, Text, StyleSheet, Pressable, ImageBackground } from "react-native";
import images from '../../assets/images';

import { useToast } from "react-native-toast-notifications";

import SpinnerModal from "../SpinnerModal";
import { PublicClientApplication } from "@azure/msal-browser";
import { loginRequest, msalConfig } from "@/app/authConfig";

const NumberOfPlayersView = ({ setTournamentState }: { setTournamentState: Dispatch<SetStateAction<string>> }) => {
    const [value, setValue] = useState<any>(null);
    const [isFocus, setIsFocus] = useState(false);
    const [isJoinedUsers, setIsJoinedUsers] = useState(false);
    const [tournamentData, setTournamentData] = useState<any>()
    const toast = useToast();
    const data = [
        { label: "1 Player", value: 1 },
        { label: "2 Players", value: 2 },
        { label: "3 Players", value: 3 },
        { label: "4 Players", value: 4 },
    ];
    const msalInstance = new PublicClientApplication(msalConfig);

    async function initializeMsal() {
        await msalInstance.initialize();
    }

    async function getToken() {
        try {
            await msalInstance.initialize();
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

    const handleCreateTournament = async () => {
        if (!value) {
            // toast.show("Please select the number of players you'd like to compete against.", { type: "danger", });
            return;
        }
        console.log({ numberOfPlayers: value })

        await initializeMsal(); // Ensure MSAL is initialized before getting the token

        const token = await getToken();
        if (!token) {
            console.error("No token to send");
            return;
        }

        try {
            const response = await fetch("http://localhost:7071/api/createTournament", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ numberOfPlayers: value }),
            });

            if (!response.ok) {
                throw new Error("Failed to create tournament");
            }

            const data = await response.json();
            console.log({ data });

        } catch (error) {
            // toast.show(error.message, { type: "danger" });
            console.log({ error });
        }
    };

    return (
        <View>
            <SpinnerModal visible={false} />
            <View style={{ width: 350 }}>
                <Text
                    style={{
                        color: "rgba(200, 200, 200, 1)",
                        fontSize: 26,
                        textAlign: "center",
                        textShadowColor: "rgba(0, 0, 0, 1)",
                        textShadowOffset: { width: -1, height: 1 },
                        textShadowRadius: 15,
                        fontWeight: "700",
                        padding: 10,
                    }}
                >
                    How many players would you like to compete against?
                </Text>
                <View style={{ width: 220, margin: "auto" }}>
                    <Dropdown
                        style={[
                            styles.dropdown,
                            isFocus && { borderColor: "blue" },
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? "Select No. of players" : "..."}
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(item) => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color={isFocus ? "blue" : "black"}
                                name="Safety"
                                size={20}
                            />
                        )}
                    />
                </View>
                <Pressable
                    style={[styles.button]}
                    onPress={handleCreateTournament}
                >
                    <ImageBackground
                        source={images.button2}
                        resizeMode="stretch"
                        style={[styles.button, { opacity: 0.8 }]}
                    >
                        <Text style={styles.textStyle}>Start Tournament</Text>
                    </ImageBackground>
                </Pressable>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 8,
        minWidth: 200,
        textAlign: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    icon: {
        marginRight: 5,
        color: "yellow",
    },
    label: {
        position: "absolute",
        backgroundColor: "white",
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        display: "none",
    },
    placeholderStyle: {
        fontSize: 16,
        color: "yellow",
    },
    selectedTextStyle: {
        fontSize: 16,
        color: "yellow",
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    button: {
        width: "auto",
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        marginBottom: 20,
        marginTop: 15,
        marginHorizontal: "auto",
    },
    textStyle: {
        color: "white",
        fontWeight: "700",
        textAlign: "center",
        fontSize: 18,
        opacity: 1,
        textTransform: "capitalize",
        padding: 0,
        paddingHorizontal: 24,
    },
});
export default NumberOfPlayersView
