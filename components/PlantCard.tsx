import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, FontSize, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Plant } from '@/constants/mockData';

interface PlantCardProps {
  plant: Plant;
  onPress?: () => void;
}

export function PlantCard({ plant, onPress }: PlantCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const healthColor =
    plant.health >= 80 ? colors.success :
    plant.health >= 50 ? colors.warning :
    colors.danger;

  const healthLabel =
    plant.health >= 80 ? 'Khỏe mạnh' :
    plant.health >= 50 ? 'Cần chú ý' :
    'Nguy hiểm';

  const needsWater = plant.health < 50;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.backgroundCard,
          borderColor: needsWater ? colors.danger + '40' : colors.borderLight,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
      ]}
    >
      {/* Left: Emoji */}
      <View style={[styles.emojiContainer, { backgroundColor: colors.backgroundInput }]}>
        <Text style={styles.emoji}>{plant.emoji}</Text>
      </View>

      {/* Middle: Info */}
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
          {plant.name}
        </Text>
        <View style={styles.metaRow}>
          <Ionicons
            name={plant.location === 'indoor' ? 'home-outline' : 'sunny-outline'}
            size={12}
            color={colors.textLight}
          />
          <Text style={[styles.meta, { color: colors.textLight }]}>
            {plant.location === 'indoor' ? 'Trong nhà' : 'Ngoài trời'}
          </Text>
          <Text style={[styles.metaDot, { color: colors.textLight }]}>•</Text>
          <Ionicons name="water-outline" size={12} color={colors.textLight} />
          <Text style={[styles.meta, { color: colors.textLight }]}>
            {plant.lastWatered}
          </Text>
        </View>

        {/* Health bar */}
        <View style={styles.healthRow}>
          <View style={[styles.healthTrack, { backgroundColor: colors.borderLight }]}>
            <View
              style={[
                styles.healthFill,
                { width: `${plant.health}%`, backgroundColor: healthColor },
              ]}
            />
          </View>
          <Text style={[styles.healthText, { color: healthColor }]}>
            {plant.health}%
          </Text>
        </View>
      </View>

      {/* Right: Status */}
      <View style={styles.statusContainer}>
        {needsWater && (
          <View style={[styles.alertBadge, { backgroundColor: colors.danger + '15' }]}>
            <Ionicons name="water" size={14} color={colors.danger} />
          </View>
        )}
        <Ionicons name="chevron-forward" size={16} color={colors.textLight} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  emojiContainer: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  emoji: {
    fontSize: 26,
  },
  info: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  name: {
    fontSize: FontSize.md,
    fontWeight: '600',
    marginBottom: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: Spacing.sm,
  },
  meta: {
    fontSize: FontSize.xs,
  },
  metaDot: {
    fontSize: FontSize.xs,
    marginHorizontal: 2,
  },
  healthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  healthTrack: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    overflow: 'hidden',
  },
  healthFill: {
    height: '100%',
    borderRadius: 3,
  },
  healthText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    width: 32,
    textAlign: 'right',
  },
  statusContainer: {
    alignItems: 'center',
    gap: 6,
  },
  alertBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
