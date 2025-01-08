import React, { Dispatch, SetStateAction, useState, } from "react";
import { TextInput, StyleSheet, ImageBackground, Pressable, View, Text } from "react-native";
import images from '../../assets/images';;
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as Clipboard from 'expo-clipboard';

import { useToast } from "react-native-toast-notifications";
import JoinedUsers from "./JoinedUsers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "@/app/config/getToken";
import { invokeSignalREvent, userJoinedTournament } from "@/app/config/signalRService";
import SpinnerModal from "../SpinnerModal";
import url from "@/app/config/getUrl";

const JoinTournament = ({ setTournamentState }: { setTournamentState: Dispatch<SetStateAction<string>> }) => {

    const [tournamentName, setTournamentName] = useState("");
    const [isJoinedUsers, setIsJoinedUsers] = useState(false);
    const [isJoiningTournament, setIsJoiningTournament] = useState(false);
    const handleInputChange = (value: any) => {
        setTournamentName( value );
    };
    const toast = useToast();

    const pasteFromClipboard = async () => {
        const clipboardContent = await Clipboard.getStringAsync();
        setTournamentName(clipboardContent)
    };


    const joinTournament = async () => {
      if (!tournamentName) {
        toast.show("Please provide the tournament name", { type: "danger" });
        return;
        }
         const token = await getToken();
                if (!token) {
                    console.error("No token to send");
                    return;
                }
        try {
       
            setIsJoiningTournament(true);
            const response = await fetch(url.joinTournament, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ tournamentName }),
            });

            if (!response.ok) {
                setIsJoiningTournament(false);
                throw new Error("Failed to join tournament");
            }

            const data = await response.json();
            console.log({ data });
            await AsyncStorage.setItem('createdTournament', JSON.stringify(data.tournament));
            await AsyncStorage.setItem('userId', data.userId);
            await AsyncStorage.setItem('userName', data.name);
           
           
            await userJoinedTournament(data.tournament)
            setTournamentState("JoinedUsers");
        } catch (error) {
            setIsJoiningTournament(false);
             if (error instanceof Error) {
                 toast.show(error.message, { type: "danger" });
             } else {
                 toast.show("An unknown error occurred", { type: "danger" });
             }
            console.log({ error });
        }
    };
   
    
    if (isJoinedUsers) {
        return (
            <>
        <JoinedUsers />
        </>)
    }
    return (
        <>
            <SpinnerModal visible={isJoiningTournament} />
            <View style={{width: "80%"}}>
                <Text style={styles.label}>Tournament Name</Text>
                <View style={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "center", width: "100%",}}>
                    <TextInput
                        style={styles.input}
                        value={tournamentName}
                        onChangeText={(text) =>
                            handleInputChange(text)
                        }
                        placeholder="Enter Tournament Name"
                        placeholderTextColor="#A88FEA"
                    />
                    <Pressable  onPress={pasteFromClipboard}>
                        <ImageBackground
                            resizeMode="contain"
                            source={images.button1}
                            style={{ opacity: 0.8, width: 42, height: 42, display: 'flex', alignItems: "center", justifyContent: "center", marginLeft:5, }}
                        >
                            <Text style={styles.textStyle}><FontAwesome6 name="paste" size={24} color="#fff" /></Text>
                        </ImageBackground>
                    </Pressable>
                </View>
            </View>
            <Pressable style={[styles.button]} onPress={joinTournament}>
                <ImageBackground
                    source={images.button2}
                    resizeMode="stretch"
                    style={[styles.button, { opacity: 0.8, }]}
                >
                    <Text style={styles.textStyle}>Join</Text>
                </ImageBackground>
            </Pressable>
        </>
    )
}



const styles = StyleSheet.create({
 
    label: {
        marginBottom: 10,
        fontSize: 22,
        color: "#fff",
        fontWeight: "600",
        display:"none"
    },
    input: {
        borderWidth: 2,
        borderColor: "transparent",
        borderRadius: 5,
        padding: 5,
        backgroundColor: "rgba(255,255,255,0.2)",
        color: "rgba(255,255,255,0.9)",
        fontSize: 18,
        paddingVertical: 8,
        width: "100%",
        fontWeight:"500"
    },
    button: {
        width: 140,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        marginBottom: 10,
        marginTop: 15,
        marginHorizontal: "auto",
    },
    textStyle: {
        color: "white",
        fontWeight: "700",
        textAlign: "center",
        fontSize: 20,
        opacity: 1,
        padding: 10,
        textTransform: "uppercase",
        paddingBottom:13

    },
});
export default JoinTournament