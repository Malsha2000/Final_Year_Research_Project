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

const CandyCrushGameLevel04 = ({ navigation }) => {
	const [board, setBoard] = useState(createBoard());
	const [score, setScore] = useState(0);
	const [timeLeft, setTimeLeft] = useState(InitialTime);
	const [selectedCandy, setSelectedCandy] = useState(null);
	const [hammerPowerUp, setHammerPowerUp] = useState(3); // initial 3 hammers
	const [shufflePowerUp, setShufflePowerUp] = useState(2); // initial 2 shuffles

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
		setScore(0);
		setTimeLeft(InitialTime);
		setSelectedCandy(null);
		setHammerPowerUp(3); // reset hammers
		setShufflePowerUp(2); // reset shuffles
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

	const handleHammer = (row, col) => {
		if (hammerPowerUp > 0 && board[row][col] !== "🚫") {
			const newBoard = JSON.parse(JSON.stringify(board));
			newBoard[row][col] = null;
			setBoard(newBoard);
			setHammerPowerUp(hammerPowerUp - 1);
			checkForMatch(newBoard);
		}
	};

	const handleShuffle = () => {
		if (shufflePowerUp > 0) {
			const newBoard = createBoard();
			setBoard(newBoard);
			setShufflePowerUp(shufflePowerUp - 1);
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

		if (toClear.length > 0) {
			const newBoard = JSON.parse(JSON.stringify(board));
			toClear.forEach(([row, col]) => {
				newBoard[row][col] = null;
			});
			const newScore = score + toClear.length * 10;
			setScore(newScore);
			fillBoard(newBoard);
			return true;
		}
		return false;
	}

	function fillBoard(board) {
		for (let col = 0; col < BoardSize; col++) {
			let emptySpaces = 0;
			for (let row = BoardSize - 1; row >= 0; row--) {
				if (!board[row][col]) {
					emptySpaces++;
				} else if (emptySpaces > 0) {
					board[row + emptySpaces][col] = board[row][col];
					board[row][col] = null;
				}
			}
			for (let row = 0; row < emptySpaces; row++) {
				board[row][col] =
					CandyTypes[
						Math.floor(Math.random() * CandyTypes.length)
					];
			}
		}
		setBoard(board);
	}

	const CandyButton = ({ row, col }) => (
		<TouchableOpacity
			style={styles.candyButton}
			onPress={() => handlePress(row, col)}
			onLongPress={() => handleHammer(row, col)}>
			<Text style={styles.candyEmoji}>{board[row][col]}</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("../assets/gameBackground.jpg")}
				style={styles.background}>
				<View style={styles.header}>
					<Text style={styles.headerText}>Score: {score}</Text>
					<Text style={styles.headerText}>
						Time Left: {timeLeft}s
					</Text>
				</View>
				<View style={styles.board}>
					{board.map((row, rowIndex) => (
						<View key={rowIndex} style={styles.row}>
							{row.map((candy, colIndex) => (
								<CandyButton
									key={colIndex}
									row={rowIndex}
									col={colIndex}
								/>
							))}
						</View>
					))}
				</View>
				<View style={styles.footer}>
					<Button title="Shuffle" onPress={handleShuffle} />
					<Text style={styles.footerText}>
						Hammer: {hammerPowerUp} | Shuffle: {shufflePowerUp}
					</Text>
					<Button title="Reset" onPress={resetGame} />
				</View>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	background: {
		flex: 1,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
	},
	headerText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#fff",
	},
	board: {
		flex: 1,
		padding: 16,
		justifyContent: "center",
		alignItems: "center",
	},
	row: {
		flexDirection: "row",
	},
	candyButton: {
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		margin: 2,
	},
	candyEmoji: {
		fontSize: 30,
	},
	footer: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
	},
	footerText: {
		fontSize: 18,
		color: "#fff",
	},
});

export default CandyCrushGameLevel04;
