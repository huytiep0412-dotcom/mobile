import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, SectionList, Pressable, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, BorderRadius, FontSize, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { notifications as initialNotifs, Notification, generateSmartReminders, weatherData, plants, SmartReminder } from '@/constants/mockData';

type FilterTab = 'all' | 'urgent' | 'smart' | 'system';

const iconForType = (type: string) => {
  switch (type) {
    case 'warning': return { name: 'alert-circle', color: '#E53935', bg: '#FFEBEE' };
    case 'reminder': return { name: 'time', color: '#1E88E5', bg: '#E3F2FD' };
    case 'info': return { name: 'information-circle', color: '#43A047', bg: '#E8F5E9' };
    case 'success': return { name: 'checkmark-circle', color: '#43A047', bg: '#E8F5E9' };
    default: return { name: 'notifications', color: '#666', bg: '#F5F5F5' };
  }
};

const priorityBadge = (priority: string) => {
  switch (priority) {
    case 'urgent': return { label: 'Khẩn cấp', color: '#E53935', bg: '#FFEBEE' };
    case 'high': return { label: 'Cao', color: '#FF8F00', bg: '#FFF3E0' };
    case 'medium': return { label: 'Trung bình', color: '#1E88E5', bg: '#E3F2FD' };
    case 'low': return { label: 'Thấp', color: '#43A047', bg: '#E8F5E9' };
    default: return { label: '', color: '#666', bg: '#F5F5F5' };
  }
};

