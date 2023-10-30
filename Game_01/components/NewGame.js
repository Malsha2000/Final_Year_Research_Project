import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	TouchableOpacity,
	Modal,
	Alert,
	StyleSheet,
} from "react-native";

const candyTypes = ["🤰", "🍼", "🌼", "🧸", "🤱", " 🍬", "🍓"];

const NewGame = ({ navigation }) => {
	const [board, setBoard] = useState([]);
	const [score, setScore] = useState(0);
	const [time, setTime] = useState(80);
	const [gameOver, setGameOver] = useState(false);
	const [selectedCandy, setSelectedCandy] = useState(null);
	const [gameWon, setGameWon] = useState(false);

	const shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	};

	const initializeBoard = () => {
		const shuffledCandies = [
			...candyTypes,
			...candyTypes,
			...candyTypes,
			...candyTypes,
			...candyTypes,
			...candyTypes,
		];
		shuffleArray(shuffledCandies);

		const newBoard = Array(7)
			.fill()
			.map(() => shuffledCandies.splice(0, 7));

		setBoard(newBoard);
	};

	const candiesAreAllMatched = () => {
		// Implement your logic to check if all candies are matched
		return false;
	};

	const areCandiesAdjacent = (r1, c1, r2, c2) => {
		// Check if two candies are adjacent
		return (
			(Math.abs(r1 - r2) === 1 && c1 === c2) ||
			(r1 === r2 && Math.abs(c1 - c2) === 1)
		);
	};

	const removeCandies = (matchedCandies) => {
		const newBoard = [...board];
		matchedCandies.forEach(([row, col]) => {
			newBoard[row][col] = null;
		});
		setBoard(newBoard);

		// Check if all candies are removed
		if (
			newBoard.every((row) => row.every((candy) => candy === null))
		) {
			setGameWon(true);
		} else {
			setGameWon(false);
		}
	};

	const handleCandyPress = (row, col) => {
		if (selectedCandy === null) {
			// No candy is selected; select the pressed candy
			setSelectedCandy({ row, col });
		} else {
			// A candy is already selected; check if it can be swapped with the pressed candy
			const { row: prevRow, col: prevCol } = selectedCandy;

			if (areCandiesAdjacent(row, col, prevRow, prevCol)) {
				// Swap the candies
				const newBoard = [...board];
				[newBoard[row][col], newBoard[prevRow][prevCol]] = [
					newBoard[prevRow][prevCol],
					newBoard[row][col],
				];
				setBoard(newBoard);

				// Check for matches after the swap
				const matchedCandies = findMatches(newBoard);
				if (matchedCandies.length > 0) {
					removeCandies(matchedCandies);
					setScore(score + matchedCandies.length * 5);
				}

				setSelectedCandy(null); // Clear the selected candy
			} else {
				setSelectedCandy({ row, col }); // Select the new candy
			}
		}
	};

	const findMatches = (board) => {
		const matches = [];

		// Check for horizontal matches
		for (let row = 0; row < 7; row++) {
			let currentCandy = null;
			let count = 0;
			for (let col = 0; col < 7; col++) {
				if (board[row][col] === currentCandy) {
					count++;
				} else {
					if (count >= 3) {
						for (let i = col - count; i < col; i++) {
							matches.push([row, i]);
						}
					}
					currentCandy = board[row][col];
					count = 1;
				}
			}
			if (count >= 3) {
				for (let i = 7 - count; i < 7; i++) {
					matches.push([row, i]);
				}
			}
		}

		// Check for vertical matches
		for (let col = 0; col < 7; col++) {
			let currentCandy = null;
			let count = 0;
			for (let row = 0; row < 7; row++) {
				if (board[row][col] === currentCandy) {
					count++;
				} else {
					if (count >= 3) {
						for (let i = row - count; i < row; i++) {
							matches.push([i, col]);
						}
					}
					currentCandy = board[row][col];
					count = 1;
				}
			}
			if (count >= 3) {
				for (let i = 7 - count; i < 7; i++) {
					matches.push([i, col]);
				}
			}
		}

		return matches;
	};

	useEffect(() => {
		initializeBoard();
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			if (time === 0) {
				if (!gameWon) {
					setGameOver(true);
					Alert.alert("Game Over", "You lost the game!", [
						{
							text: "OK",
							onPress: () => {
								// Handle the case when the game is lost
							},
						},
					]);
				}
				clearInterval(timer);
			} else {
				setTime(time - 1);
			}

			// Check if all candies are removed and the game is won
			if (gameWon) {
				setGameOver(true);
				Alert.alert("Game Over", "You won the game!", [
					{
						text: "OK",
						onPress: () => {
							// Navigate to the "NewGame" page
							navigation.navigate("Quiz Options Page");
						},
					},
				]);
				clearInterval(timer);
			}
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, [time, gameWon]);

	// useEffect(() => {
	// 	const timer = setInterval(() => {
	// 		if (time === 0) {
	// 			setGameOver(true);
	// 			clearInterval(timer);
	// 		} else {
	// 			setTime(time - 1);
	// 		}

	// 		// Check if all candies are removed and the game is won
	// 		if (gameWon) {
	// 			setGameOver(true);
	// 			Alert.alert("Game Over", "You won the game!", [
	// 				{
	// 					text: "OK",
	// 					onPress: () => {
	// 						// Navigate to the "NewGame" page
	// 						navigation.navigate("Quiz Options Page");
	// 					},
	// 				},
	// 			]);
	// 			clearInterval(timer);
	// 		}
	// 	}, 1000);

	// 	return () => {
	// 		clearInterval(timer);
	// 	};
	// }, [time, gameWon]);

	return (
		<View style={styles.container}>
			<View style={styles.board}>
				{board.map((row, rowIndex) => (
					<View key={rowIndex} style={styles.row}>
						{row.map((candy, colIndex) => (
							<TouchableOpacity
								key={colIndex}
								style={styles.candy}
								onPress={() =>
									handleCandyPress(rowIndex, colIndex)
								}>
								<Text>{candy || ""}</Text>
							</TouchableOpacity>
						))}
					</View>
				))}
			</View>
			<View style={styles.info}>
				<Text style={styles.text}>Score: {score}</Text>
				<Text style={styles.text}>Time: {time} seconds</Text>
			</View>
			{/* <Modal visible={gameOver} animationType="slide">
				<View style={styles.modal}>
					<Text style={styles.modalText}>Game Over</Text>
					<Text style={styles.modalText}>
						{candiesAreAllMatched() ? "You won!" : "You lost!"}
					</Text>
				</View>
			</Modal> */}
		</View>
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
		flexDirection: "column",
		backgroundColor: "#097969",
        borderColor: "#097969"
	},
	row: {
		flexDirection: "row",
	},
	candy: {
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "black",
	},
	info: {
		marginTop: 20,
        color: 'white',
	},
    text: {
        color: 'white',
    },
	modal: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalText: {
		fontSize: 24,
		fontWeight: "bold",
	},
});

export default NewGame;
