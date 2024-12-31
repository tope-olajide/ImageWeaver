import { Pressable, ImageBackground, StyleSheet, Text, View } from "react-native"
import images from "../../assets/images"
import { Dispatch, SetStateAction } from "react";

const NewOrJoinView = ({ setTournamentState }: { setTournamentState: Dispatch<SetStateAction<string>> }) => {
    return (
        <View>
            <Pressable
                style={[styles.button]}
                onPress={() => setTournamentState("NewTournament")}
            >
                <ImageBackground
                    source={images.button2}
                    resizeMode="stretch"
                    style={[styles.button, { opacity: 0.8 }]}
                >
                    <Text style={styles.textStyle}>New Tournament</Text>
                </ImageBackground>
            </Pressable>

            <Pressable
                style={[styles.button]}
                onPress={() => setTournamentState("JoinTournament")}
            >
                <ImageBackground
                    source={images.button2}
                    resizeMode="stretch"
                    style={[styles.button, { opacity: 0.8 }]}
                >
                    <Text style={styles.textStyle}>Join Tournament</Text>
                </ImageBackground>
            </Pressable>

            {/* <Pressable
                style={{
                    margin: 10,
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                }}
            >
                <ImageBackground
                    source={images.button1}
                    resizeMode="cover"
                    style={{
                        width: 50,
                        height: 50,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text style={styles.otherButtonText}>?</Text>
                </ImageBackground>
            </Pressable> */}
        </View>
    )
}

const styles = StyleSheet.create({

    text: {
        color: 'white',
        fontSize: 18,
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
    otherButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "700",
        fontFamily: "SpaceMono",
    },
});
export default NewOrJoinView