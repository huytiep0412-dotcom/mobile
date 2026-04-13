import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, BorderRadius, FontSize, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { sensorData, plants, weatherData, userProfile } from '@/constants/mockData';
import { SensorCard } from '@/components/SensorCard';
import { QuickAction } from '@/components/QuickAction';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const needAttention = plants.filter((p) => p.health < 60);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + Spacing.sm,
            backgroundColor: colors.tint,
          },
        ]}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerGreeting}>Xin chào 👋</Text>
            <Text style={styles.headerName}>{userProfile.name}</Text>
          </View>
          <View style={styles.headerRight}>
            <Pressable style={styles.headerBtn} onPress={() => router.push('/(tabs)/settings')}>
              <Ionicons name="settings-outline" size={22} color="#fff" />
            </Pressable>
            <Pressable style={styles.headerBtn} onPress={() => router.push('/(tabs)/notifications')}>
              <Ionicons name="notifications-outline" size={22} color="#fff" />
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeText}>2</Text>
              </View>
            </Pressable>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{userProfile.avatar}</Text>
            </View>
          </View>
        </View>

        {/* Weather Card */}
        <View style={styles.weatherCard}>
          <View style={styles.weatherLeft}>
            <Ionicons name={weatherData.icon as any} size={36} color="#FFB74D" />
            <View style={styles.weatherInfo}>
              <Text style={styles.weatherTemp}>{weatherData.temp}°C</Text>
              <Text style={styles.weatherDesc}>{weatherData.description}</Text>
            </View>
          </View>
          <View style={styles.weatherRight}>
            <View style={styles.weatherDetail}>
              <Ionicons name="water-outline" size={14} color="rgba(255,255,255,0.7)" />
              <Text style={styles.weatherDetailText}>{weatherData.humidity}%</Text>
            </View>
            <View style={styles.weatherDetail}>
              <Ionicons name="speedometer-outline" size={14} color="rgba(255,255,255,0.7)" />
              <Text style={styles.weatherDetailText}>{weatherData.wind}</Text>
            </View>
            <View style={styles.weatherDetail}>
              <Ionicons name="location-outline" size={14} color="rgba(255,255,255,0.7)" />
              <Text style={styles.weatherDetailText}>{weatherData.location}</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Sensor Cards */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            📊 Cảm biến vườn
          </Text>
          <Text style={[styles.sectionSub, { color: colors.textLight }]}>
            Cập nhật realtime
          </Text>
        </View>
        <View style={styles.sensorGrid}>
          <View style={styles.sensorRow}>
            <SensorCard sensor={sensorData[0]} />
            <SensorCard sensor={sensorData[1]} />
          </View>
          <View style={styles.sensorRow}>
            <SensorCard sensor={sensorData[2]} />
            <SensorCard sensor={sensorData[3]} />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            ⚡ Điều khiển nhanh
          </Text>
        </View>
        <View style={styles.quickActions}>
          <QuickAction
            icon="water"
            label="Tưới nước"
            color="#1E88E5"
            initialActive={true}
          />
          <QuickAction
            icon="bulb"
            label="Đèn LED"
            color="#FFA726"
            initialActive={false}
          />
          <QuickAction
            icon="snow-outline"
            label="Quạt gió"
            color="#26A69A"
            initialActive={true}
          />
          <QuickAction
            icon="shield-checkmark-outline"
            label="Bảo vệ"
            color="#7E57C2"
            initialActive={false}
          />
        </View>

        {/* Plants need attention */}
        {needAttention.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                ⚠️ Cần chú ý
              </Text>
              <Text style={[styles.sectionBadge, { backgroundColor: colors.danger + '15', color: colors.danger }]}>
                {needAttention.length} cây
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.plantScroll}
            >
              {needAttention.map((plant) => (
                <View
                  key={plant.id}
                  style={[
                    styles.alertPlantCard,
                    {
                      backgroundColor: colors.backgroundCard,
                      borderColor: colors.danger + '30',
                    },
                  ]}
                >
                  <Text style={styles.alertPlantEmoji}>{plant.emoji}</Text>
                  <Text
                    style={[styles.alertPlantName, { color: colors.text }]}
                    numberOfLines={1}
                  >
                    {plant.name}
                  </Text>
                  <View style={styles.alertPlantHealth}>
                    <View style={[styles.healthTrackSmall, { backgroundColor: colors.borderLight }]}>
                      <View
                        style={[
                          styles.healthFillSmall,
                          {
                            width: `${plant.health}%`,
                            backgroundColor: plant.health < 50 ? colors.danger : colors.warning,
                          },
                        ]}
                      />
                    </View>
                    <Text
                      style={[
                        styles.alertHealthText,
                        { color: plant.health < 50 ? colors.danger : colors.warning },
                      ]}
                    >
                      {plant.health}%
                    </Text>
                  </View>
                  <Text style={[styles.alertPlantNote, { color: colors.textLight }]} numberOfLines={2}>
                    {plant.notes}
                  </Text>
                  <Pressable
                    style={[styles.waterNowBtn, { backgroundColor: colors.secondary }]}
                  >
                    <Ionicons name="water" size={14} color="#fff" />
                    <Text style={styles.waterNowText}>Tưới ngay</Text>
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          </>
        )}

        {/* Garden Summary */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            🌿 Tổng quan vườn
          </Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: colors.backgroundCard, borderColor: colors.borderLight }]}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <View style={[styles.summaryIcon, { backgroundColor: '#E8F5E9' }]}>
                <Text style={{ fontSize: 20 }}>🌱</Text>
              </View>
              <Text style={[styles.summaryValue, { color: colors.text }]}>{plants.length}</Text>
              <Text style={[styles.summaryLabel, { color: colors.textLight }]}>Tổng cây</Text>
            </View>
            <View style={styles.summaryItem}>
              <View style={[styles.summaryIcon, { backgroundColor: '#E3F2FD' }]}>
                <Text style={{ fontSize: 20 }}>💧</Text>
              </View>
              <Text style={[styles.summaryValue, { color: colors.text }]}>3</Text>
              <Text style={[styles.summaryLabel, { color: colors.textLight }]}>Đã tưới hôm nay</Text>
            </View>
            <View style={styles.summaryItem}>
              <View style={[styles.summaryIcon, { backgroundColor: '#FFF3E0' }]}>
                <Text style={{ fontSize: 20 }}>⚠️</Text>
              </View>
              <Text style={[styles.summaryValue, { color: colors.text }]}>{needAttention.length}</Text>
              <Text style={[styles.summaryLabel, { color: colors.textLight }]}>Cần chú ý</Text>
            </View>
            <View style={styles.summaryItem}>
              <View style={[styles.summaryIcon, { backgroundColor: '#F3E5F5' }]}>
                <Text style={{ fontSize: 20 }}>✅</Text>
              </View>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {plants.filter((p) => p.health >= 80).length}
              </Text>
              <Text style={[styles.summaryLabel, { color: colors.textLight }]}>Khỏe mạnh</Text>
            </View>
          </View>
        </View>

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
    paddingBottom: Spacing.xl,
    borderBottomLeftRadius: BorderRadius.xxl,
    borderBottomRightRadius: BorderRadius.xxl,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  headerGreeting: {
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  headerName: {
    fontSize: FontSize.xxl,
    color: '#fff',
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  headerBtn: {
    position: 'relative',
    padding: 6,
  },
  notifBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#FF5252',
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  avatarText: {
    fontSize: 22,
  },

  // Weather
  weatherCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  weatherLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  weatherInfo: {},
  weatherTemp: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: '#fff',
  },
  weatherDesc: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.75)',
  },
  weatherRight: {
    gap: Spacing.xs,
  },
  weatherDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  weatherDetailText: {
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.7)',
  },

  // Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.xl,
  },

  // Sections
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  sectionSub: {
    fontSize: FontSize.xs,
  },
  sectionBadge: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },

  // Sensor grid
  sensorGrid: {
    gap: Spacing.md,
  },
  sensorRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },

  // Quick actions
  quickActions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },

  // Alert plants
  plantScroll: {
    paddingRight: Spacing.xl,
    gap: Spacing.md,
  },
  alertPlantCard: {
    width: 160,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    alignItems: 'center',
  },
  alertPlantEmoji: {
    fontSize: 36,
    marginBottom: Spacing.sm,
  },
  alertPlantName: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  alertPlantHealth: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: '100%',
    marginBottom: Spacing.xs,
  },
  healthTrackSmall: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  healthFillSmall: {
    height: '100%',
    borderRadius: 2,
  },
  alertHealthText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
  },
  alertPlantNote: {
    fontSize: FontSize.xs,
    textAlign: 'center',
    marginBottom: Spacing.sm,
    lineHeight: 15,
  },
  waterNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
  },
  waterNowText: {
    color: '#fff',
    fontSize: FontSize.xs,
    fontWeight: '600',
  },

  // Summary
  summaryCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    borderWidth: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
    gap: 6,
  },
  summaryIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryValue: {
    fontSize: FontSize.xl,
    fontWeight: '700',
  },
  summaryLabel: {
    fontSize: FontSize.xs,
    textAlign: 'center',
    maxWidth: 70,
  },
});
