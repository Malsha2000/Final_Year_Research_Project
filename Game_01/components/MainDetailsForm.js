import React from "react";
import {
	ScrollView,
	ImageBackground,
	Dimensions,
	TextInput,
	View,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import Text from "@kaloraat/react-native-text";

const MainDetailsForm = ({ navigation }) => {
	return (
		<>
			<View style={styles.bottomView}>
				<View style={{ padding: 25 }}>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
						}}>
						{/* <Text
							style={{
								color: "black",
								fontSize: 12,
								fontWeight: "bold",
							}}>
							The questionnaire below is called the Edinburgh
							Postnatal Depression Scale (EDPS) The EDPS was
							developed to identify women who may have
							postpartum depression. Each answer is given a
							score of 0 to 3 . The maximum score is 30.
						</Text> */}
					</View>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Text
							style={{
								color: "#0047AB",
								fontSize: 20,
								fontWeight: "bold",
								marginTop: 10,
                                marginBottom: 20,
							}}>
							Please answer for this questions
						</Text>
					</View>
					<View style={{ marginTop: 5 }}>
						<Text
							semi
							style={{
								fontSize: 15,
								fontWeight: "bold",
                                marginTop: 10,
							}}>
							Your Name:
						</Text>
						<TextInput
							style={{
								backgroundColor: "#ffffff",
								borderRadius: 15,
								height: 48,
								marginBottom: 10,
								marginTop: 10,
								shadowColor: "#000",
								shadowOffset: {
									width: 0,
									height: 8,
								},
								shadowOpacity: 0.46,
								shadowRadius: 11.14,
								fontSize: 13,

								elevation: 17,
							}}
							// value={value}
							// onChangeText={(text) => setValue(text)}
						/>
					</View>
                    <View style={{ marginTop: 5 }}>
						<Text
							semi
							style={{
								fontSize: 15,
								fontWeight: "bold",
                                marginTop: 10,
							}}>
							Your Age:
						</Text>
						<TextInput
							style={{
								backgroundColor: "#ffffff",
								borderRadius: 15,
								height: 48,
								marginBottom: 10,
								marginTop: 10,
								shadowColor: "#000",
								shadowOffset: {
									width: 0,
									height: 8,
								},
								shadowOpacity: 0.46,
								shadowRadius: 11.14,
								fontSize: 13,

								elevation: 17,
							}}
							// value={value}
							// onChangeText={(text) => setValue(text)}
						/>
					</View>
                    <View style={{ marginTop: 5 }}>
						<Text
							semi
							style={{
								fontSize: 15,
								fontWeight: "bold",
                                marginTop: 10,
							}}>
							Marital Status:{" "}
						</Text>
						<TextInput
							style={{
								backgroundColor: "#ffffff",
								borderRadius: 15,
								height: 48,
								marginBottom: 10,
								marginTop: 10,
								shadowColor: "#000",
								shadowOffset: {
									width: 0,
									height: 8,
								},
								shadowOpacity: 0.46,
								shadowRadius: 11.14,
								fontSize: 13,

								elevation: 17,
							}}
							// value={value}
							// onChangeText={(text) => setValue(text)}
						/>
					</View>
                    <View style={{ marginTop: 5 }}>
						<Text
							semi
							style={{
								fontSize: 15,
								fontWeight: "bold",
                                marginTop: 10,
							}}>
							Family Background:
						</Text>
						<TextInput
							style={{
								backgroundColor: "#ffffff",
								borderRadius: 15,
								height: 48,
								marginBottom: 10,
								marginTop: 10,
								shadowColor: "#000",
								shadowOffset: {
									width: 0,
									height: 8,
								},
								shadowOpacity: 0.46,
								shadowRadius: 11.14,
								fontSize: 13,

								elevation: 17,
							}}
							// value={value}
							// onChangeText={(text) => setValue(text)}
						/>
					</View>
                    <View style={{ marginTop: 5 }}>
						<Text
							semi
							style={{
								fontSize: 15,
								fontWeight: "bold",
                                marginTop: 10,
							}}>
							Previous Child Birth Experiences:
						</Text>
						<TextInput
							style={{
								backgroundColor: "#ffffff",
								borderRadius: 15,
								height: 48,
								marginBottom: 10,
								marginTop: 10,
								shadowColor: "#000",
								shadowOffset: {
									width: 0,
									height: 8,
								},
								shadowOpacity: 0.46,
								shadowRadius: 11.14,
								fontSize: 13,

								elevation: 17,
							}}
							// value={value}
							// onChangeText={(text) => setValue(text)}
						/>
					</View>
					<View style={{ marginTop: 40 }}>
						<TouchableOpacity
							style={{
								backgroundColor: "#260B8C",
								height: 50,
								marginBottom: 20,
								justifyContent: "center",
								alignItems: "center",
								marginHorizontal: 80,
								borderRadius: 24,
								width: 200,
							}}
							onPress={() =>
								navigation.navigate("Select Quiz Option")
							}>
							<Text
								bold
								medium
								center
								style={{ color: "white", fontSize: 20 }}>
								Next
							</Text>
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
		// bottom: 40,
		backgroundColor: "#F8C8DC",
		// borderTopStartRadius: 30,
		// borderTopEndRadius: 30,
	},
});

export default MainDetailsForm;
