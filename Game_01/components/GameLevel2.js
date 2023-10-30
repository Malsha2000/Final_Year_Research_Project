import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Alert,
	Button,
	ImageBackground,
} from "react-native";

const BoardSize = 7; // Increased board size
const CandyTypes = ["🤰", "🍼", "🌼", "🧸", "🤱", "🍇", "🍬"]; // Increased candy types
const WinningScore = 100;

const CandyCrushGameLevel02 = ({ navigation }) => {
	const [board, setBoard] = useState(createBoard());
	const [score, setScore] = useState(0);
	const [timeLeft, setTimeLeft] = useState(90);
	const [selectedCandy, setSelectedCandy] = useState(null);

	const resetGame = () => {
		setBoard(createBoard());
		// setScore(0);
		// setTimeLeft(60); // Reset time to 60 seconds
		setSelectedCandy(null);
	};

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		if (timeLeft === 0) {
			Alert.alert(
				"Game Over",
				`Time is up! You ${
					score > WinningScore ? "win!" : "lose!"
				}`,
				[
					{
						text: "OK",
						onPress: () => {
							// Navigate to different screens based on the score
							if (score >= 50) {
								navigation.navigate("GameLevel03");
							} else {
								navigation.navigate("Candy Crush");
							}
						},
					},
				],
			);
		}
	}, [timeLeft]);

	function createBoard() {
		const newBoard = [];
		for (let row = 0; row < BoardSize; row++) {
			const newRow = [];
			for (let col = 0; col < BoardSize; col++) {
				newRow.push(
					CandyTypes[
						Math.floor(Math.random() * CandyTypes.length)
					],
				);
			}
			newBoard.push(newRow);
		}
		return newBoard;
	}

	function handlePress(row, col) {
		if (selectedCandy) {
			const [selectedRow, selectedCol] = selectedCandy;
			const dx = Math.abs(selectedRow - row);
			const dy = Math.abs(selectedCol - col);
			if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
				// Adjacent candy selected
				const newBoard = JSON.parse(JSON.stringify(board)); // Deep clone the board
				[newBoard[selectedRow][selectedCol], newBoard[row][col]] =
					[
						newBoard[row][col],
						newBoard[selectedRow][selectedCol],
					];
				if (checkForMatch(newBoard)) {
					setBoard(newBoard);
				}
			}
			setSelectedCandy(null);
		} else {
			setSelectedCandy([row, col]);
		}
	}

	function isBoardClear() {
		for (let row = 0; row < BoardSize; row++) {
			for (let col = 0; col < BoardSize; col++) {
				if (board[row][col] !== null) {
					return false;
				}
			}
		}
		return true;
	}

	function checkForMatch(board) {
		const toClear = [];
		// Check for horizontal matches
		for (let row = 0; row < BoardSize; row++) {
			for (let col = 0; col < BoardSize - 2; col++) {
				const candy = board[row][col];
				if (
					candy &&
					candy === board[row][col + 1] &&
					candy === board[row][col + 2]
				) {
					toClear.push(
						[row, col],
						[row, col + 1],
						[row, col + 2],
					);
				}
			}
		}

		// Check for vertical matches
		for (let col = 0; col < BoardSize; col++) {
			for (let row = 0; row < BoardSize - 2; row++) {
				const candy = board[row][col];
				if (
					candy &&
					candy === board[row + 1][col] &&
					candy === board[row + 2][col]
				) {
					toClear.push(
						[row, col],
						[row + 1, col],
						[row + 2, col],
					);
				}
			}
		}

		if (toClear.length === 0) return false; // No matches found

		// Clear matched candies
		let points = 0;
		toClear.forEach(([row, col]) => {
			if (board[row][col] !== null) {
				points += 5; // Assuming each candy gives 5 points
				board[row][col] = null;
			}
		});
		setScore((prevScore) => prevScore + points);

		// Make candies fall down
		for (let col = 0; col < BoardSize; col++) {
			let shift = 0;
			for (let row = BoardSize - 1; row >= 0; row--) {
				if (board[row][col] === null) {
					shift++;
				} else if (shift > 0) {
					board[row + shift][col] = board[row][col];
					board[row][col] = null;
				}
			}
		}

		// Refill the board
		for (let col = 0; col < BoardSize; col++) {
			for (let row = 0; row < BoardSize; row++) {
				if (board[row][col] === null) {
					board[row][col] =
						CandyTypes[
							Math.floor(Math.random() * CandyTypes.length)
						];
				}
			}
		}

		return true; // Matches were found and cleared
	}

	return (
		<ImageBackground
			source={require("../assets/Game02background.jpg")}
			style={styles.backgroundImage}
			resizeMode="cover">
			<Button
				title="Refresh"
				onPress={resetGame}
				color="#DE3163"
				style={{ marginBottom: 10 }}
			/>
			<Text style={styles.text}>Score: {score}</Text>
			<Text style={styles.text}>Time Left: {timeLeft}s</Text>
			<View style={styles.board}>
				{board.map((row, rowIndex) => (
					<View key={rowIndex} style={styles.row}>
						{row.map((candy, colIndex) => (
							<TouchableOpacity
								key={colIndex}
								style={styles.candy}
								onPress={() =>
									handlePress(rowIndex, colIndex)
								}>
								<Text style={styles.candyText}>
									{candy}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				))}
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "black",
	},
	board: {
		width: 380, // Adjusted according to the new board size
		height: 400, // Adjusted according to the new board size
		backgroundColor: "#097969",
		borderColor: "white",
	},
	row: {
		flex: 1,
		flexDirection: "row",
	},
	candy: {
		flex: 1,
		aspectRatio: 1,
		justifyContent: "center",
		alignItems: "center",
		borderColor: "white",
		borderWidth: 1,
		borderRadius: 4,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 2,
	},
	candyText: {
		fontSize: 30,
		textAlign: "center",
		textAlignVertical: "center",
		includeFontPadding: false,
		flex: 1,
	},
	text: {
		color: "black",
		marginBottom: 5,
		fontWeight: "bold",
		fontSize: 16,
	},
	backgroundImage: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default CandyCrushGameLevel02;
