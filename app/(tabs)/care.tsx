import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, BorderRadius, FontSize, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { careTasks as initialTasks, careTypeConfig, CareTask } from '@/constants/mockData';

const WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

function getWeekDates(baseDate: Date) {
  const start = new Date(baseDate);
  start.setDate(start.getDate() - start.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

const fmtDate = (d: Date) => d.toISOString().split('T')[0];

export default function CareScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  const [tasks, setTasks] = useState<CareTask[]>(initialTasks);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'week' | 'today' | 'upcoming'>('week');

  const weekDates = useMemo(() => getWeekDates(selectedDate), [selectedDate]);
  const todayStr = fmtDate(new Date());
  const selectedStr = fmtDate(selectedDate);

  const tasksForDate = tasks.filter(t => t.date === selectedStr);
  const todayTasks = tasks.filter(t => t.date === todayStr);
  const upcomingTasks = tasks.filter(t => t.date > todayStr).sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  const doneToday = todayTasks.filter(t => t.done).length;

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const getTaskCountForDate = (dateStr: string) => tasks.filter(t => t.date === dateStr).length;

  const renderTaskCard = (task: CareTask) => {
    const cfg = careTypeConfig[task.type];
    return (
      <Pressable
        key={task.id}
        onPress={() => toggleTask(task.id)}
        style={({ pressed }) => [
          styles.taskCard,
          {
            backgroundColor: colors.backgroundCard,
            borderColor: task.done ? colors.borderLight : cfg.color + '30',
            opacity: pressed ? 0.85 : task.done ? 0.65 : 1,
          },
        ]}
      >
        <Pressable
          onPress={() => toggleTask(task.id)}
          style={[
            styles.checkbox,
            {
              backgroundColor: task.done ? cfg.color : 'transparent',
              borderColor: task.done ? cfg.color : colors.border,
            },
          ]}
        >
          {task.done && <Ionicons name="checkmark" size={14} color="#fff" />}
        </Pressable>
        <Text style={styles.taskEmoji}>{task.plantEmoji}</Text>
        <View style={styles.taskInfo}>
          <Text style={[
            styles.taskName,
            { color: colors.text, textDecorationLine: task.done ? 'line-through' : 'none' },
          ]} numberOfLines={1}>
            {task.plantName}
          </Text>
          <View style={styles.taskMeta}>
            <View style={[styles.taskTypeBadge, { backgroundColor: cfg.color + '15' }]}>
              <Text style={styles.taskTypeEmoji}>{cfg.emoji}</Text>
              <Text style={[styles.taskTypeText, { color: cfg.color }]}>{cfg.label}</Text>
            </View>
            {task.notes ? (
              <Text style={[styles.taskNote, { color: colors.textLight }]} numberOfLines={1}>
                {task.notes}
              </Text>
            ) : null}
          </View>
        </View>
        <Text style={[styles.taskTime, { color: colors.textLight }]}>{task.time}</Text>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
        <Text style={[styles.title, { color: colors.text }]}>📅 Chăm sóc</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Lịch chăm sóc cây trồng
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: '#E8F5E9' }]}>
          <Text style={[styles.statValue, { color: '#2E7D32' }]}>{doneToday}/{todayTasks.length}</Text>
          <Text style={[styles.statLabel, { color: '#66BB6A' }]}>Hoàn thành</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#E3F2FD' }]}>
          <Text style={[styles.statValue, { color: '#1565C0' }]}>{todayTasks.filter(t => !t.done).length}</Text>
          <Text style={[styles.statLabel, { color: '#42A5F5' }]}>Còn lại</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#FFF3E0' }]}>
          <Text style={[styles.statValue, { color: '#E65100' }]}>{upcomingTasks.length}</Text>
          <Text style={[styles.statLabel, { color: '#FF9800' }]}>Sắp tới</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsWrap}>
        <View style={[styles.tabRow, { backgroundColor: colors.backgroundInput }]}>
          {(['week', 'today', 'upcoming'] as const).map(tab => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && { backgroundColor: colors.tint }]}
            >
              <Text style={[styles.tabText, { color: activeTab === tab ? '#fff' : colors.textSecondary }]}>
                {tab === 'week' ? 'Lịch tuần' : tab === 'today' ? 'Hôm nay' : 'Sắp tới'}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'week' && (
          <>
            {/* Week Calendar */}
            <View style={[styles.weekCalendar, { backgroundColor: colors.backgroundCard, borderColor: colors.borderLight }]}>
              {weekDates.map((date, i) => {
                const dateStr = fmtDate(date);
                const isToday = dateStr === todayStr;
                const isSelected = dateStr === selectedStr;
                const taskCount = getTaskCountForDate(dateStr);
                return (
                  <Pressable
                    key={i}
                    onPress={() => setSelectedDate(date)}
                    style={[
                      styles.dayCell,
                      isSelected && { backgroundColor: colors.tint },
                      isToday && !isSelected && { backgroundColor: colors.tint + '15' },
                    ]}
                  >
                    <Text style={[
                      styles.dayLabel,
                      { color: isSelected ? '#fff' : colors.textLight },
                    ]}>{WEEKDAYS[i]}</Text>
                    <Text style={[
                      styles.dayNumber,
                      { color: isSelected ? '#fff' : colors.text },
                      isToday && !isSelected && { color: colors.tint },
                    ]}>{date.getDate()}</Text>
                    {taskCount > 0 && (
                      <View style={styles.dayDots}>
                        {Array.from({ length: Math.min(taskCount, 3) }).map((_, j) => (
                          <View key={j} style={[
                            styles.dayDot,
                            { backgroundColor: isSelected ? '#fff' : colors.tint },
                          ]} />
                        ))}
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>

            {/* Tasks for selected date */}
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {selectedStr === todayStr ? '📋 Hôm nay' : `📋 ${selectedDate.getDate()}/${selectedDate.getMonth() + 1}`}
              {' '}({tasksForDate.length} việc)
            </Text>
            {tasksForDate.length > 0 ? (
              tasksForDate.sort((a, b) => a.time.localeCompare(b.time)).map(renderTaskCard)
            ) : (
              <View style={[styles.emptyCard, { backgroundColor: colors.backgroundCard, borderColor: colors.borderLight }]}>
                <Text style={{ fontSize: 36 }}>🎉</Text>
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Không có việc nào!</Text>
              </View>
            )}
          </>
        )}

        {activeTab === 'today' && (
          <>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>📋 Công việc hôm nay ({todayTasks.length})</Text>
            {/* Progress */}
            <View style={[styles.progressCard, { backgroundColor: colors.backgroundCard, borderColor: colors.borderLight }]}>
              <View style={styles.progressHeader}>
                <Text style={[styles.progressLabel, { color: colors.text }]}>Tiến độ</Text>
                <Text style={[styles.progressPercent, { color: colors.tint }]}>
                  {todayTasks.length > 0 ? Math.round((doneToday / todayTasks.length) * 100) : 0}%
                </Text>
              </View>
              <View style={[styles.progressTrack, { backgroundColor: colors.borderLight }]}>
                <View style={[
                  styles.progressFill,
                  {
                    width: `${todayTasks.length > 0 ? (doneToday / todayTasks.length) * 100 : 0}%`,
                    backgroundColor: colors.tint,
                  },
                ]} />
              </View>
            </View>
            {todayTasks.sort((a, b) => a.time.localeCompare(b.time)).map(renderTaskCard)}
          </>
        )}

        {activeTab === 'upcoming' && (
          <>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>🔮 Sắp tới ({upcomingTasks.length} việc)</Text>
            {(() => {
              const groups: Record<string, CareTask[]> = {};
              upcomingTasks.forEach(t => {
                if (!groups[t.date]) groups[t.date] = [];
                groups[t.date].push(t);
              });
              return Object.entries(groups).map(([date, dateTasks]) => {
                const d = new Date(date);
                const diff = Math.ceil((d.getTime() - new Date(todayStr).getTime()) / 86400000);
                const label = diff === 1 ? 'Ngày mai' : `${diff} ngày nữa (${d.getDate()}/${d.getMonth() + 1})`;
                return (
                  <View key={date}>
                    <Text style={[styles.dateGroupLabel, { color: colors.textSecondary }]}>{label}</Text>
                    {dateTasks.map(renderTaskCard)}
                  </View>
                );
              });
            })()}
          </>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.sm },
  title: { fontSize: FontSize.xxl, fontWeight: '700' },
  subtitle: { fontSize: FontSize.sm, marginTop: 2 },

  statsRow: { flexDirection: 'row', gap: Spacing.md, paddingHorizontal: Spacing.xl, marginBottom: Spacing.md },
  statCard: { flex: 1, alignItems: 'center', padding: Spacing.md, borderRadius: BorderRadius.md, gap: 2 },
  statValue: { fontSize: FontSize.xl, fontWeight: '700' },
  statLabel: { fontSize: FontSize.xs },

  tabsWrap: { paddingHorizontal: Spacing.xl, marginBottom: Spacing.md },
  tabRow: { flexDirection: 'row', borderRadius: BorderRadius.md, padding: 3 },
  tab: { flex: 1, paddingVertical: 9, borderRadius: BorderRadius.sm, alignItems: 'center' },
  tabText: { fontSize: FontSize.sm, fontWeight: '600' },

  scrollContent: { paddingHorizontal: Spacing.xl },

  // Calendar
  weekCalendar: { flexDirection: 'row', borderRadius: BorderRadius.lg, borderWidth: 1, padding: Spacing.sm, marginBottom: Spacing.lg },
  dayCell: { flex: 1, alignItems: 'center', paddingVertical: Spacing.sm, borderRadius: BorderRadius.md, gap: 4 },
  dayLabel: { fontSize: 10, fontWeight: '600' },
  dayNumber: { fontSize: FontSize.lg, fontWeight: '700' },
  dayDots: { flexDirection: 'row', gap: 3, height: 6 },
  dayDot: { width: 5, height: 5, borderRadius: 3 },

  sectionTitle: { fontSize: FontSize.lg, fontWeight: '700', marginBottom: Spacing.md, marginTop: Spacing.sm },

  // Task card
  taskCard: { flexDirection: 'row', alignItems: 'center', borderRadius: BorderRadius.lg, padding: Spacing.md, borderWidth: 1, marginBottom: Spacing.sm, gap: Spacing.sm },
  checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  taskEmoji: { fontSize: 24 },
  taskInfo: { flex: 1 },
  taskName: { fontSize: FontSize.md, fontWeight: '600', marginBottom: 3 },
  taskMeta: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, flexWrap: 'wrap' },
  taskTypeBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 8, paddingVertical: 2, borderRadius: BorderRadius.full },
  taskTypeEmoji: { fontSize: 11 },
  taskTypeText: { fontSize: 10, fontWeight: '600' },
  taskNote: { fontSize: FontSize.xs, flexShrink: 1 },
  taskTime: { fontSize: FontSize.sm, fontWeight: '600' },

  // Progress
  progressCard: { borderRadius: BorderRadius.lg, borderWidth: 1, padding: Spacing.lg, marginBottom: Spacing.md },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm },
  progressLabel: { fontSize: FontSize.sm, fontWeight: '600' },
  progressPercent: { fontSize: FontSize.sm, fontWeight: '700' },
  progressTrack: { height: 8, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },

  // Empty
  emptyCard: { alignItems: 'center', padding: Spacing.xxxl, borderRadius: BorderRadius.lg, borderWidth: 1, gap: Spacing.sm },
  emptyText: { fontSize: FontSize.md },

  // Date group
  dateGroupLabel: { fontSize: FontSize.sm, fontWeight: '600', marginTop: Spacing.md, marginBottom: Spacing.sm },
});
