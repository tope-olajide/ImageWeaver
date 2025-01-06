import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface Coin {
  level: number;
  coins: number;
}

interface CoinsEarnedProps {
  tournamentCoins: Coin[];
}

const CoinsEarned: React.FC<CoinsEarnedProps> = ({ tournamentCoins }) => {
  // Remove duplicate entries based on level
  const uniqueCoins = tournamentCoins.reduce((acc, current) => {
    const found = acc.find(coin => coin.level === current.level);
    if (!found) {
      acc.push(current);
    }
    return acc;
  }, [] as Coin[]);

  // Calculate total coins
  const totalCoins = uniqueCoins.reduce((total, coin) => total + coin.coins, 0);

  // Render each row
  const renderItem = ({ item }: { item: Coin }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.level}</Text>
      <Text style={styles.cell}>{item.coins}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coins Earned</Text>
      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Level</Text>
          <Text style={styles.headerCell}>Coins</Text>
        </View>
        <FlatList
          data={uniqueCoins.length ? uniqueCoins : [{ level: 1, coins: 0 }]} // Display default if empty
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.footerRow}>
          <Text style={styles.footerCell}>Total</Text>
          <Text style={styles.footerCell}>{totalCoins}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 0,
    alignItems: 'center',
  },
  title: {
    color: 'rgb(219, 177, 74)',
    fontSize: 20,
    textShadowColor: 'purple',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 15,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    textAlign: 'center',
    textTransform: 'uppercase',
    paddingBottom: 9,
  },
  table: {
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
  footerRow: {
    flexDirection: 'row',
    backgroundColor: 'rgb(77,57,10)',
  },
  footerCell: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    padding: 9,
    textAlign: 'center',
  },
});

export default CoinsEarned;
