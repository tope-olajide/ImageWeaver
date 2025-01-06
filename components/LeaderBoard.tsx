import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Player } from '../types';





interface LeaderboardProps {
  players?: Player[];
}

const LeaderBoard: React.FC<LeaderboardProps> = ({ players }) => {
  // Sort players by score in descending order
  const sortedPlayers = players?.sort((a, b) => b.level! - a.level!);
console.log({players})
  const renderItem = ({ item, index }: { item: Player; index: number }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.level}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Rank</Text>
        <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCell}>Level</Text>
      </View>
      <FlatList
        data={sortedPlayers}
        renderItem={renderItem}
        keyExtractor={item => item.userId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: 'rgb(77,57,10)',
  },
  headerCell: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    padding: 9,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'rgb(192,146,35)',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  cell: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    padding: 4,
    textAlign: 'center',
  },
});

export default LeaderBoard;
