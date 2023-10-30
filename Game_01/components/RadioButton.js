import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const RadioButton = ({ label, selected, onPress, textColor }) => (
	<TouchableOpacity onPress={onPress}>
		<View style={{ flexDirection: "row", alignItems: "center" }}>
			<View
				style={{
					width: 20,
					height: 20,
					borderRadius: 10,
					borderWidth: 2,
					borderColor: selected ? "#0047AB" : "gray",
					marginRight: 10,
					justifyContent: "center",
					alignItems: "center",
				}}>
				{selected && (
					<View
						style={{
							width: 10,
							height: 10,
							borderRadius: 5,
							backgroundColor: "black",
						}}
					/>
				)}
			</View>
			<Text
				style={{
					color: "#0047AB",
					fontSize: 15,
					fontWeight: "bold",
					color: textColor || "#000",
				}}>
				{label}
			</Text>
		</View>
	</TouchableOpacity>
);

export default RadioButton;
