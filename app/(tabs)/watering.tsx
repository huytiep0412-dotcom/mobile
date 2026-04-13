import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Pressable,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, BorderRadius, FontSize, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import {
  wateringSchedules as initialSchedules,
  wateringHistory,
  WateringSchedule,
} from '@/constants/mockData';

export default function WateringScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  const [schedules, setSchedules] = useState<WateringSchedule[]>(initialSchedules);
  const [showHistory, setShowHistory] = useState(false);

  const toggleSchedule = (id: string) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const enabledCount = schedules.filter((s) => s.enabled).length;
  const todayHistory = wateringHistory.filter((h) => h.date === 'Hôm nay');
  const totalWaterToday = todayHistory.reduce(
    (acc, h) => acc + parseInt(h.amount),
    0
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
        <Text style={[styles.title, { color: colors.text }]}>💧 Tưới tiêu</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Quản lý lịch tưới tự động
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View
            style={[
              styles.summaryCard,
              { backgroundColor: '#E3F2FD', borderColor: '#BBDEFB' },
            ]}
          >
            <Ionicons name="time-outline" size={24} color="#1565C0" />
            <Text style={[styles.summaryValue, { color: '#1565C0' }]}>
              06:00
            </Text>
            <Text style={[styles.summaryLabel, { color: '#42A5F5' }]}>
              Lần tưới tiếp
            </Text>
          </View>
          <View
            style={[
              styles.summaryCard,
              { backgroundColor: '#E8F5E9', borderColor: '#C8E6C9' },
            ]}
          >
            <Ionicons name="water-outline" size={24} color="#2E7D32" />
            <Text style={[styles.summaryValue, { color: '#2E7D32' }]}>
              {totalWaterToday}ml
            </Text>
            <Text style={[styles.summaryLabel, { color: '#66BB6A' }]}>
              Nước hôm nay
            </Text>
          </View>
          <View
            style={[
              styles.summaryCard,
              { backgroundColor: '#FFF3E0', borderColor: '#FFE0B2' },
            ]}
          >
            <Ionicons name="calendar-outline" size={24} color="#E65100" />
            <Text style={[styles.summaryValue, { color: '#E65100' }]}>
              {enabledCount}
            </Text>
            <Text style={[styles.summaryLabel, { color: '#FF9800' }]}>
              Lịch hoạt động
            </Text>
          </View>
        </View>

        {/* Tab Switch */}
        <View style={styles.tabRow}>
          <Pressable
            style={[
              styles.tab,
              !showHistory && { backgroundColor: colors.tint },
            ]}
            onPress={() => setShowHistory(false)}
          >
            <Text style={[styles.tabText, { color: !showHistory ? '#fff' : colors.textSecondary }]}>
              Lịch tưới
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.tab,
              showHistory && { backgroundColor: colors.tint },
            ]}
            onPress={() => setShowHistory(true)}
          >
            <Text style={[styles.tabText, { color: showHistory ? '#fff' : colors.textSecondary }]}>
              Lịch sử
            </Text>
          </Pressable>
        </View>

        {!showHistory ? (
          /* Schedules */
          <View style={styles.listSection}>
            {schedules.map((schedule) => (
              <View
                key={schedule.id}
                style={[
                  styles.scheduleCard,
                  {
                    backgroundColor: colors.backgroundCard,
                    borderColor: schedule.enabled ? colors.tint + '30' : colors.borderLight,
                  },
                ]}
              >
                <View style={styles.scheduleLeft}>
                  <Text style={styles.scheduleEmoji}>{schedule.plantEmoji}</Text>
                  <View style={styles.scheduleInfo}>
                    <Text style={[styles.scheduleName, { color: colors.text }]}>
                      {schedule.plantName}
                    </Text>
                    <View style={styles.scheduleMetaRow}>
                      <View style={styles.scheduleMeta}>
                        <Ionicons name="time-outline" size={12} color={colors.textLight} />
                        <Text style={[styles.scheduleMetaText, { color: colors.textLight }]}>
                          {schedule.time}
                        </Text>
                      </View>
                      <Text style={[styles.scheduleMetaDot, { color: colors.textLight }]}>•</Text>
                      <View style={styles.scheduleMeta}>
                        <Ionicons name="repeat-outline" size={12} color={colors.textLight} />
                        <Text style={[styles.scheduleMetaText, { color: colors.textLight }]}>
                          {schedule.frequency}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.scheduleMetaRow}>
                      <View style={styles.scheduleMeta}>
                        <Ionicons name="hourglass-outline" size={12} color={colors.textLight} />
                        <Text style={[styles.scheduleMetaText, { color: colors.textLight }]}>
                          {schedule.duration}
                        </Text>
                      </View>
                      <Text style={[styles.scheduleMetaDot, { color: colors.textLight }]}>•</Text>
                      <Text style={[styles.scheduleMetaText, { color: colors.textLight }]}>
                        {schedule.lastRun}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.scheduleRight}>
                  <Switch
                    value={schedule.enabled}
                    onValueChange={() => toggleSchedule(schedule.id)}
                    trackColor={{ false: colors.borderLight, true: colors.tint + '60' }}
                    thumbColor={schedule.enabled ? colors.tint : '#ccc'}
                  />
                  <Pressable
                    style={[styles.waterBtn, { backgroundColor: colors.secondary + '15' }]}
                    onPress={() => Alert.alert('✅ Thành công', `Đã tưới ${schedule.plantName}`)}
                  >
                    <Ionicons name="water" size={14} color={colors.secondary} />
                    <Text style={[styles.waterBtnText, { color: colors.secondary }]}>
                      Tưới ngay
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        ) : (
          /* History */
          <View style={styles.listSection}>
            {['Hôm nay', 'Hôm qua', '2 ngày trước', '3 ngày trước'].map((dateGroup) => {
              const items = wateringHistory.filter((h) => h.date === dateGroup);
              if (items.length === 0) return null;
              return (
                <View key={dateGroup}>
                  <Text style={[styles.dateHeader, { color: colors.textSecondary }]}>
                    {dateGroup}
                  </Text>
                  {items.map((item) => (
                    <View
                      key={item.id}
                      style={[
                        styles.historyCard,
                        {
                          backgroundColor: colors.backgroundCard,
                          borderColor: colors.borderLight,
                        },
                      ]}
                    >
                      <View style={[
                        styles.historyDot,
                        { backgroundColor: item.method === 'auto' ? colors.tint : colors.secondary },
                      ]} />
                      <Text style={styles.historyEmoji}>{item.plantEmoji}</Text>
                      <View style={styles.historyInfo}>
                        <Text style={[styles.historyName, { color: colors.text }]}>
                          {item.plantName}
                        </Text>
                        <View style={styles.historyMetaRow}>
                          <Text style={[styles.historyMeta, { color: colors.textLight }]}>
                            {item.time}
                          </Text>
                          <Text style={[styles.historyMeta, { color: colors.textLight }]}>•</Text>
                          <Text style={[styles.historyMeta, { color: colors.textLight }]}>
                            {item.amount}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={[
                          styles.methodBadge,
                          {
                            backgroundColor:
                              item.method === 'auto' ? colors.tint + '15' : colors.secondary + '15',
                          },
                        ]}
                      >
                        <Ionicons
                          name={item.method === 'auto' ? 'sync' : 'hand-left'}
                          size={10}
                          color={item.method === 'auto' ? colors.tint : colors.secondary}
                        />
                        <Text
                          style={[
                            styles.methodText,
                            {
                              color: item.method === 'auto' ? colors.tint : colors.secondary,
                            },
                          ]}
                        >
                          {item.method === 'auto' ? 'Tự động' : 'Thủ công'}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              );
            })}
          </View>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: FontSize.sm,
    marginTop: 2,
  },
  scrollContent: {
    padding: Spacing.xl,
  },

  // Summary
  summaryRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  summaryValue: {
    fontSize: FontSize.xl,
    fontWeight: '700',
  },
  summaryLabel: {
    fontSize: FontSize.xs,
    textAlign: 'center',
  },

  // Tabs
  tabRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: BorderRadius.md,
    padding: 3,
    marginBottom: Spacing.xl,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
  },
  tabText: {
    fontSize: FontSize.md,
    fontWeight: '600',
  },

  // Schedule cards
  listSection: {},
  scheduleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  scheduleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  scheduleEmoji: {
    fontSize: 28,
    marginRight: Spacing.md,
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleName: {
    fontSize: FontSize.md,
    fontWeight: '600',
    marginBottom: 3,
  },
  scheduleMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  scheduleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  scheduleMetaText: {
    fontSize: FontSize.xs,
  },
  scheduleMetaDot: {
    fontSize: 8,
  },
  scheduleRight: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  waterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
  },
  waterBtnText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },

  // History
  dateHeader: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  historyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.sm,
  },
  historyEmoji: {
    fontSize: 22,
    marginRight: Spacing.sm,
  },
  historyInfo: {
    flex: 1,
  },
  historyName: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  historyMetaRow: {
    flexDirection: 'row',
    gap: 6,
  },
  historyMeta: {
    fontSize: FontSize.xs,
  },
  methodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  methodText: {
    fontSize: 10,
    fontWeight: '600',
  },
});
