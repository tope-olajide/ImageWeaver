
import {
    Modal,
    StyleSheet,
    View,
    ImageBackground, Text,
    Pressable,
    ActivityIndicator,
    FlatList
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import images from "@/assets/images";
import { getToken, initializeMsal } from "@/app/config/getToken";
import url from "@/app/config/getUrl";
interface SpinnerModalProps {
    alertModalVisible: boolean;
    setAlertModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const initialHighScores = [
    { id: '1', name: 'Alice', score: 250 },
    { id: '2', name: 'Bob', score: 200 },
    { id: '3', name: 'Charlie', score: 180 },
    { id: '4', name: 'David', score: 150 },
    { id: '5', name: 'Eve', score: 120 },
    { id: '6', name: 'Frank', score: 100 },
    { id: '7', name: 'Grace', score: 90 },
    { id: '8', name: 'Hank', score: 80 },
    { id: '9', name: 'Ivy', score: 70 },
    { id: '10', name: 'Jack', score: 60 },
];

const renderItem = ({ item }: { item: { id: string; name: string; level: number } }) => (
    <View style={styles.item}>
        <Text style={styles.name}>{item.name.split(" ")[0]}</Text>
        <Text style={styles.score}>{item.level}</Text>
    </View>
);
const HighScores: FC<SpinnerModalProps> = ({
    alertModalVisible,
    setAlertModalVisible,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [highScores, setHighScores] = useState([]);
    useEffect(() => {

        const fetchHighScores = async () => {
            await initializeMsal(); // Ensure MSAL is initialized before getting the token
            const token = await getToken();
            if (!token) {
                console.error("No token to send");
                return;
            }
            setIsLoading(true);
            try {
                const response = await fetch(url.fetchHighScores,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                // Assuming the API returns an array of high scores
                console.log({ data })
                setHighScores(data);

            } catch (error) {
                console.error('Error fetching high scores:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHighScores();
    }, []);
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={alertModalVisible}
            >
                <View
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(15,0,0,0.8)",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <View
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(0,0,0,0.8)",
                            width: "80%",
                            minHeight: "55%",
                        }}
                    >
                        <ImageBackground
                            source={images.bg5}
                            blurRadius={40}
                            style={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: "#E62E2D",
                                position: "relative", borderRadius: 10,
                                display: "flex",
                                justifyContent: "space-between",
                                padding: 20,
                            }}>
                            <Pressable onPress={() => { setAlertModalVisible(false) }} style={{ width: 30, height: 30, borderRadius: 20, backgroundColor: "(rgba(255,255,255,0.2))", alignItems: "center", justifyContent: "center", alignSelf: "flex-end", margin: 6 }}>
                                <AntDesign name="close" size={24} color="(rgba(255,255,255,0.8))" />
                            </Pressable>
                            <View>
                                <Text style={{ textAlign: "center", color: "#fff", fontSize: 20, fontWeight: "800", textTransform: "uppercase", marginBottom: 5 }}>High Scores </Text>

                            </View>
                            {isLoading ? <View style={{ marginVertical: 100 }}>
                                <ActivityIndicator size={50} color="rgba(250, 250, 250, 0.8)" />
                            </View> :
                                <>
                                    <View style={styles.item}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                                            <Text style={{color:"rgba(0,0,0,.8)", fontWeight:700}}>Name</Text>
                                            <Text style={{color:"rgba(0,0,0,.8)", fontWeight:700}}>Level</Text>  
                                        </View>  
                                    </View><FlatList
                                        data={highScores}
                                        renderItem={renderItem}
                                        keyExtractor={item => item.id} />
                                </>
                            }

                            <View style={{ marginVertical: 10 }}>

                                <Pressable onPress={() => setAlertModalVisible(false)} style={{
                                    backgroundColor: 'rgba(175,155,0,0.8)',
                                    paddingVertical: 10,
                                    paddingHorizontal: 24,
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginHorizontal: "auto",
                                    width: "60%",

                                }}>
                                    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600", textTransform: "uppercase" }}>Close</Text>
                                </Pressable>
                            </View>
                        </ImageBackground>

                    </View>

                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: -1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 6,
        marginVertical: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        width: "80%",
        marginHorizontal: "auto",
    },

    name: {
        fontSize: 15,
        color: "#fff"
    },
    score: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#fff"
    },
    footer: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 10,
        textAlign: "center",
        marginBottom: 10
    },
});

export default HighScores;
