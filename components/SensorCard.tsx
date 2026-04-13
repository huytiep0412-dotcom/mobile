import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, FontSize, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SensorData } from '@/constants/mockData';

interface SensorCardProps {
  sensor: SensorData;
}

export function SensorCard({ sensor }: SensorCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const percentage = ((sensor.value - sensor.min) / (sensor.max - sensor.min)) * 100;
  const isWarning = sensor.value < sensor.warningLow || sensor.value > sensor.warningHigh;
  const statusColor = isWarning ? colors.warning : sensor.color;

  // Calculate the stroke for circular progress
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={[styles.card, { backgroundColor: colors.backgroundCard, borderColor: colors.borderLight }]}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: sensor.color + '18' }]}>
          <Ionicons name={sensor.icon as any} size={20} color={sensor.color} />
        </View>
        {isWarning && (
          <View style={[styles.warningBadge, { backgroundColor: colors.warning + '20' }]}>
            <Ionicons name="alert" size={10} color={colors.warning} />
          </View>
        )}
      </View>

      <View style={styles.valueContainer}>
        <Text style={[styles.value, { color: colors.text }]}>
          {sensor.value}
        </Text>
        <Text style={[styles.unit, { color: colors.textLight }]}>
          {sensor.unit}
        </Text>
      </View>

      <Text style={[styles.label, { color: colors.textSecondary }]}>
        {sensor.label}
      </Text>

      {/* Progress bar */}
      <View style={[styles.progressTrack, { backgroundColor: colors.borderLight }]}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${Math.min(percentage, 100)}%`,
              backgroundColor: statusColor,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    minWidth: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  value: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
  },
  unit: {
    fontSize: FontSize.sm,
    fontWeight: '500',
    marginLeft: 3,
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: '500',
    marginBottom: Spacing.sm,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});
