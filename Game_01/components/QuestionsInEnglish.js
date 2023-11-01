import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import Text from "@kaloraat/react-native-text";
import RadioButton from "./RadioButton";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const QuestionInEnglishPage = ({ navigation }) => {
	const [questions, setQuestions] = useState([]);
	const [questionIndex, setQuestionIndex] = useState(0);
	const [selectedAnswerIndices, setSelectedAnswerIndices] = useState(
		new Array(questions.length).fill(null),
	);
	const [totalScore, setTotalScore] = useState(0);

	const setSelectedAnswer = (optionIndex, questionIndex) => {
		const newSelectedAnswerIndices = [...selectedAnswerIndices];
		newSelectedAnswerIndices[questionIndex] = optionIndex;
		setSelectedAnswerIndices(newSelectedAnswerIndices);

		// Calculate the total score based on the selected answer indices
		let newTotalScore = 0;
		for (let i = 0; i < selectedAnswerIndices.length; i++) {
			const selectedOptionIndex = selectedAnswerIndices[i];
			if (selectedOptionIndex !== null) {
				newTotalScore += questions[i].scores[selectedOptionIndex];
			}
		}
		setTotalScore(newTotalScore);
	};

	console.log(totalScore, "totalScore");

	useEffect(() => {
		loadData();
	}, []);

	const loadData = () => {
		axios
			.get("http://192.168.8.162:8082/api/questionnaire/english/all")
			// .get(
			// 	"http://192.168.45.147:8081/api/questionnaire/english/all",
			// )
			.then((response) => {
				// console.log(response.data);
				setQuestions(response.data.data);
			});
	};
	const handleNext = () => {
		if (questionIndex < questions.length - 2) {
			setQuestionIndex(questionIndex + 2);
		}
	};

	const handlePrevious = () => {
		if (questionIndex > 0) {
			setQuestionIndex(questionIndex - 2);
		}
	};

	const isOnFirstQuestions = questionIndex === 0;
	const isOnLastQuestions = questionIndex >= questions.length - 2;

	const appNavigation = useNavigation();

	// Handle navigation to the "Quiz Score" page and pass the totalScore as a parameter
	const handleNavigationToQuizScore = () => {
		appNavigation.navigate("Quiz Score", { score: totalScore });
	};

	return (
		<>
			<ScrollView style={styles.container}>
				<View style={{ backgroundColor: "white" }}>
					{questions
						.slice(questionIndex, questionIndex + 2)
						.map((question, index) => (
							<View
								style={{ padding: 18, marginTop: 2 }}
								key={question._id}>
								<View
									style={{
										justifyContent: "center",
										alignItems: "center",
									}}>
									<Text
										style={{
											color: "#DE3163",
											fontSize: 22,
											fontWeight: "bold",
										}}>
										Question{" "}
										{questionIndex + index + 1}
									</Text>
								</View>
								<View
									style={{
										// backgroundColor: "#FFC107",
										borderColor: "#FFC107", // Add this line to set the border color
										borderWidth: 3,
										borderRadius: 17,
										marginTop: 10,
										padding: 14,
									}}>
									<View
										style={{
											justifyContent: "center",
											alignItems: "center",
										}}>
										<Text
											style={{
												color: "black",
												fontSize: 15,
												fontWeight: "bold",
												marginTop: 16,
											}}>
											{question.question}
										</Text>
									</View>
									<View
										style={{
											marginTop: 30,
											gap: 10,
											marginBottom: 15,
											color: "black",
											marginRight: 25,
										}}>
										<RadioButton
											label={
												questions[
													questionIndex + index
												].answers[0]
											}
											selected={
												selectedAnswerIndices[
													questionIndex + index
												] === 0
											}
											onPress={() =>
												setSelectedAnswer(
													0,
													questionIndex + index,
												)
											}
											value={3}
										/>
										<RadioButton
											label={
												questions[
													questionIndex + index
												].answers[1]
											}
											selected={
												selectedAnswerIndices[
													questionIndex + index
												] === 1
											}
											onPress={() =>
												setSelectedAnswer(
													1,
													questionIndex + index,
												)
											}
											value={2}
										/>
										<RadioButton
											label={
												questions[
													questionIndex + index
												].answers[2]
											}
											selected={
												selectedAnswerIndices[
													questionIndex + index
												] === 2
											}
											onPress={() =>
												setSelectedAnswer(
													2,
													questionIndex + index,
												)
											}
											value={1}
										/>
										<RadioButton
											textColor="black"
											label={
												questions[
													questionIndex + index
												].answers[3]
											}
											selected={
												selectedAnswerIndices[
													questionIndex + index
												] === 3
											}
											onPress={() =>
												setSelectedAnswer(
													3,
													questionIndex + index,
												)
											}
											value={0}
										/>
									</View>
								</View>
							</View>
						))}
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginTop: 25,
							marginBottom: 50,
						}}>
						{!isOnFirstQuestions && (
							<TouchableOpacity
								style={{
									backgroundColor: "#DE3163",
									height: 50,
									justifyContent: "center",
									alignItems: "center",
									marginHorizontal: 20,
									borderRadius: 24,
									width: 140,
								}}
								onPress={handlePrevious}>
								<Text
									bold
									medium
									center
									style={{
										color: "white",
										fontSize: 17,
									}}>
									Back
								</Text>
							</TouchableOpacity>
						)}
						{!isOnLastQuestions && (
							<TouchableOpacity
								style={{
									backgroundColor: "#DE3163",
									height: 50,
									justifyContent: "center",
									alignItems: "center",
									marginHorizontal: isOnFirstQuestions
										? 240
										: 20,
									borderRadius: 24,
									width: 140,
								}}
								onPress={handleNext}>
								<Text
									bold
									medium
									center
									style={{
										color: "white",
										fontSize: 17,
									}}>
									Next
								</Text>
							</TouchableOpacity>
						)}
						{isOnLastQuestions && (
							<TouchableOpacity
								style={{
									backgroundColor: "blue",
									height: 50,
									justifyContent: "center",
									alignItems: "center",
									marginHorizontal: 20,
									borderRadius: 24,
									width: 150,
								}}
								onPress={handleNavigationToQuizScore}>
								<Text
									bold
									medium
									center
									style={{
										color: "white",
										fontSize: 20,
									}}>
									Submit
								</Text>
							</TouchableOpacity>
						)}
					</View>
				</View>

				{/* <View > */}

				{/* </View> */}
			</ScrollView>
		</>
	);
};

export default QuestionInEnglishPage;

const styles = StyleSheet.create({
	brandViewText: {
		// color: "#FFFFFF",
		fontSize: 40,
		fontWeight: "bold",
	},
	bottomView: {
		flex: 1.5,
		// bottom: 40,
		// backgroundColor: "red",
		// borderTopStartRadius: 30,
		// borderTopEndRadius: 30,
	},
});
