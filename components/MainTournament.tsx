import React from "react";
import images from "@/assets/images";
import { View, StyleSheet, ImageBackground, Text, Pressable, Easing, } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGameContext } from "@/contexts/GameContext";
import Animated, { BounceIn, BounceInDown, BounceInUp, BounceOut, FadeIn, FadeInUp, FadeOut, FlipInEasyX, LightSpeedInRight, LightSpeedOutLeft, PinwheelIn, SlideInDown, SlideInUp, StretchInX, StretchInY, StretchOutX, StretchOutY, ZoomIn, ZoomOut } from "react-native-reanimated";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import LevelClearModal from "./LevelClearModal";
import { gameQuests0, gameQuests1, gameQuests2, gameQuests3, gameQuests4, gameQuests5, gameQuests6, gameQuests7 } from "@/app/gameQuests";
import { BlobServiceClient } from "@azure/storage-blob";
import { Tournament } from "@/types";
import tournamentQuests from "@/app/tournamentQuests";
import { getToken } from "@/app/config/getToken";
import TournamentWinnerModal from "./TournamentWinnerModal";
import RunnerUpsModal from "./RunnerUpsModal";

export interface Letter {
    letter: string;
    id: string;
    isUnLocked: boolean
}
const sampleData = {
    word: "travel",
    imageURL: images.sample,
    hint: "Move from one place to another, often over a long distance.",
}
const account = process.env.EXPO_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME;
const sasToken = process.env.EXPO_PUBLIC_AZURE_STORAGE_SAS_TOKEN;
const containerName = process.env.EXPO_PUBLIC_AZURE_STORAGE_CONTAINER_NAME;
const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net?${sasToken}`);
if (!containerName) {
    throw new Error("Azure Storage container name is not defined");
}
const containerClient = blobServiceClient.getContainerClient(containerName);

async function getBlobUrl(blobName: string) {
    const blobClient = containerClient.getBlobClient(blobName);
    const blobUrl = blobClient.url;
    return blobUrl;
}
const gameQuests = [gameQuests0,/*  gameQuests1, gameQuests2, gameQuests3, gameQuests4, gameQuests5, gameQuests6, gameQuests7 */]
interface TournamentProps {
    tournament: Tournament;
    userId: string;
}

const MainTournament = ({ tournament, userId }: TournamentProps) => {
    const { switchGameState } = useGameContext()
    const [isHintLocked, setIsHintLocked] = useState(true)
    const [inputLetters, setInputLetters] = useState<Letter[]>([]);
    const [outputLetters, setOutputLetters] = useState<Letter[]>([]);
    const [solution, setSolution] = useState("");
    const [hints, setHints] = useState("");
    const [questImageUrl, setQuestImageUrl] = useState<string | undefined>(undefined);
    const [currentQuest, setCurrentQuest] = useState();
    const [showInputLetters, setShowInputLetters] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [level, setLevel] = useState(1);
    const [scores, setScores] = useState(5000);
    const [foundQuestsIndex, setFoundQuestsIndex] = useState<Array<number>>([]);
    const [currentQuestArrayNumber, setCurrentQuestArrayNumber] = useState(0);
    const [unlockedLettersIndex, setUnlockedLettersIndex] = useState<number[]>(
        []
    );
    const [unlockPrice, setUnlockPrice] = useState(500);
    const [isTournamentWinnerModal, setIsTournamentWinnerModal] = useState(false);
    const [isTournamentRunnerUpModal, setIsTournamentRunnerUpModal] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowInputLetters(true);
        }, 300);

        return () => clearTimeout(timer); // Cleanup on unmount
    }, []);
    const initializeOutputLetters = (word: string): Letter[] => {
        return word
            .split("")
            .map((_, index) => ({ letter: " ", id: String(index), isUnLocked: false }));
    };

    const randomizeString = (solutionWord: string) => {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        const lettersToAdd = 12 - solutionWord.length;

        // Generate a string of random letters to pad the original word
        let randomLetters = "";
        for (let i = 0; i < lettersToAdd; i++) {
            randomLetters += alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        // setRandomLettersToAdd(randomLetters);

        // Combine the original word with the random letters
        const paddedString = solutionWord + randomLetters;

        // Convert the string into an array of characters
        let array = paddedString.split("");

        // Shuffle the array using the Fisher-Yates algorithm
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        // Convert the string into an array of objects with `letter` and `id` properties
        let lettersArray = array.map((letter, index) => ({
            letter: letter.toUpperCase(),
            id: index.toString(),
            isUnLocked: false
        }));

        // Set the letters array using the provided setLetters function
        setInputLetters(lettersArray);
    };

    /* This function removes the selected letter from the input and 
      adds it to the output when the letter is pressed. */

    const handleInputLetterPress = (letter: Letter) => {
        let count = 0;

        for (let item of inputLetters) {
            if (item.letter === " ") {
                count++;
            }
        }
        if (count >= outputLetters.length) {
            return;
        }
        console.log("clicked", letter.letter)
        setInputLetters((prevLetters) =>
            prevLetters.map((item) =>
                item.id === letter.id ? { ...item, letter: " ", id: item.id } : item
            )
        );
        setOutputLetters((prevOutputLetters) => {
            const index = prevOutputLetters.findIndex((item) => item.letter === " ");
            if (index !== -1) {
                const newOutputLetters = [...prevOutputLetters];
                newOutputLetters[index] = { letter: letter.letter, id: letter.id, isUnLocked: letter.isUnLocked };
                return newOutputLetters;
            }
            return prevOutputLetters;
        });
    };
    const handleOutputLetterPress = (item: Letter, index: number) => {
        console.log(index);
        const letterClone = [...inputLetters];
        letterClone[Number(item.id)] = { letter: item.letter, id: String(item.id), isUnLocked: item.isUnLocked };
        setInputLetters(letterClone);
        const outputLettersClone = [...outputLetters];
        outputLettersClone[index] = { letter: " ", id: String(index), isUnLocked: item.isUnLocked };
        setOutputLetters(outputLettersClone);
    };

    function replaceAndMoveLetters() {
        let inputArray = [...inputLetters]
        let outputArray = [...outputLetters]
        // Step 1: Replace letters in outputArray
        for (let i = 0; i < outputArray.length; i++) {
            if (!outputArray[i].isUnLocked) {
                let letterToMove = outputArray[i].letter;
                outputArray[i].letter = " ";

                // Step 2: Move the replaced letters into the inputArray
                for (let j = 0; j < inputArray.length; j++) {
                    if (inputArray[j].letter === " " && !inputArray[j].isUnLocked) {
                        inputArray[j].letter = letterToMove;
                        break;
                    }
                }
            }
        }
        setInputLetters(inputArray)
        setOutputLetters(outputArray)
    }

    function shuffleArray(array: Letter[]) {
        replaceAndMoveLetters()

        const shuffledArray = array.slice();

        // Create a copy of the array
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
        }
        // Update the id to be the index
        shuffledArray.forEach((item, index) => {
            item.id = index.toString();
        });
        return shuffledArray;
    }
    const shuffle = () => {

        const shuffledLetterArray = shuffleArray(inputLetters);
        //setOutputLetters(shuffledLetterArray)
        setInputLetters(shuffledLetterArray)

    };

    function generateRandomIndex(arrayLength: number, exclude: Array<number>) {
        // Function to generate a random index within the array length
        function getRandomIndex(max: number) {
            return Math.floor(Math.random() * max);
        }

        // Ensure we have a valid array length
        if (arrayLength <= 0) {
            throw new Error("Array length must be a positive integer");
        }

        // Set to keep track of excluded indices for quick lookup
        const excludeSet = new Set(exclude);

        let randomIndex;
        do {
            randomIndex = getRandomIndex(arrayLength);
        } while (excludeSet.has(randomIndex));

        return randomIndex;
    }
    function removeItemsIfNeeded() {

        const arr1 = [...foundQuestsIndex]
        const arr1Length = arr1.length;
        const arr2Length = gameQuests[currentQuestArrayNumber]?.length;
        if (arr1Length >= arr2Length - 1) {
            const itemsToRemoveCount = Math.floor(arr1Length);
            arr1.splice(0, itemsToRemoveCount);
            if (currentQuestArrayNumber >= gameQuests.length - 1) {
                setCurrentQuestArrayNumber(1)
                setFoundQuestsIndex([])
                //  saveGameData()
            }
            else {
                setCurrentQuestArrayNumber(currentQuestArrayNumber + 1);
                setFoundQuestsIndex(arr1)
            }
        }
    }

    const loadGame = async () => {
        const currentPlayer = tournament?.players.filter((eachPlayers) => {
            return (eachPlayers.userId === userId);
        });
        const currentTournamentLevel = tournament.tournamentQuestIndexes[currentPlayer[0].level!]
        const newQuest = tournamentQuests[currentTournamentLevel]

        setSolution(newQuest.word);
        setHints(newQuest.hint);

        const imageUrl = await getBlobUrl(newQuest.imageURL);
        setQuestImageUrl(imageUrl);

        setOutputLetters(initializeOutputLetters(newQuest.word));
        randomizeString(newQuest.word);
    };

    /*     const calculateScores = async () => {
            const newScores = 100 * solution.length;
            setScores(scores + newScores);
            setLevel(level + 1);
            setIsHintLocked(true);
            setUnlockedLettersIndex([]);
            try {
                const gameData = await AsyncStorage.getItem('gameData');
                const parsedGameData = JSON.parse(gameData!);
                console.log({ foundQuestsIndexuuuu: foundQuestsIndex })
    
                parsedGameData.scores = scores;
                parsedGameData.level = level;
                parsedGameData.currentQuestArrayNumber = currentQuestArrayNumber;
    
                await AsyncStorage.setItem('gameData', JSON.stringify(parsedGameData));
            } catch (error) {
                console.error('Error saving game data:', error);
            }
    
        }; */

    const [isUpdatingScores, setIsUpdatingScores] = useState(false);
    const calculateScores = async () => {

        const coins = 100 * solution.length;
        const currentPlayer = tournament.players.filter((eachPlayers) => {
            return (eachPlayers.userId === userId)
        })
        const token = await getToken();
        if (!token) {
            console.error("No token to send");
            return;
        }
        setIsUpdatingScores(true)
        // await updateScoreMutation({ tournamentName: tournament!.name, level: Number(currentPlayer[0].level), coins: Number(coins) })
        try {
            const response = await fetch('http://localhost:7071/api/updateLevel', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    tournamentName: tournament.name,
                    level: currentPlayer[0].level,
                    coins: coins,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update level');
            }

            const data = await response.json();
            console.log('Level updated successfully:', data);
        } catch (error) {
            console.log('Error updating level:', error);
            setIsUpdatingScores(false)
        }
        setIsUpdatingScores(false)

        setIsHintLocked(true);
        setUnlockedLettersIndex([]);


    };

    const checkWord = () => {
        let word = "";
        for (let item of outputLetters) {
            word += item.letter;
        }
        const currentPlayer = tournament.players.filter((eachPlayers) => {
            return (eachPlayers.userId === userId);
        })
        if (word.toLowerCase() === solution.toLowerCase()) {
            if (currentPlayer[0].level! < 5) {
                setModalVisible(true);
                calculateScores();
                setUnlockPrice(500);
            }
            if (currentPlayer[0].level === 5) {
                calculateScores();
            }
        }
    };
    useEffect(() => {
        loadGame()
    }, []);
    useEffect(() => {
        if (outputLetters.length > 0) {
            checkWord();
        }
    }, [outputLetters]);

    function unlockRandomLetter() {
        replaceAndMoveLetters()
        const max = solution.length;

        let newNumber;

        if (unlockedLettersIndex.length >= max) {
            console.log("All letters are already unlocked.");
            return;
        }
        do {
            newNumber = Math.floor(Math.random() * max);
        } while (unlockedLettersIndex.includes(newNumber));

        //push the newNumber into the unlockedLettersIndex array
        const unlockedLettersIndexClone = [...unlockedLettersIndex];
        unlockedLettersIndexClone.push(newNumber);
        setUnlockedLettersIndex(unlockedLettersIndexClone);

        // the random letter that was unlocked
        const randomLetter = solution.charAt(newNumber);

        const newOutputLetters = [...outputLetters];

        newOutputLetters[newNumber] = {
            letter: randomLetter.toLocaleUpperCase(),
            id: String(newNumber),
            isUnLocked: true
        };

        setOutputLetters(newOutputLetters);


        const lettersClone = [...inputLetters];

        const index = lettersClone.findIndex((item) => {
            if (item.isUnLocked === false) {

                return randomLetter.toUpperCase() === item.letter.toUpperCase();
            }
            return false;
        });

        lettersClone[index] = { ...lettersClone[index], letter: " ", isUnLocked: true };

        setScores(scores - unlockPrice)
        setInputLetters(lettersClone);
        setUnlockPrice(unlockPrice * 2)
    }

    const toggleHint = () => {
        setIsHintLocked(!isHintLocked);
    };



    const loadNextLevel = () => {
        setModalVisible(false);
        loadGame();
    };

    useEffect(() => {
        if (tournament.status === "ended") {
        
          if (tournament.winnerId === userId) {
            setIsTournamentWinnerModal(true)
          }
          else {
            setIsTournamentRunnerUpModal(true)
          }
        }
      }, [ tournament]);

    if (isTournamentWinnerModal) {
        return (
          <>
            <TournamentWinnerModal tournamentCoins={tournament?.players[0].coinsPerLevel} players={tournament?.players} userId={userId} tournament={tournament} />
          </>
        )
      }
    
      if (isTournamentRunnerUpModal) {
        return (
          <>
            <RunnerUpsModal tournament={tournament} userId={userId} />
          </>
        )
      }
    return (
        <>
            {modalVisible ? <LevelClearModal
                isUpdatingScores={isUpdatingScores}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                outputLetters={outputLetters}
                loadNextLevel={loadNextLevel}

            /> : ""}
            <Animated.View
                entering={LightSpeedInRight.springify()
                    .damping(30)
                    .mass(5)
                    .stiffness(10)
                    .overshootClamping(0)
                    .restDisplacementThreshold(0.1)
                    .restSpeedThreshold(5)} exiting={LightSpeedOutLeft.springify()
                        .damping(30)
                        .mass(5)
                        .stiffness(10)
                        .overshootClamping(0)
                        .restDisplacementThreshold(0.1)
                        .restSpeedThreshold(5)} style={styles.container}>
                <ImageBackground
                    source={images.bg2}
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%", opacity: 0.9 }}
                >
                    <View
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.7)',
                            elevation: 3,
                            minHeight: 100,
                            width: "100%",
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingHorizontal: 12,
                            paddingBottom: 8,
                        }}
                    >
                        <View
                            style={{
                                marginTop: 40,
                                marginBottom: 10,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Pressable>
                                <Text
                                    style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}
                                >
                                    🔙
                                </Text>
                            </Pressable>
                            <Text
                                style={{
                                    color: "#fff",
                                    fontSize: 15,
                                    fontWeight: "bold",
                                    textTransform: "uppercase",
                                }}
                            >
                                🏆Tournament🏆
                            </Text>
                        </View>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                            }}
                        >
                            {tournament?.players.map((eachPlayers) => {
                                return (
                                    <Text
                                        key={eachPlayers.userId}
                                        style={{
                                            fontSize: 17,
                                            textShadowColor: "rgba(0, 0, 255, 1)",
                                            textShadowOffset: { width: -1, height: 1 },
                                            textShadowRadius: 15,
                                            color: "#fff",
                                            fontWeight: "700",
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {eachPlayers.userId === userId
                                            ? "You"
                                            : eachPlayers.name}
                                        :
                                        {eachPlayers.level! + 1}
                                        /5
                                    </Text>
                                );
                            })}
                        </View>

                    </View>

                    <View
                        style={[
                            styles.flexItem1,
                            {
                                flex: 4,
                                width: "95%",
                                maxWidth: 400,
                            },
                        ]}
                    >
                        <Image source={questImageUrl} style={styles.image} />
                        <View
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {isHintLocked ? (
                                <Text></Text>
                            ) : (
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginTop: 5, backgroundColor: "rgba(0, 0, 15, .9)", borderRadius: 5,
                                        borderColor: "rgba(0, 0, 0, .9)",
                                        borderWidth: 6
                                    }}
                                >
                                    <Text
                                        selectable={false}
                                        style={{
                                            fontSize: 25,
                                            textShadowColor: "rgba(255, 255, 0, .8)",
                                            textShadowOffset: { width: -1, height: 1 },
                                            textShadowRadius: 15,
                                            fontWeight: "bold",

                                        }}
                                    >
                                        💡
                                    </Text>
                                    <Text
                                        selectable={false}
                                        style={{
                                            fontSize: 16,
                                            color: "white",
                                            textShadowColor: "blue",
                                            textShadowOffset: { width: -1, height: 1 },
                                            textShadowRadius: 15,
                                            fontStyle: "italic",
                                            textAlign: "left",
                                            padding: 2,

                                        }}
                                    >
                                        {hints}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <View
                        style={[
                            styles.flexItem2,
                            {
                                flex: 2,
                                width: "100%",
                            },
                        ]}
                    >
                        {showInputLetters ?
                            <Animated.Text entering={SlideInUp.delay(500)} style={styles.outputBox}>
                                {outputLetters.map((item, index) => (
                                    <Pressable
                                        disabled={item.letter === "_" || item.letter === " " || item.isUnLocked === true ? true : false}
                                        onPress={() => handleOutputLetterPress(item, index)}
                                        key={index}
                                        style={styles.outputButton}
                                    >
                                        <ImageBackground
                                            source={images.button2}
                                            resizeMode="cover"
                                            style={styles.outputBackgroundImage}
                                        >
                                            {/*   <Text selectable={false} style={styles.buttonText}>{item.letter === "_" ? " " : item.letter}</Text> */}
                                            {item.letter !== " " ? <Animated.Text entering={ZoomIn}
                                                exiting={ZoomOut}
                                            ><Text style={styles.buttonText}>{item.letter}</Text></Animated.Text> : <Text></Text>}
                                        </ImageBackground>
                                    </Pressable>
                                ))}
                            </Animated.Text> : <Text style={styles.outputBox}></Text>}

                    </View>
                    {showInputLetters ?
                        <View
                            style={[styles.flexItem3, { backgroundColor: "none", flex: 3 }]}
                        >
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {inputLetters.slice(0, 6).map((item) => (
                                    <Animated.Text key={item.id} entering={BounceIn}>
                                        <Pressable
                                            disabled={item.letter === "_" || item.letter === " " || item.isUnLocked}

                                            onPress={() => handleInputLetterPress(item)}
                                            style={styles.inputButton}
                                        >
                                            <ImageBackground
                                                source={images.button1}
                                                resizeMode="cover"
                                                style={styles.button1image}
                                            >

                                                {item.letter !== " " ? <Animated.Text entering={ZoomIn}
                                                    exiting={ZoomOut}
                                                ><Text style={styles.inputButtonText}>{item.letter}</Text></Animated.Text> : <Text></Text>}


                                            </ImageBackground>
                                        </Pressable> </Animated.Text>
                                ))}
                            </View>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "nowrap",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {inputLetters.slice(6, 12).map((item) => (
                                    <Animated.Text key={item.id} entering={BounceIn} >
                                        <Pressable
                                            disabled={item.letter === "_" || item.letter === " " || item.isUnLocked}

                                            onPress={() => handleInputLetterPress(item)}
                                            style={styles.inputButton}
                                        >
                                            <ImageBackground
                                                source={images.button1}
                                                resizeMode="cover"
                                                style={styles.button1image}
                                            >

                                                {item.letter !== " " ? <Animated.View entering={ZoomIn}

                                                    exiting={ZoomOut}
                                                ><Text style={styles.inputButtonText}>{item.letter}</Text></Animated.View> : <Text></Text>}


                                            </ImageBackground>
                                        </Pressable> </Animated.Text>
                                ))}
                            </View>
                            <Animated.View
                                entering={BounceInDown}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    flexWrap: "nowrap",
                                    marginBottom: 15,
                                }}
                            >
                                <Pressable style={styles.otherButton} onPress={toggleHint} disabled={!isHintLocked}>
                                    <ImageBackground
                                        source={images.button2}
                                        resizeMode="stretch"
                                        style={styles.button3image}
                                    >
                                        <Text style={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                                            <Text selectable={false} style={{ fontSize: 25 }}>💡</Text>
                                            <Text style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', marginRight: 6 }}>
                                                <Text selectable={false} style={{ fontSize: 14, fontWeight: 800, color: "#fff", margin: 0 }}>Hint</Text>
                                                {/* <Text style={{borderBottomColor:"rgba(0,0,0,0.8)", borderBottomWidth:1,marginVertical:2, width:'70%',}}></Text> */}
                                                <Text selectable={false} style={{ fontSize: 11, color: "#fff", fontWeight: 700, margin: 0, padding: 0, paddingHorizontal: 4, marginHorizontal: 5, backgroundColor: "rgba(0,0,250,0.6)", borderRadius: 5 }}>-1000</Text>
                                            </Text>
                                        </Text>
                                    </ImageBackground>
                                </Pressable>
                                <Pressable style={styles.otherButton} onPress={shuffle}>
                                    <ImageBackground
                                        source={images.button2}
                                        resizeMode="stretch"
                                        style={styles.button3image}
                                    >
                                        <Text selectable={false} style={styles.otherButtonText}>Shuffle</Text>
                                    </ImageBackground>
                                </Pressable>
                                <Pressable

                                    style={styles.otherButton}
                                    onPress={unlockRandomLetter}
                                >
                                    <ImageBackground
                                        source={images.button2}
                                        resizeMode="stretch"
                                        style={styles.button3image}
                                    >
                                        <View style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
                                            <Text selectable={false} style={{ fontSize: 18 }}>🔓</Text>
                                            <Text style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                                <Text selectable={false} style={{ fontSize: 14, fontWeight: 800, color: "#fff", margin: 0 }}>1 word</Text>
                                                {/* <Text style={{borderBottomColor:"rgba(0,0,0,0.8)", borderBottomWidth:1,marginVertical:2, width:'70%',}}></Text> */}
                                                <Text selectable={false} style={{ fontSize: 11, color: "#fff", fontWeight: 700, margin: 0, padding: 0, paddingHorizontal: 8, backgroundColor: "rgba(200,0,0,0.7)", borderRadius: 4 }}>-{unlockPrice}</Text>
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </Pressable>
                            </Animated.View>
                        </View> : <View
                            style={[styles.flexItem3, { backgroundColor: "none", flex: 3 }]}
                        ></View>}
                </ImageBackground>
            </Animated.View>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "rgba(255,0,0,0.95)",
    },
    flexItem1: {
        alignSelf: "center",
    },
    flexItem2: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },

    flexItem3: {
        display: "flex",
        flexDirection: "column",
        maxWidth: 350,
        height: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        alignContent: "center",
        flexWrap: "nowrap",
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: 0,
    },
    image: {
        width: "100%",
        height: "100%",
        alignSelf: "center",
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: "rgba(20,20,20,0.7)",
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.9)',
        elevation: 4,
    },
    button: {
        backgroundColor: "#DDDDDD",
        margin: 3,
        borderRadius: 0,
        width: "13%",
        height: "20%",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 23,
        fontWeight: "700",
        textAlign: "center",
        color: "#fff",
    },
    outputBox: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        display: "flex",
        height: "100%",
    },
    outputButton: {
        margin: 2,
        width: 35,
        height: 35,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexWrap: "nowrap",
        borderRadius: 0,
    },
    shuffleButton: {
        display: "flex",
        alignItems: "center",
        width: 100,
        height: 50,
    },
    shuffleButtonText: {
        fontSize: 23,
        color: "#fff",
        fontWeight: "700",
        textAlign: "center",
    },
    hintText: {
        fontSize: 18,
        textAlign: "left",
        width: "100%",
        marginHorizontal: "auto",
        maxWidth: 400,
        textShadowColor: "rgba(0, 0, 255, 1)",
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 15,
        color: "#fff",
        fontWeight: 700,
        marginTop: 10,
    },
    hintButton: {
        padding: 5,
        backgroundColor: "green",
        margin: 5,
        borderRadius: 5,
    },
    inputButton: {
        margin: 3,
        borderRadius: 12,
        width: 45,
        height: 45,

        /*   backgroundColor: 'red', */
    },
    button1image: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",

        opacity: 0.85,
    },
    button2image: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
    },
    inputButtonText: {
        fontSize: 21,
        color: "#fff",
        fontWeight: "200",
        textShadowColor: "rgba(255, 255, 255, 0.6)",
        textShadowOffset: { width: 10, height: 10 },
        textShadowRadius: 19,
        fontFamily: "JungleAdventurer",
        //JungleAdventurer, CANDSB
    },
    button3image: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
    },
    otherButton: {
        margin: 3,
        borderRadius: 5,
        width: 96,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        opacity: 0.85,
    },
    otherButtonText: {
        fontSize: 19,
        color: "#fff",
        fontWeight: "700",
    },
    outputBackgroundImage: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
});
export default MainTournament


