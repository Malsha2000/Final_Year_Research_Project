import React from "react";
import {
	ScrollView,
	ImageBackground,
	Dimensions,
	Image,
	View,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import Text from "@kaloraat/react-native-text";

const ChooseGame = ({ navigation }) => {
	return (
		<>
			<View style={styles.bottomView}>
				<View style={{ padding: 25 }}>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
						}}></View>

					<View style={{ marginTop: 40 }}>
						<TouchableOpacity
							style={{
								backgroundColor: "#260B8C",
								height: 300,
								marginBottom: 20,
								// justifyContent: "center",
								alignItems: "center",
								marginHorizontal: 10,
								borderRadius: 24,
								width: 340,
							}}
							onPress={() =>
								navigation.navigate("Instructions 01")
							}>
							<View style={styles.container}>
								<View style={styles.imageContainer}>
									<ImageBackground
										source={require("../assets/Game01.jpg")}
										style={styles.backgroundImage}
										resizeMode="cover">
										<View style={styles.box}></View>
										<Text
											bold
											medium
											style={{
												color: "black",
												fontSize: 25,
												marginTop: -45,
												marginLeft: 20,
												fontWeight: 700,
											}}>
											Mommy's Sweet Match
										</Text>
									</ImageBackground>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View style={{ marginTop: 35 }}>
						<TouchableOpacity
							style={{
								backgroundColor: "#260B8C",
								height: 300,
								justifyContent: "center",
								alignItems: "center",
								marginHorizontal: 10,
								borderRadius: 24,
								width: 340,
							}}
							// onPress={() =>
							// 	navigation.navigate("Quiz in Sinhala")
							// }
						>
							<ImageBackground
								source={require("../assets/Game02.jpg")}
								style={styles.backgroundImage}
								resizeMode="cover">
								<View style={styles.box}></View>
								<Text
									bold
									medium
									center
									style={{
										color: "black",
										fontSize: 25,
										marginTop: -45,
										marginLeft: 20,
										fontWeight: 700,
									}}>
									Game 02
								</Text>
							</ImageBackground>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	brandViewText: {
		color: "#FFFFFF",
		fontSize: 40,
		fontWeight: "bold",
	},
	bottomView: {
		flex: 1.5,
		backgroundColor: "#FFFFFF",
	},
	backgroundImage: {
		flex: 1,
		width: 340,
		height: 300,
		borderRadius: 50,
	},
	imageContainer: {
		borderRadius: 24,
		overflow: "hidden",
		width: "100%",
		height: "100%",
	},
	box: {
		backgroundColor: "white",
		height: 50,
		marginTop: 250,
		opacity: 0.5,
	},
});

export default ChooseGame;
