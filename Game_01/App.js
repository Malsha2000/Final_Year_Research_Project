import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import QuizOptionsPage from "./components/QuizOptions";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuestionInEnglishPage from "./components/QuestionsInEnglish";
import QuestionInSinhalaPage from "./components/QuestionsInSinhala";
import MainDetailsForm from "./components/MainDetailsForm";
import QuizScoreDisplayPage from "./components/QuizScoreDisplayPage";
import CandyCrushGame from "./components/CandyCrushGame";
// import CandyCrush from "./components/Candycrush";
import NewGame from "./components/NewGame";
import CandyCrushGameLevel02 from "./components/GameLevel2";
import ChooseGame from "./components/ChooseGame";
import CandyCrushGameLevel03 from "./components/GameLevel3";
import Level01InstructionsPage from "./components/Level01Instructions";
import CandyCrushGameLevel04 from "./components/GameLevel04";
import CandyCrushGameLevel05 from "./components/GameLevel05";

export default function App() {
	const Stack = createNativeStackNavigator();
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: "#DCDCDC",
					},
					headerTintColor: "#000",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}>
				<Stack.Screen
					name="Main Details Form"
					component={MainDetailsForm}
				/>
				<Stack.Screen
					name="Select Quiz Option"
					component={QuizOptionsPage}
				/>
				<Stack.Screen
					name="Quiz in English"
					component={QuestionInEnglishPage}
				/>
				<Stack.Screen
					name="Quiz in Sinhala"
					component={QuestionInSinhalaPage}
				/>
				<Stack.Screen
					name="Quiz Score"
					component={QuizScoreDisplayPage}
				/>
				<Stack.Screen name="Instructions 01" component={Level01InstructionsPage} />
				<Stack.Screen
					name="Candy Crush"
					component={CandyCrushGame}
				/>

				<Stack.Screen
					name="Level 02"
					component={CandyCrushGameLevel02}
				/>
				<Stack.Screen name="NewGame" component={NewGame} />
				<Stack.Screen name="ChooseGame" component={ChooseGame} />
				<Stack.Screen name="GameLevel03" component={CandyCrushGameLevel03} />
				<Stack.Screen name="GameLevel04" component={CandyCrushGameLevel04} />
				<Stack.Screen name="GameLevel05" component={CandyCrushGameLevel05} />
			</Stack.Navigator>
		</NavigationContainer>
		// <View style={styles.container}>
		//   <Text>Open up App.js to start working on your app!</Text>
		//   <StatusBar style="auto" />
		// </View>
	);
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
