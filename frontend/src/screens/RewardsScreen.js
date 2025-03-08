import React, { useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import apiService from "../api/apiService";

const rewards = [
  { id: "1", name: "Amazon Gift Card - ₹100", points: 500 },
  { id: "2", name: "Uber Voucher - ₹50", points: 300 },
];

const RewardsScreen = () => {
  const [userPoints, setUserPoints] = useState(1000);

  const redeemReward = async (reward) => {
    if (userPoints >= reward.points) {
      await apiService.redeemPoints(reward.points);
      setUserPoints(userPoints - reward.points);
      alert(`Redeemed: ${reward.name}`);
    } else {
      alert("Not enough points!");
    }
  };

  return (
    <View>
      <Text>Your Points: {userPoints}</Text>
      <FlatList
        data={rewards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - {item.points} Points</Text>
            <Button title="Redeem" onPress={() => redeemReward(item)} />
          </View>
        )}
      />
    </View>
  );
};

export default RewardsScreen;
