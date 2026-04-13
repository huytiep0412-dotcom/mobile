import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, BorderRadius, FontSize, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { plants as initialPlants, Plant } from '@/constants/mockData';
import { PlantCard } from '@/components/PlantCard';

type FilterType = 'all' | 'indoor' | 'outdoor' | 'needWater';

const filters: { key: FilterType; label: string; icon: string }[] = [
  { key: 'all', label: 'Tất cả', icon: 'grid-outline' },
  { key: 'indoor', label: 'Trong nhà', icon: 'home-outline' },
  { key: 'outdoor', label: 'Ngoài trời', icon: 'sunny-outline' },
  { key: 'needWater', label: 'Cần tưới', icon: 'water-outline' },
];

const EMOJI_OPTIONS = ['🪴', '🌵', '🌿', '🌾', '🌸', '🌱', '🍃', '🌹', '🎋', '🌻', '🌺', '🌼', '🍀', '🎍', '🌴', '🌳'];

const WATER_FREQUENCIES = [
  { label: 'Hàng ngày', value: 'Mỗi ngày' },
  { label: '2 ngày', value: 'Mỗi 2 ngày' },
  { label: '3 ngày', value: 'Mỗi 3 ngày' },
  { label: '7 ngày', value: 'Mỗi 7 ngày' },
  { label: '14 ngày', value: 'Mỗi 14 ngày' },
];

const INITIAL_FORM = {
  name: '',
  species: '',
  emoji: '🪴',
  location: 'indoor' as 'indoor' | 'outdoor',
  waterFrequency: 'Mỗi 2 ngày',
  temperature: '',
  humidity: '',
  light: '',
  notes: '',
};

