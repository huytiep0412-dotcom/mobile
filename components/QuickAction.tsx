import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, FontSize, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface QuickActionProps {
  icon: string;
  label: string;
  color: string;
  initialActive?: boolean;
  onToggle?: (active: boolean) => void;
}

export function QuickAction({ icon, label, color, initialActive = false, onToggle }: QuickActionProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [active, setActive] = useState(initialActive);

  const handlePress = () => {
    const newState = !active;
    setActive(newState);
    onToggle?.(newState);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: active ? color : colors.backgroundCard,
          borderColor: active ? color : colors.borderLight,
          transform: [{ scale: pressed ? 0.93 : 1 }],
        },
      ]}
    >
      <View
        style={[
          styles.iconWrap,
          {
            backgroundColor: active ? 'rgba(255,255,255,0.25)' : color + '15',
          },
        ]}
      >
        <Ionicons name={icon as any} size={22} color={active ? '#fff' : color} />
      </View>
      <Text
        style={[
          styles.label,
          { color: active ? '#fff' : colors.textSecondary },
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
      <View
        style={[
          styles.statusDot,
          { backgroundColor: active ? '#fff' : colors.borderLight },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    textAlign: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
