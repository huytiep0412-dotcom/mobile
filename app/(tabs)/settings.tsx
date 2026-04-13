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
import { userProfile } from '@/constants/mockData';

export default function SettingsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  const [notifWater, setNotifWater] = useState(true);
  const [notifTemp, setNotifTemp] = useState(true);
  const [notifHealth, setNotifHealth] = useState(true);
  const [notifUpdate, setNotifUpdate] = useState(false);
  const [autoWater, setAutoWater] = useState(true);
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');

  const settingSections = [
    {
      title: 'Cài đặt vườn',
      icon: 'leaf',
      items: [
        {
          label: 'Tưới tự động',
          sub: 'Tự động tưới theo lịch đã cài',
          icon: 'water',
          color: '#1E88E5',
          type: 'switch' as const,
          value: autoWater,
          onToggle: setAutoWater,
        },
        {
          label: 'Ngưỡng nhiệt độ',
          sub: '15°C - 38°C',
          icon: 'thermometer',
          color: '#FF6B35',
          type: 'arrow' as const,
        },
        {
          label: 'Ngưỡng độ ẩm đất',
          sub: '25% - 85%',
          icon: 'analytics',
          color: '#43A047',
          type: 'arrow' as const,
        },
      ],
    },
    {
      title: 'Thông báo',
      icon: 'notifications',
      items: [
        {
          label: 'Nhắc tưới nước',
          sub: 'Nhắc khi đến lịch tưới',
          icon: 'water-outline',
          color: '#1E88E5',
          type: 'switch' as const,
          value: notifWater,
          onToggle: setNotifWater,
        },
        {
          label: 'Cảnh báo nhiệt độ',
          sub: 'Khi vượt ngưỡng cài đặt',
          icon: 'thermometer-outline',
          color: '#FF6B35',
          type: 'switch' as const,
          value: notifTemp,
          onToggle: setNotifTemp,
        },
        {
          label: 'Tình trạng cây',
          sub: 'Khi cây cần chú ý',
          icon: 'leaf-outline',
          color: '#43A047',
          type: 'switch' as const,
          value: notifHealth,
          onToggle: setNotifHealth,
        },
        {
          label: 'Cập nhật hệ thống',
          sub: 'Thông báo bảo trì',
          icon: 'settings-outline',
          color: '#7B1FA2',
          type: 'switch' as const,
          value: notifUpdate,
          onToggle: setNotifUpdate,
        },
      ],
    },
    {
      title: 'Giao diện',
      icon: 'color-palette',
      items: [
        {
          label: 'Chế độ tối',
          sub: 'Giảm độ sáng màn hình',
          icon: 'moon',
          color: '#5C6BC0',
          type: 'switch' as const,
          value: darkMode,
          onToggle: setDarkMode,
        },
      ],
    },
    {
      title: 'Khác',
      icon: 'ellipsis-horizontal',
      items: [
        {
          label: 'Hướng dẫn sử dụng',
          sub: 'Xem hướng dẫn ứng dụng',
          icon: 'help-circle-outline',
          color: '#00897B',
          type: 'arrow' as const,
        },
        {
          label: 'Liên hệ hỗ trợ',
          sub: 'support@vuonthongminh.vn',
          icon: 'mail-outline',
          color: '#1E88E5',
          type: 'arrow' as const,
        },
        {
          label: 'Đánh giá ứng dụng',
          sub: 'Cho chúng tôi 5 sao ⭐',
          icon: 'star-outline',
          color: '#FFA726',
          type: 'arrow' as const,
        },
      ],
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
        <Text style={[styles.title, { color: colors.text }]}>⚙️ Cài đặt</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Card */}
        <View
          style={[
            styles.profileCard,
            { backgroundColor: colors.tint },
          ]}
        >
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>{userProfile.avatar}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userProfile.name}</Text>
            <Text style={styles.profileEmail}>{userProfile.email}</Text>
            <View style={styles.profileBadge}>
              <Ionicons name="leaf" size={12} color="#fff" />
              <Text style={styles.profileBadgeText}>
                {userProfile.gardenName} • {userProfile.totalPlants} cây
              </Text>
            </View>
          </View>
          <Pressable style={styles.editBtn}>
            <Ionicons name="create-outline" size={18} color="rgba(255,255,255,0.8)" />
          </Pressable>
        </View>

        {/* Settings Sections */}
        {settingSections.map((section, si) => (
          <View key={si} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              {section.title}
            </Text>
            <View
              style={[
                styles.sectionCard,
                { backgroundColor: colors.backgroundCard, borderColor: colors.borderLight },
              ]}
            >
              {section.items.map((item, ii) => (
                <View key={ii}>
                  <View style={styles.settingRow}>
                    <View style={[styles.settingIcon, { backgroundColor: item.color + '15' }]}>
                      <Ionicons name={item.icon as any} size={18} color={item.color} />
                    </View>
                    <View style={styles.settingInfo}>
                      <Text style={[styles.settingLabel, { color: colors.text }]}>
                        {item.label}
                      </Text>
                      <Text style={[styles.settingSub, { color: colors.textLight }]}>
                        {item.sub}
                      </Text>
                    </View>
                    {item.type === 'switch' && (
                      <Switch
                        value={item.value}
                        onValueChange={item.onToggle}
                        trackColor={{ false: colors.borderLight, true: colors.tint + '60' }}
                        thumbColor={item.value ? colors.tint : '#ccc'}
                      />
                    )}
                    {item.type === 'arrow' && (
                      <Ionicons name="chevron-forward" size={18} color={colors.textLight} />
                    )}
                  </View>
                  {ii < section.items.length - 1 && (
                    <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <Pressable
          style={[styles.logoutBtn, { borderColor: colors.danger + '30' }]}
          onPress={() => Alert.alert('Đăng xuất', 'Bạn có muốn đăng xuất?')}
        >
          <Ionicons name="log-out-outline" size={18} color={colors.danger} />
          <Text style={[styles.logoutText, { color: colors.danger }]}>Đăng xuất</Text>
        </Pressable>

        {/* App info */}
        <View style={styles.appInfo}>
          <Text style={[styles.appInfoText, { color: colors.textLight }]}>
            Vườn Cây Thông Minh v1.0.0
          </Text>
          <Text style={[styles.appInfoText, { color: colors.textLight }]}>
            Made with 💚 by Huy Tiếp @ EPU
          </Text>
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
    paddingBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
  },

  // Profile
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  profileAvatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.lg,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  profileAvatarText: {
    fontSize: 30,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: '#fff',
  },
  profileEmail: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 4,
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  profileBadgeText: {
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  editBtn: {
    padding: 8,
  },

  // Sections
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.xs,
  },
  sectionCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: FontSize.md,
    fontWeight: '500',
  },
  settingSub: {
    fontSize: FontSize.xs,
    marginTop: 1,
  },
  divider: {
    height: 1,
    marginLeft: 68,
  },

  // Logout
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.xl,
  },
  logoutText: {
    fontSize: FontSize.md,
    fontWeight: '600',
  },

  // App info
  appInfo: {
    alignItems: 'center',
    gap: 4,
  },
  appInfoText: {
    fontSize: FontSize.xs,
  },
});