export default function GardenScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  const [plants, setPlants] = useState<Plant[]>(initialPlants);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
    }
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setFormErrors({});
  };

  const handleAddPlant = () => {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = 'Vui lòng nhập tên cây';
    if (!form.species.trim()) errors.species = 'Vui lòng nhập loài cây';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newPlant: Plant = {
      id: String(Date.now()),
      name: form.name.trim(),
      species: form.species.trim(),
      emoji: form.emoji,
      location: form.location,
      health: 100,
      lastWatered: 'Vừa thêm',
      nextWater: form.waterFrequency === 'Mỗi ngày' ? '24 giờ nữa' : form.waterFrequency.replace('Mỗi ', '') + ' nữa',
      waterFrequency: form.waterFrequency,
      temperature: form.temperature.trim() || '20-30°C',
      humidity: form.humidity.trim() || '50-70%',
      light: form.light.trim() || 'Ánh sáng vừa phải',
      notes: form.notes.trim() || 'Cây mới thêm vào vườn',
    };

    setPlants((prev) => [newPlant, ...prev]);
    resetForm();
    setShowAddModal(false);
    Alert.alert('🌱 Thành công!', `Đã thêm "${newPlant.name}" vào vườn của bạn.`);
  };

  const filteredPlants = plants.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      activeFilter === 'all' ? true :
      activeFilter === 'indoor' ? p.location === 'indoor' :
      activeFilter === 'outdoor' ? p.location === 'outdoor' :
      p.health < 60;
    return matchSearch && matchFilter;
  });

  const handlePlantPress = (plant: Plant) => {
    setSelectedPlant(plant);
    setShowDetail(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
        <Text style={[styles.title, { color: colors.text }]}>🌱 Vườn của tôi</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {plants.length} cây trồng
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <View style={[styles.searchBar, { backgroundColor: colors.backgroundInput, borderColor: colors.border }]}>
          <Ionicons name="search-outline" size={18} color={colors.textLight} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Tìm kiếm cây..."
            placeholderTextColor={colors.textLight}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color={colors.textLight} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Filter chips */}
      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {filters.map((f) => (
            <Pressable
              key={f.key}
              onPress={() => setActiveFilter(f.key)}
              style={[
                styles.filterChip,
                {
                  backgroundColor: activeFilter === f.key ? colors.tint : colors.backgroundCard,
                  borderColor: activeFilter === f.key ? colors.tint : colors.border,
                },
              ]}
            >
              <Ionicons
                name={f.icon as any}
                size={14}
                color={activeFilter === f.key ? '#fff' : colors.textSecondary}
              />
              <Text
                style={[
                  styles.filterText,
                  { color: activeFilter === f.key ? '#fff' : colors.textSecondary },
                ]}
              >
                {f.label}
              </Text>
              {f.key === 'needWater' && (
                <View style={[
                  styles.filterBadge,
                  { backgroundColor: activeFilter === f.key ? 'rgba(255,255,255,0.3)' : colors.danger + '15' }
                ]}>
                  <Text style={[
                    styles.filterBadgeText,
                    { color: activeFilter === f.key ? '#fff' : colors.danger }
                  ]}>
                    {plants.filter(p => p.health < 60).length}
                  </Text>
                </View>
              )}
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Plant List */}
      <FlatList
        data={filteredPlants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlantCard plant={item} onPress={() => handlePlantPress(item)} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ fontSize: 48 }}>🔍</Text>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Không tìm thấy cây nào
            </Text>
          </View>
        }
      />

      {/* FAB */}
      <Pressable
        style={[styles.fab, { backgroundColor: colors.tint }]}
        onPress={() => setShowAddModal(true)}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>

      {/* Detail Modal */}
      <Modal visible={showDetail} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.modalHandle} />
            {selectedPlant && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.modalHeader}>
                  <Text style={{ fontSize: 56 }}>{selectedPlant.emoji}</Text>
                  <Text style={[styles.modalTitle, { color: colors.text }]}>
                    {selectedPlant.name}
                  </Text>
                  <Text style={[styles.modalSpecies, { color: colors.textSecondary }]}>
                    {selectedPlant.species}
                  </Text>
                </View>

                {/* Health */}
                <View style={[styles.detailCard, { backgroundColor: colors.backgroundCard, borderColor: colors.borderLight }]}>
                  <Text style={[styles.detailCardTitle, { color: colors.text }]}>Sức khỏe</Text>
                  <View style={styles.healthBarLarge}>
                    <View style={[styles.healthTrackLarge, { backgroundColor: colors.borderLight }]}>
                      <View
                        style={[
                          styles.healthFillLarge,
                          {
                            width: `${selectedPlant.health}%`,
                            backgroundColor:
                              selectedPlant.health >= 80 ? colors.success :
                              selectedPlant.health >= 50 ? colors.warning :
                              colors.danger,
                          },
                        ]}
                      />
                    </View>
                    <Text style={[styles.healthValueLarge, { color: colors.text }]}>
                      {selectedPlant.health}%
                    </Text>
                  </View>
                </View>

                {/* Info Grid */}
                <View style={[styles.detailCard, { backgroundColor: colors.backgroundCard, borderColor: colors.borderLight }]}>
                  <Text style={[styles.detailCardTitle, { color: colors.text }]}>Thông tin</Text>
                  <View style={styles.infoGrid}>
                    <View style={styles.infoItem}>
                      <Ionicons name="location-outline" size={18} color={colors.tint} />
                      <Text style={[styles.infoLabel, { color: colors.textLight }]}>Vị trí</Text>
                      <Text style={[styles.infoValue, { color: colors.text }]}>
                        {selectedPlant.location === 'indoor' ? 'Trong nhà' : 'Ngoài trời'}
                      </Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Ionicons name="thermometer-outline" size={18} color="#FF6B35" />
                      <Text style={[styles.infoLabel, { color: colors.textLight }]}>Nhiệt độ</Text>
                      <Text style={[styles.infoValue, { color: colors.text }]}>{selectedPlant.temperature}</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Ionicons name="water-outline" size={18} color="#1E88E5" />
                      <Text style={[styles.infoLabel, { color: colors.textLight }]}>Độ ẩm</Text>
                      <Text style={[styles.infoValue, { color: colors.text }]}>{selectedPlant.humidity}</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Ionicons name="sunny-outline" size={18} color="#FFA726" />
                      <Text style={[styles.infoLabel, { color: colors.textLight }]}>Ánh sáng</Text>
                      <Text style={[styles.infoValue, { color: colors.text }]}>{selectedPlant.light}</Text>
                    </View>
                  </View>
                </View>

                {/* Watering */}
                <View style={[styles.detailCard, { backgroundColor: colors.backgroundCard, borderColor: colors.borderLight }]}>
                  <Text style={[styles.detailCardTitle, { color: colors.text }]}>Tưới tiêu</Text>
                  <View style={styles.waterInfoRow}>
                    <View style={styles.waterInfoItem}>
                      <Text style={[styles.waterInfoLabel, { color: colors.textLight }]}>Lần tưới gần nhất</Text>
                      <Text style={[styles.waterInfoValue, { color: colors.text }]}>{selectedPlant.lastWatered}</Text>
                    </View>
                    <View style={styles.waterInfoItem}>
                      <Text style={[styles.waterInfoLabel, { color: colors.textLight }]}>Tưới tiếp</Text>
                      <Text style={[styles.waterInfoValue, { color: colors.text }]}>{selectedPlant.nextWater}</Text>
                    </View>
                    <View style={styles.waterInfoItem}>
                      <Text style={[styles.waterInfoLabel, { color: colors.textLight }]}>Tần suất</Text>
                      <Text style={[styles.waterInfoValue, { color: colors.text }]}>{selectedPlant.waterFrequency}</Text>
                    </View>
                  </View>
                </View>

                {/* Notes */}
                <View style={[styles.detailCard, { backgroundColor: colors.backgroundCard, borderColor: colors.borderLight }]}>
                  <Text style={[styles.detailCardTitle, { color: colors.text }]}>Ghi chú</Text>
                  <Text style={[styles.noteText, { color: colors.textSecondary }]}>{selectedPlant.notes}</Text>
                </View>

                {/* Actions */}
                <View style={styles.detailActions}>
                  <Pressable
                    style={[styles.actionBtn, { backgroundColor: colors.secondary }]}
                    onPress={() => Alert.alert('Thành công', 'Đã tưới ' + selectedPlant.name)}
                  >
                    <Ionicons name="water" size={18} color="#fff" />
                    <Text style={styles.actionBtnText}>Tưới ngay</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.actionBtn, styles.actionBtnOutline, { borderColor: colors.border }]}
                    onPress={() => setShowDetail(false)}
                  >
                    <Text style={[styles.actionBtnTextOutline, { color: colors.text }]}>Đóng</Text>
                  </Pressable>
                </View>

                <View style={{ height: 40 }} />
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* Add Plant Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.modalHandle} />

            {/* Modal Header */}
            <View style={styles.addModalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                🌱 Thêm cây mới
              </Text>
              <Pressable
                onPress={() => { resetForm(); setShowAddModal(false); }}
                style={[styles.addCloseBtn, { backgroundColor: colors.backgroundInput }]}
              >
                <Ionicons name="close" size={20} color={colors.textSecondary} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

              {/* Emoji Picker */}
              <Text style={[styles.formLabel, { color: colors.text }]}>Chọn biểu tượng</Text>
              <View style={styles.emojiGrid}>
                {EMOJI_OPTIONS.map((emoji) => (
                  <Pressable
                    key={emoji}
                    onPress={() => updateForm('emoji', emoji)}
                    style={[
                      styles.emojiOption,
                      {
                        backgroundColor: form.emoji === emoji ? colors.tint + '20' : colors.backgroundInput,
                        borderColor: form.emoji === emoji ? colors.tint : 'transparent',
                      },
                    ]}
                  >
                    <Text style={styles.emojiOptionText}>{emoji}</Text>
                  </Pressable>
                ))}
              </View>

              {/* Name */}
              <Text style={[styles.formLabel, { color: colors.text }]}>Tên cây *</Text>
              <View style={[
                styles.formInputWrap,
                {
                  backgroundColor: colors.backgroundInput,
                  borderColor: formErrors.name ? colors.danger : colors.border,
                },
              ]}>
                <Ionicons name="leaf-outline" size={18} color={colors.textLight} />
                <TextInput
                  style={[styles.formInput, { color: colors.text }]}
                  placeholder="VD: Monstera Deliciosa"
                  placeholderTextColor={colors.textLight}
                  value={form.name}
                  onChangeText={(v) => updateForm('name', v)}
                />
              </View>
              {formErrors.name && <Text style={[styles.formError, { color: colors.danger }]}>{formErrors.name}</Text>}

              {/* Species */}
              <Text style={[styles.formLabel, { color: colors.text }]}>Loài cây *</Text>
              <View style={[
                styles.formInputWrap,
                {
                  backgroundColor: colors.backgroundInput,
                  borderColor: formErrors.species ? colors.danger : colors.border,
                },
              ]}>
                <Ionicons name="flask-outline" size={18} color={colors.textLight} />
                <TextInput
                  style={[styles.formInput, { color: colors.text }]}
                  placeholder="VD: Araceae"
                  placeholderTextColor={colors.textLight}
                  value={form.species}
                  onChangeText={(v) => updateForm('species', v)}
                />
              </View>
              {formErrors.species && <Text style={[styles.formError, { color: colors.danger }]}>{formErrors.species}</Text>}

              {/* Location */}
              <Text style={[styles.formLabel, { color: colors.text }]}>Vị trí</Text>
              <View style={styles.locationRow}>
                <Pressable
                  onPress={() => updateForm('location', 'indoor')}
                  style={[
                    styles.locationOption,
                    {
                      backgroundColor: form.location === 'indoor' ? colors.tint : colors.backgroundCard,
                      borderColor: form.location === 'indoor' ? colors.tint : colors.border,
                    },
                  ]}
                >
                  <Ionicons name="home" size={20} color={form.location === 'indoor' ? '#fff' : colors.textSecondary} />
                  <Text style={[
                    styles.locationText,
                    { color: form.location === 'indoor' ? '#fff' : colors.textSecondary },
                  ]}>Trong nhà</Text>
                </Pressable>
                <Pressable
                  onPress={() => updateForm('location', 'outdoor')}
                  style={[
                    styles.locationOption,
                    {
                      backgroundColor: form.location === 'outdoor' ? colors.tint : colors.backgroundCard,
                      borderColor: form.location === 'outdoor' ? colors.tint : colors.border,
                    },
                  ]}
                >
                  <Ionicons name="sunny" size={20} color={form.location === 'outdoor' ? '#fff' : colors.textSecondary} />
                  <Text style={[
                    styles.locationText,
                    { color: form.location === 'outdoor' ? '#fff' : colors.textSecondary },
                  ]}>Ngoài trời</Text>
                </Pressable>
              </View>

              {/* Water Frequency */}
              <Text style={[styles.formLabel, { color: colors.text }]}>Tần suất tưới</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.freqScroll} contentContainerStyle={styles.freqScrollContent}>
                {WATER_FREQUENCIES.map((freq) => (
                  <Pressable
                    key={freq.value}
                    onPress={() => updateForm('waterFrequency', freq.value)}
                    style={[
                      styles.freqChip,
                      {
                        backgroundColor: form.waterFrequency === freq.value ? colors.secondary : colors.backgroundCard,
                        borderColor: form.waterFrequency === freq.value ? colors.secondary : colors.border,
                      },
                    ]}
                  >
                    <Ionicons
                      name="water"
                      size={14}
                      color={form.waterFrequency === freq.value ? '#fff' : colors.secondary}
                    />
                    <Text style={[
                      styles.freqText,
                      { color: form.waterFrequency === freq.value ? '#fff' : colors.textSecondary },
                    ]}>{freq.label}</Text>
                  </Pressable>
                ))}
              </ScrollView>

              {/* Environment Info */}
              <Text style={[styles.formLabel, { color: colors.text }]}>Điều kiện môi trường</Text>
              <View style={[styles.formCard, { backgroundColor: colors.backgroundCard, borderColor: colors.borderLight }]}>
                <View style={styles.envRow}>
                  <View style={[styles.envIcon, { backgroundColor: '#FF6B3515' }]}>
                    <Ionicons name="thermometer-outline" size={16} color="#FF6B35" />
                  </View>
                  <TextInput
                    style={[styles.envInput, { color: colors.text, borderBottomColor: colors.borderLight }]}
                    placeholder="Nhiệt độ (VD: 20-30°C)"
                    placeholderTextColor={colors.textLight}
                    value={form.temperature}
                    onChangeText={(v) => updateForm('temperature', v)}
                  />
                </View>
                <View style={styles.envRow}>
                  <View style={[styles.envIcon, { backgroundColor: '#1E88E515' }]}>
                    <Ionicons name="water-outline" size={16} color="#1E88E5" />
                  </View>
                  <TextInput
                    style={[styles.envInput, { color: colors.text, borderBottomColor: colors.borderLight }]}
                    placeholder="Độ ẩm (VD: 50-70%)"
                    placeholderTextColor={colors.textLight}
                    value={form.humidity}
                    onChangeText={(v) => updateForm('humidity', v)}
                  />
                </View>
                <View style={styles.envRow}>
                  <View style={[styles.envIcon, { backgroundColor: '#FFA72615' }]}>
                    <Ionicons name="sunny-outline" size={16} color="#FFA726" />
                  </View>
                  <TextInput
                    style={[styles.envInput, { color: colors.text, borderBottomColor: 'transparent' }]}
                    placeholder="Ánh sáng (VD: Gián tiếp)"
                    placeholderTextColor={colors.textLight}
                    value={form.light}
                    onChangeText={(v) => updateForm('light', v)}
                  />
                </View>
              </View>

              {/* Notes */}
              <Text style={[styles.formLabel, { color: colors.text }]}>Ghi chú</Text>
              <View style={[
                styles.formInputWrap,
                { backgroundColor: colors.backgroundInput, borderColor: colors.border, minHeight: 80, alignItems: 'flex-start', paddingTop: Spacing.md },
              ]}>
                <Ionicons name="create-outline" size={18} color={colors.textLight} style={{ marginTop: 2 }} />
                <TextInput
                  style={[styles.formInput, { color: colors.text, minHeight: 60, textAlignVertical: 'top' }]}
                  placeholder="Ghi chú thêm về cây..."
                  placeholderTextColor={colors.textLight}
                  value={form.notes}
                  onChangeText={(v) => updateForm('notes', v)}
                  multiline
                  numberOfLines={3}
                />
              </View>

              {/* Submit Buttons */}
              <View style={styles.addActions}>
                <Pressable
                  style={({ pressed }) => [
                    styles.actionBtn,
                    { backgroundColor: colors.tint, opacity: pressed ? 0.85 : 1 },
                  ]}
                  onPress={handleAddPlant}
                >
                  <Ionicons name="add-circle" size={20} color="#fff" />
                  <Text style={styles.actionBtnText}>Thêm vào vườn</Text>
                </Pressable>
                <Pressable
                  style={[styles.actionBtn, styles.actionBtnOutline, { borderColor: colors.border }]}
                  onPress={() => { resetForm(); setShowAddModal(false); }}
                >
                  <Text style={[styles.actionBtnTextOutline, { color: colors.text }]}>Hủy</Text>
                </Pressable>
              </View>

              <View style={{ height: 40 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  searchWrap: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    height: 44,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.md,
    paddingVertical: 0,
  },
  filterRow: {
    marginBottom: Spacing.md,
  },
  filterScroll: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  filterText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  filterBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
    marginLeft: 2,
  },
  filterBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 100,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    gap: Spacing.md,
  },
  emptyText: {
    fontSize: FontSize.md,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
    maxHeight: '90%',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: Spacing.lg,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  modalTitle: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
  },
  modalSpecies: {
    fontSize: FontSize.sm,
    marginTop: 2,
  },

  // Detail card
  detailCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  detailCardTitle: {
    fontSize: FontSize.md,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  healthBarLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  healthTrackLarge: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  healthFillLarge: {
    height: '100%',
    borderRadius: 5,
  },
  healthValueLarge: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    width: 44,
    textAlign: 'right',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  infoItem: {
    width: '46%',
    alignItems: 'flex-start',
    gap: 4,
    marginBottom: Spacing.sm,
  },
  infoLabel: {
    fontSize: FontSize.xs,
  },
  infoValue: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  waterInfoRow: {
    gap: Spacing.md,
  },
  waterInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  waterInfoLabel: {
    fontSize: FontSize.sm,
  },
  waterInfoValue: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  noteText: {
    fontSize: FontSize.md,
    lineHeight: 22,
  },

  // Actions
  detailActions: {
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
  },
  actionBtnText: {
    color: '#fff',
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  actionBtnOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  actionBtnTextOutline: {
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  addNote: {
    fontSize: FontSize.md,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Spacing.xl,
  },

  // Add Modal
  addModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  addCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formLabel: {
    fontSize: FontSize.md,
    fontWeight: '600',
    marginBottom: Spacing.sm,
    marginTop: Spacing.lg,
  },
  formInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    minHeight: 48,
  },
  formInput: {
    flex: 1,
    fontSize: FontSize.md,
    paddingVertical: Spacing.sm,
  },
  formError: {
    fontSize: FontSize.xs,
    marginTop: 4,
    marginLeft: 4,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  emojiOption: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  emojiOptionText: {
    fontSize: 24,
  },
  locationRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  locationOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  locationText: {
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  freqScroll: {
    marginBottom: Spacing.sm,
  },
  freqScrollContent: {
    gap: Spacing.sm,
  },
  freqChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  freqText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  formCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  envRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  envIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  envInput: {
    flex: 1,
    fontSize: FontSize.md,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  addActions: {
    gap: Spacing.md,
    marginTop: Spacing.xxl,
  },
});