export default function NotificationsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  const [notifs, setNotifs] = useState(initialNotifs);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [showSmartDetail, setShowSmartDetail] = useState<SmartReminder | null>(null);

  const smartReminders = useMemo(() => generateSmartReminders(weatherData, plants), []);
  const unreadCount = notifs.filter(n => !n.read).length;

  const tabs: { key: FilterTab; label: string; icon: string }[] = [
    { key: 'all', label: 'Tất cả', icon: 'notifications' },
    { key: 'urgent', label: 'Khẩn cấp', icon: 'alert-circle' },
    { key: 'smart', label: 'Thông minh', icon: 'bulb' },
    { key: 'system', label: 'Hệ thống', icon: 'settings' },
  ];

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Group notifications by date
  const groupedNotifs = useMemo(() => {
    let filtered = notifs;
    if (activeTab === 'urgent') filtered = notifs.filter(n => n.type === 'warning');
    else if (activeTab === 'system') filtered = notifs.filter(n => n.type === 'info' || n.type === 'success');

    const groups: Record<string, Notification[]> = {};
    filtered.forEach(n => {
      if (!groups[n.date]) groups[n.date] = [];
      groups[n.date].push(n);
    });
    return Object.entries(groups).map(([date, data]) => ({ title: date, data }));
  }, [notifs, activeTab]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.title, { color: colors.text }]}>🔔 Thông báo</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{unreadCount} chưa đọc</Text>
          </View>
          <Pressable onPress={markAllRead} style={styles.markAllBtn}>
            <Ionicons name="checkmark-done" size={16} color={colors.tint} />
            <Text style={[styles.markAllText, { color: colors.tint }]}>Đã đọc hết</Text>
          </Pressable>
        </View>
      </View>

      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
        {tabs.map(tab => (
          <Pressable
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            style={[
              styles.tabChip,
              {
                backgroundColor: activeTab === tab.key ? colors.tint : colors.backgroundCard,
                borderColor: activeTab === tab.key ? colors.tint : colors.border,
              },
            ]}
          >
            <Ionicons name={tab.icon as any} size={14} color={activeTab === tab.key ? '#fff' : colors.textSecondary} />
            <Text style={[styles.tabChipText, { color: activeTab === tab.key ? '#fff' : colors.textSecondary }]}>
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <SectionList
        sections={activeTab === 'smart' ? [] : groupedNotifs}
        keyExtractor={item => item.id}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          (activeTab === 'all' || activeTab === 'smart') ? (
            <View>
              {/* Smart Reminders Banner */}
              <View style={[styles.smartBanner, { backgroundColor: colors.tint + '10', borderColor: colors.tint + '30' }]}>
                <View style={styles.smartBannerHeader}>
                  <View style={styles.smartBannerTitle}>
                    <Text style={{ fontSize: 18 }}>🤖</Text>
                    <Text style={[styles.smartTitleText, { color: colors.tint }]}>Nhắc nhở thông minh</Text>
                  </View>
                  <View style={[styles.aiBadge, { backgroundColor: colors.tint }]}>
                    <Text style={styles.aiBadgeText}>AI</Text>
                  </View>
                </View>
                <Text style={[styles.smartSubtitle, { color: colors.textSecondary }]}>
                  Dựa trên thời tiết ({weatherData.temp}°C, {weatherData.description}) và tình trạng cây
                </Text>
              </View>

              {/* Smart Reminder Cards */}
              {smartReminders.map(reminder => {
                const badge = priorityBadge(reminder.priority);
                return (
                  <Pressable
                    key={reminder.id}
                    style={[
                      styles.smartCard,
                      {
                        backgroundColor: colors.backgroundCard,
                        borderColor: reminder.color + '30',
                        borderLeftColor: reminder.color,
                      },
                    ]}
                    onPress={() => Alert.alert(reminder.title, `${reminder.message}\n\n📌 ${reminder.reason}`)}
                  >
                    <View style={styles.smartCardHeader}>
                      <Text style={styles.smartIcon}>{reminder.icon}</Text>
                      <View style={styles.smartCardTitleWrap}>
                        <Text style={[styles.smartCardTitle, { color: colors.text }]} numberOfLines={1}>
                          {reminder.title}
                        </Text>
                        <View style={[styles.priorityBadge, { backgroundColor: badge.bg }]}>
                          <Text style={[styles.priorityText, { color: badge.color }]}>{badge.label}</Text>
                        </View>
                      </View>
                    </View>
                    <Text style={[styles.smartCardMsg, { color: colors.textSecondary }]} numberOfLines={2}>
                      {reminder.message}
                    </Text>
                    <View style={styles.smartCardFooter}>
                      <Text style={[styles.smartReason, { color: colors.textLight }]}>
                        📌 {reminder.reason}
                      </Text>
                      <View style={[styles.smartActionBtn, { backgroundColor: reminder.color + '15' }]}>
                        <Text style={[styles.smartActionText, { color: reminder.color }]}>
                          {reminder.actionLabel}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                );
              })}

              {activeTab === 'all' && (
                <Text style={[styles.sectionDivider, { color: colors.text }]}>📋 Thông báo hệ thống</Text>
              )}
            </View>
          ) : undefined
        }
        renderSectionHeader={({ section }) => (
          <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>{section.title}</Text>
        )}
        renderItem={({ item }) => {
          const iconCfg = iconForType(item.type);
          return (
            <View style={[
              styles.notifCard,
              {
                backgroundColor: colors.backgroundCard,
                borderColor: colors.borderLight,
              },
            ]}>
              {!item.read && <View style={[styles.unreadDot, { backgroundColor: colors.tint }]} />}
              <View style={[styles.notifIcon, { backgroundColor: iconCfg.bg }]}>
                <Ionicons name={iconCfg.name as any} size={20} color={iconCfg.color} />
              </View>
              <View style={styles.notifContent}>
                <Text style={[styles.notifTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.notifMessage, { color: colors.textSecondary }]} numberOfLines={2}>
                  {item.message}
                </Text>
                <Text style={[styles.notifTime, { color: colors.textLight }]}>{item.time}</Text>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          activeTab === 'smart' ? null : (
            <View style={styles.empty}>
              <Text style={{ fontSize: 40 }}>📭</Text>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Không có thông báo</Text>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.sm },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: FontSize.xxl, fontWeight: '700' },
  subtitle: { fontSize: FontSize.sm, marginTop: 2 },
  markAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  markAllText: { fontSize: FontSize.sm, fontWeight: '600' },

  // Tabs
  tabScroll: { paddingHorizontal: Spacing.xl, gap: Spacing.sm, marginBottom: Spacing.md },
  tabChip: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 14, paddingVertical: 8, borderRadius: BorderRadius.full, borderWidth: 1 },
  tabChipText: { fontSize: FontSize.sm, fontWeight: '600' },

  listContent: { paddingHorizontal: Spacing.xl, paddingBottom: 30 },

  // Smart Banner
  smartBanner: { borderRadius: BorderRadius.lg, borderWidth: 1, padding: Spacing.lg, marginBottom: Spacing.md },
  smartBannerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.xs },
  smartBannerTitle: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  smartTitleText: { fontSize: FontSize.lg, fontWeight: '700' },
  aiBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: BorderRadius.sm },
  aiBadgeText: { color: '#fff', fontSize: 10, fontWeight: '800' },
  smartSubtitle: { fontSize: FontSize.xs, marginLeft: 30 },

  // Smart Cards
  smartCard: { borderRadius: BorderRadius.lg, borderWidth: 1, borderLeftWidth: 4, padding: Spacing.lg, marginBottom: Spacing.sm },
  smartCardHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.xs },
  smartIcon: { fontSize: 22 },
  smartCardTitleWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  smartCardTitle: { fontSize: FontSize.md, fontWeight: '600', flex: 1 },
  priorityBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: BorderRadius.full },
  priorityText: { fontSize: 10, fontWeight: '700' },
  smartCardMsg: { fontSize: FontSize.sm, lineHeight: 20, marginBottom: Spacing.sm },
  smartCardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  smartReason: { fontSize: FontSize.xs, flex: 1 },
  smartActionBtn: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: BorderRadius.full },
  smartActionText: { fontSize: FontSize.xs, fontWeight: '600' },

  sectionDivider: { fontSize: FontSize.lg, fontWeight: '700', marginTop: Spacing.xl, marginBottom: Spacing.md },
  sectionHeader: { fontSize: FontSize.sm, fontWeight: '600', marginTop: Spacing.md, marginBottom: Spacing.sm },

  // Notification Cards
  notifCard: { flexDirection: 'row', alignItems: 'flex-start', borderRadius: BorderRadius.lg, borderWidth: 1, padding: Spacing.md, marginBottom: Spacing.sm, gap: Spacing.md, position: 'relative' },
  unreadDot: { position: 'absolute', top: 8, left: 8, width: 8, height: 8, borderRadius: 4 },
  notifIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  notifContent: { flex: 1 },
  notifTitle: { fontSize: FontSize.md, fontWeight: '600', marginBottom: 3 },
  notifMessage: { fontSize: FontSize.sm, lineHeight: 20, marginBottom: 4 },
  notifTime: { fontSize: FontSize.xs },

  empty: { alignItems: 'center', paddingTop: 60, gap: Spacing.md },
  emptyText: { fontSize: FontSize.md },
});
