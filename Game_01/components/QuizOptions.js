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

const QuizOptionsPage = ({ navigation }) => {
	return (
		<>
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Image
					source={{
						uri: "https://www.cdc.gov/reproductivehealth/features/maternal-depression/images/feature-maternal-health-depression-2021.png?_=20351",
					}}
					style={{ width: 450, height: 400 }}
					resizeMode="contain"
				/>
			</View>
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
								color: "#DC143C",
								fontSize: 20,
								fontWeight: "bold",
								marginBottom: 25,
							}}>
							The Edinburgh Postnatal Depression
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							Scale (EDPS)
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
								fontSize: 12,
								fontWeight: "bold",
								textAlign: 'justify',
							}}>
							The questionnaire below is called the Edinburgh
							Postnatal Depression Scale (EDPS) The EDPS was
							developed to identify women who may have
							postpartum depression. Each answer is given a
							score of 0 to 3 . The maximum score is 30.
						</Text>
					</View>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Text
							style={{
								color: "black",
								fontSize: 20,
								fontWeight: "bold",
								marginTop: 40,
								textAlign: 'justify',
							}}>
							Select Your Prefered Option to &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Answer
						</Text>
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
								navigation.navigate("Quiz in English")
							}>
							<Text
								bold
								medium
								center
								style={{ color: "white", fontSize: 20 }}>
								English
							</Text>
						</TouchableOpacity>
					</View>
					<View style={{ marginTop: 7 }}>
						<TouchableOpacity
							style={{
								backgroundColor: "#260B8C",
								height: 50,
								justifyContent: "center",
								alignItems: "center",
								marginHorizontal: 80,
								borderRadius: 24,
								width: 200,
							}}
							onPress={() =>
								navigation.navigate("Quiz in Sinhala")
							}>
							<Text
								bold
								medium
								center
								style={{ color: "white", fontSize: 20 }}>
								සිංහල
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
		flex: 2,
		// backgroundColor: "#F8C8DC",
	},
});

export default QuizOptionsPage;
