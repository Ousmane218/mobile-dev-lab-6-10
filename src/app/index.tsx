
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

type Player = 'X' | 'O';
type Square = Player | null;

export default function GameScreen() {

  const { isDark } = useAppTheme();

  const colors = {
    background: isDark ? '#121212' : '#F5F5F5',
    surface: isDark ? '#1E1E1E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#171717',
    border: isDark ? '#555555' : '#333333',
    primary: isDark ? '#90CAF9' : '#1976D2',
    x: isDark ? '#90CAF9' : '#1565C0',
    o: isDark ? '#FFAB91' : '#D84315',
  };

  const [history, setHistory] = useState<Square[][]>([
    Array(9).fill(null),
  ]);

  const [currentMove, setCurrentMove] = useState(0);

  const squares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  function handlePress(index: number) {
    if (squares[index] || winner) return;

    const nextSquares = [...squares];
    nextSquares[index] = xIsNext ? 'X' : 'O';

    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      nextSquares,
    ];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move: number) {
    setCurrentMove(move);
  }

  let status: string;

  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  
  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.heading, { color: colors.text }]}>
        Tic-Tac-Toe
      </Text>

      <Text style={[styles.status, { color: colors.text }]}>
        {status}
      </Text>

      <View style={styles.board}>
        {squares.map((square, index) => (
          <Pressable
            key={index}
            style={[
              styles.square,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            onPress={() => handlePress(index)}
          >
            <Text
              style={[
                styles.squareText,
                {
                  color:
                    square === 'X'
                      ? colors.x
                      : square === 'O'
                        ? colors.o
                        : colors.text,
                },
              ]}
            >
              {square}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text
        style={[
          styles.historyTitle,
          { color: colors.text },
        ]}
      >
        Move History
      </Text>

      {history.map((_, move) => {
        const isCurrent = move === currentMove;

        return (
          <Pressable
            key={move}
            style={[
              styles.historyButton,
              {
                backgroundColor: isCurrent
                  ? colors.primary
                  : colors.surface,
                borderColor: isCurrent
                  ? colors.primary
                  : colors.border,
              },
            ]}
            onPress={() => jumpTo(move)}
          >
            <Text
              style={[
                styles.historyText,
                {
                  color: isCurrent
                    ? colors.background
                    : colors.text,
                },
              ]}
            >
              {move === 0
                ? 'Go to game start'
                : `Go to move #${move}`}
              {isCurrent ? ' (Current)' : ''}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );

}

function calculateWinner(squares: Square[]): Player | null {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winningLines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 22,
    marginBottom: 25,
  },
  board: {
    width: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  square: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  historyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,
  },
  historyButton: {
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  historyText: {
    fontSize: 16,
  },
});
