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

const BoardSize = 8;
const CandyTypes = ["🤰", "🥦", "🐶", "🍧", "🍉", "🍄", "🍬", "👶", "🚫"];
const WinningScore = 200;
const InitialTime = 120;

const CandyCrushGameLevel03 = ({ navigation }) => {
	const [board, setBoard] = useState(createBoard());
	const [score, setScore] = useState(0);
	const [timeLeft, setTimeLeft] = useState(InitialTime);
	const [selectedCandy, setSelectedCandy] = useState(null);

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
			);
			resetGame();
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

	const resetGame = () => {
		setBoard(createBoard());
		// setScore(0);
		// setTimeLeft(InitialTime);
		setSelectedCandy(null);
	};

	const handlePress = (row, col) => {
		if (board[row][col] === "🚫") return; // Prevent pressing the "🚫" emoji

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
	};

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
			source={require("../assets/game03background.jpg")}
			style={styles.backgroundImage}
			resizeMode="cover">
			<Button title="Refresh" onPress={resetGame} color="#702963" />
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
	backgroundImage: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		color: "black",
		marginBottom: 5,
		fontWeight: "bold",
		fontSize: 16,
	},
	board: {
		width: 380,
		height: 400,
		backgroundColor: "#191970",
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
	},
	candyText: {
		fontSize: 30,
	},
});

export default CandyCrushGameLevel03;
