import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, FontSize, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Notification } from '@/constants/mockData';

interface NotificationItemProps {
  notification: Notification;
  onPress?: () => void;
}

const typeConfig = {
  warning: { bgColor: '#FFF3E0', iconColor: '#E65100', dotColor: '#FF9800' },
  reminder: { bgColor: '#E3F2FD', iconColor: '#1565C0', dotColor: '#2196F3' },
  info: { bgColor: '#E8F5E9', iconColor: '#2E7D32', dotColor: '#4CAF50' },
  success: { bgColor: '#E8F5E9', iconColor: '#2E7D32', dotColor: '#4CAF50' },
};

export function NotificationItem({ notification, onPress }: NotificationItemProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const config = typeConfig[notification.type] || typeConfig.info;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: notification.read
            ? colors.backgroundCard
            : colorScheme === 'dark' ? '#1A2E1C' : '#F0F8E8',
          borderColor: colors.borderLight,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      {/* Unread dot */}
      {!notification.read && (
        <View style={[styles.unreadDot, { backgroundColor: config.dotColor }]} />
      )}

      {/* Icon */}
      <View style={[styles.iconContainer, { backgroundColor: config.bgColor }]}>
        <Ionicons name={notification.icon as any} size={20} color={config.iconColor} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
              fontWeight: notification.read ? '500' : '700',
            },
          ]}
          numberOfLines={1}
        >
          {notification.title}
        </Text>
        <Text
          style={[styles.message, { color: colors.textSecondary }]}
          numberOfLines={2}
        >
          {notification.message}
        </Text>
        <Text style={[styles.time, { color: colors.textLight }]}>
          {notification.time}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    marginBottom: Spacing.sm,
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: Spacing.lg + 2,
    left: Spacing.sm,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.md,
    marginBottom: 3,
  },
  message: {
    fontSize: FontSize.sm,
    lineHeight: 18,
    marginBottom: 4,
  },
  time: {
    fontSize: FontSize.xs,
  },
});
