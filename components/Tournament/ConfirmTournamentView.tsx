import { ImageBackground, Pressable, Text, View, StyleSheet } from "react-native"
import images from '../../assets/images';
import { Dispatch, SetStateAction } from "react";

const ConfirmTournamentView = ({ setTournamentState }: { setTournamentState: Dispatch<SetStateAction<string>> }) => {
    return (
        <View style={{ width: 350, }}>
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
                2,000 🪙 will be deducted. Do you wish to proceed?
            </Text>
            <View style={{ display: 'flex', flexDirection: 'row' }}>

                <Pressable
                    onPress={() => setTournamentState("NewOrJoinTournament")}
                    style={[styles.button]}

                >
                    <ImageBackground
                        source={images.button2}
                        resizeMode="stretch"
                        style={[styles.button, { opacity: 0.8 }]}
                    >
                        <Text style={styles.textStyle}>no</Text>
                    </ImageBackground>
                </Pressable>
                <Pressable
                    style={[styles.button]}
                    onPress={() => setTournamentState("NumberOfPlayersView")}
                >
                    <ImageBackground
                        source={images.button2}
                        resizeMode="stretch"
                        style={[styles.button, { opacity: 0.8 }]}
                    >
                        <Text style={styles.textStyle}>yes</Text>
                    </ImageBackground>
                </Pressable>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    rowTop: {
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.95
    },
    rowBottom: {

        backgroundColor: 'lightcoral',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2
    },
    text: {
        color: 'white',
        fontSize: 18,
    },
    button: {
        width: 100,
        height: 51,
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
export default ConfirmTournamentView