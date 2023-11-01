import React from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	ImageBackground,
} from "react-native";
import Text from "@kaloraat/react-native-text";

const QuizScoreDisplayPage = ({ route, navigation }) => {
	const { score } = route.params;

	return (
		<ImageBackground
			source={require("../assets/score_background.png")}
			style={styles.backgroundImage}
			resizeMode="cover">
			<View style={styles.container}>
				<Text style={styles.mainText}>Your Depression Level</Text>
				{/* <Text style={styles.mainText}>Level</Text> */}
				<View style={styles.mainCircle}>
					<View style={styles.circle}>
						<Text style={styles.scoreText}>{score}/30</Text>
					</View>
				</View>
				<View style={{ marginTop: 40 }}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => navigation.navigate("ChooseGame")}>
						<Text bold medium center style={styles.buttonText}>
							Choose a Game
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	backgroundImage: {
		flex: 1,
		width: "77%",
		height: "80%",
		// zIndex: -5
	},
	circle: {
		width: 180,
		height: 180,
		borderRadius: 100,
		backgroundColor: "#DE3163",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 3,
	},
	mainCircle: {
		width: 210,
		height: 210,
		borderRadius: 125,
		backgroundColor: "#ffd700",
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#DE3163",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 1.84,
		elevation: 5,
		marginTop: 350,
		marginLeft: 210,
	},
	scoreText: {
		color: "#fff",
		fontSize: 40,
	},
	mainText: {
		color: "#000",
		fontSize: 22,
		marginBottom: 30,
		fontWeight: "bold",
		justifyContent: "center",
		alignItems: "center",
		display: "flex",
	},
	button: {
		backgroundColor: "#260B8C",
		height: 50,
		marginBottom: 20,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 180,
		borderRadius: 24,
		width: 220,
		marginLeft: 250,
	},
	buttonText: {
		color: "white",
		fontSize: 17,
	},
});

export default QuizScoreDisplayPage;
