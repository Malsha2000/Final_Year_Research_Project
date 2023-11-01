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

const Level01InstructionsPage = ({ navigation }) => {
	return (
		<>
			<ScrollView style={styles.container}>
				<View style={styles.bottomView}>
					<View style={{ padding: 25 }}>
						<View
							style={{
								justifyContent: "center",
								alignItems: "center",
								display: "flex",
							}}>
							<Text
								style={{
									display: "flex",
									color: "#E53057",
									fontSize: 28,
									fontWeight: "bold",
									marginBottom: 25,
									marginTop: 35,
								}}>
								INSTRUCTIONS
							</Text>
						</View>
						<View
							style={{
								justifyContent: "center",
								padding: 10,
							}}>
							<Text
								style={{
									color: "black",
									fontSize: 16,
									// fontWeight: "bold",
									textAlign: "justify",
									marginTop: 30,
								}}>
								01. You can match same candy types more
								than three.
							</Text>
							<Text
								style={{
									color: "black",
									fontSize: 16,
									// fontWeight: "bold",
									textAlign: "justify",
									marginTop: 20,
								}}>
								02. After matching same type candy types,
								those are removed.
							</Text>
							<Text
								style={{
									color: "black",
									fontSize: 16,
									// fontWeight: "bold",
									textAlign: "justify",
									marginTop: 20,
								}}>
								03. According to your matching, you can get
								a score for that.
							</Text>
							<Text
								style={{
									color: "black",
									fontSize: 16,
									// fontWeight: "bold",
									textAlign: "justify",
									marginTop: 20,
								}}>
								04. You can get an any score in the give
								time period.
							</Text>
							<Text
								style={{
									color: "black",
									fontSize: 16,
									// fontWeight: "bold",
									textAlign: "justify",
									marginTop: 20,
								}}>
								05. The game will be given winning score
								automatically.
							</Text>
							<Text
								style={{
									color: "black",
									fontSize: 16,
									// fontWeight: "bold",
									textAlign: "justify",
									marginTop: 20,
								}}>
								06. If you get a highest score more than
								winning score, You can win the game.
							</Text>
							<Text
								style={{
									color: "black",
									fontSize: 16,
									// fontWeight: "bold",
									textAlign: "justify",
									marginTop: 20,
								}}>
								07. If you cannot find same cand types, you
								can click refresh button to refresh the
								board. (Your score and remaining time
								period will not change.)
							</Text>
						</View>

						<View style={{ marginTop: 40 }}>
							<TouchableOpacity
								style={{
									backgroundColor: "#37474F",
									height: 50,
									marginBottom: 20,
									justifyContent: "center",
									alignItems: "center",
									marginHorizontal: 80,
									borderRadius: 24,
									width: 200,
								}}
								onPress={() =>
									// navigation.navigate("Candy Crush")
                                    navigation.navigate("GameLevel05")
								}>
								<Text
									bold
									medium
									center
									style={{
										color: "white",
										fontSize: 20,
									}}>
									Play
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
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
		flex: 2,
		// backgroundColor: "#F8C8DC",
	},
});

export default Level01InstructionsPage;
