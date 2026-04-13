/**
 * Mock Data - Vườn Cây Thông Minh
 */

export interface SensorData {
  id: string;
  label: string;
  value: number;
  unit: string;
  icon: string;
  color: string;
  min: number;
  max: number;
  warningLow: number;
  warningHigh: number;
}

export interface Plant {
  id: string;
  name: string;
  species: string;
  emoji: string;
  location: 'indoor' | 'outdoor';
  health: number; // 0-100
  lastWatered: string;
  nextWater: string;
  waterFrequency: string;
  temperature: string;
  humidity: string;
  light: string;
  notes: string;
}

export interface WateringSchedule {
  id: string;
  plantName: string;
  plantEmoji: string;
  time: string;
  frequency: string;
  duration: string;
  enabled: boolean;
  lastRun: string;
}

export interface WateringHistory {
  id: string;
  plantName: string;
  plantEmoji: string;
  time: string;
  date: string;
  amount: string;
  method: 'auto' | 'manual';
}

export interface Notification {
  id: string;
  type: 'warning' | 'reminder' | 'info' | 'success';
  title: string;
  message: string;
  time: string;
  date: string;
  read: boolean;
  icon: string;
}

export const sensorData: SensorData[] = [
  {
    id: 'temp',
    label: 'Nhiệt độ',
    value: 28,
    unit: '°C',
    icon: 'thermometer',
    color: '#FF6B35',
    min: 0,
    max: 50,
    warningLow: 15,
    warningHigh: 38,
  },
  {
    id: 'humidity',
    label: 'Độ ẩm KK',
    value: 65,
    unit: '%',
    icon: 'water',
    color: '#1E88E5',
    min: 0,
    max: 100,
    warningLow: 30,
    warningHigh: 90,
  },
  {
    id: 'soil',
    label: 'Độ ẩm đất',
    value: 72,
    unit: '%',
    icon: 'leaf',
    color: '#43A047',
    min: 0,
    max: 100,
    warningLow: 25,
    warningHigh: 85,
  },
  {
    id: 'light',
    label: 'Ánh sáng',
    value: 850,
    unit: 'lux',
    icon: 'sunny',
    color: '#FFA726',
    min: 0,
    max: 2000,
    warningLow: 200,
    warningHigh: 1800,
  },
];

export const plants: Plant[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    species: 'Araceae',
    emoji: '🪴',
    location: 'indoor',
    health: 92,
    lastWatered: '2 giờ trước',
    nextWater: '22 giờ nữa',
    waterFrequency: 'Mỗi 2 ngày',
    temperature: '25-30°C',
    humidity: '60-80%',
    light: 'Ánh sáng gián tiếp',
    notes: 'Cây phát triển tốt, đã ra lá mới',
  },
  {
    id: '2',
    name: 'Sen Đá Echeveria',
    species: 'Crassulaceae',
    emoji: '🌵',
    location: 'outdoor',
    health: 85,
    lastWatered: '3 ngày trước',
    nextWater: '4 ngày nữa',
    waterFrequency: 'Mỗi 7 ngày',
    temperature: '20-35°C',
    humidity: '30-50%',
    light: 'Ánh sáng trực tiếp',
    notes: 'Cần ít nước, tránh úng',
  },
  {
    id: '3',
    name: 'Kim Tiền',
    species: 'Araceae',
    emoji: '🌿',
    location: 'indoor',
    health: 78,
    lastWatered: '1 ngày trước',
    nextWater: '2 ngày nữa',
    waterFrequency: 'Mỗi 3 ngày',
    temperature: '20-28°C',
    humidity: '50-70%',
    light: 'Ánh sáng vừa phải',
    notes: 'Cây mang lại tài lộc',
  },
  {
    id: '4',
    name: 'Lưỡi Hổ',
    species: 'Asparagaceae',
    emoji: '🌾',
    location: 'indoor',
    health: 95,
    lastWatered: '5 ngày trước',
    nextWater: '2 ngày nữa',
    waterFrequency: 'Mỗi 7 ngày',
    temperature: '18-30°C',
    humidity: '30-50%',
    light: 'Chịu bóng tốt',
    notes: 'Lọc không khí rất tốt',
  },
  {
    id: '5',
    name: 'Lan Hồ Điệp',
    species: 'Orchidaceae',
    emoji: '🌸',
    location: 'indoor',
    health: 60,
    lastWatered: '1 ngày trước',
    nextWater: '1 ngày nữa',
    waterFrequency: 'Mỗi 2 ngày',
    temperature: '22-28°C',
    humidity: '60-80%',
    light: 'Ánh sáng gián tiếp',
    notes: '⚠️ Cần theo dõi - lá hơi vàng',
  },
  {
    id: '6',
    name: 'Cây Bạc Hà',
    species: 'Lamiaceae',
    emoji: '🌱',
    location: 'outdoor',
    health: 88,
    lastWatered: '12 giờ trước',
    nextWater: '12 giờ nữa',
    waterFrequency: 'Mỗi ngày',
    temperature: '20-30°C',
    humidity: '50-70%',
    light: 'Ánh sáng trực tiếp',
    notes: 'Phát triển nhanh, cần cắt tỉa',
  },
  {
    id: '7',
    name: 'Xương Rồng',
    species: 'Cactaceae',
    emoji: '🌵',
    location: 'outdoor',
    health: 97,
    lastWatered: '10 ngày trước',
    nextWater: '4 ngày nữa',
    waterFrequency: 'Mỗi 14 ngày',
    temperature: '20-40°C',
    humidity: '20-40%',
    light: 'Ánh sáng mạnh',
    notes: 'Rất dễ chăm sóc',
  },
  {
    id: '8',
    name: 'Trầu Bà',
    species: 'Araceae',
    emoji: '🍃',
    location: 'indoor',
    health: 42,
    lastWatered: '4 ngày trước',
    nextWater: 'Cần tưới ngay!',
    waterFrequency: 'Mỗi 2 ngày',
    temperature: '22-30°C',
    humidity: '60-80%',
    light: 'Ánh sáng gián tiếp',
    notes: '🚨 Thiếu nước nghiêm trọng!',
  },
  {
    id: '9',
    name: 'Hoa Hồng',
    species: 'Rosaceae',
    emoji: '🌹',
    location: 'outdoor',
    health: 75,
    lastWatered: '1 ngày trước',
    nextWater: '1 ngày nữa',
    waterFrequency: 'Mỗi 2 ngày',
    temperature: '18-28°C',
    humidity: '50-70%',
    light: 'Ánh sáng trực tiếp',
    notes: 'Đang ra nụ, sắp nở hoa',
  },
  {
    id: '10',
    name: 'Cây Phát Tài',
    species: 'Asparagaceae',
    emoji: '🎋',
    location: 'indoor',
    health: 83,
    lastWatered: '2 ngày trước',
    nextWater: '1 ngày nữa',
    waterFrequency: 'Mỗi 3 ngày',
    temperature: '20-30°C',
    humidity: '50-70%',
    light: 'Ánh sáng vừa phải',
    notes: 'Cây khỏe, thân đẹp',
  },
];

export const wateringSchedules: WateringSchedule[] = [
  { id: '1', plantName: 'Monstera Deliciosa', plantEmoji: '🪴', time: '06:00', frequency: 'Mỗi 2 ngày', duration: '30 giây', enabled: true, lastRun: 'Hôm nay, 06:00' },
  { id: '2', plantName: 'Kim Tiền', plantEmoji: '🌿', time: '07:00', frequency: 'Mỗi 3 ngày', duration: '20 giây', enabled: true, lastRun: 'Hôm qua, 07:00' },
  { id: '3', plantName: 'Lan Hồ Điệp', plantEmoji: '🌸', time: '06:30', frequency: 'Mỗi 2 ngày', duration: '15 giây', enabled: true, lastRun: 'Hôm nay, 06:30' },
  { id: '4', plantName: 'Cây Bạc Hà', plantEmoji: '🌱', time: '07:30', frequency: 'Hàng ngày', duration: '25 giây', enabled: true, lastRun: 'Hôm nay, 07:30' },
  { id: '5', plantName: 'Hoa Hồng', plantEmoji: '🌹', time: '06:00', frequency: 'Mỗi 2 ngày', duration: '35 giây', enabled: false, lastRun: '2 ngày trước' },
  { id: '6', plantName: 'Sen Đá Echeveria', plantEmoji: '🌵', time: '08:00', frequency: 'Mỗi 7 ngày', duration: '10 giây', enabled: true, lastRun: '3 ngày trước' },
  { id: '7', plantName: 'Trầu Bà', plantEmoji: '🍃', time: '06:00', frequency: 'Mỗi 2 ngày', duration: '20 giây', enabled: false, lastRun: '4 ngày trước' },
];

export const wateringHistory: WateringHistory[] = [
  { id: '1', plantName: 'Cây Bạc Hà', plantEmoji: '🌱', time: '07:30', date: 'Hôm nay', amount: '200ml', method: 'auto' },
  { id: '2', plantName: 'Lan Hồ Điệp', plantEmoji: '🌸', time: '06:30', date: 'Hôm nay', amount: '150ml', method: 'auto' },
  { id: '3', plantName: 'Monstera Deliciosa', plantEmoji: '🪴', time: '06:00', date: 'Hôm nay', amount: '300ml', method: 'auto' },
  { id: '4', plantName: 'Kim Tiền', plantEmoji: '🌿', time: '07:00', date: 'Hôm qua', amount: '200ml', method: 'auto' },
  { id: '5', plantName: 'Cây Bạc Hà', plantEmoji: '🌱', time: '07:30', date: 'Hôm qua', amount: '200ml', method: 'auto' },
  { id: '6', plantName: 'Hoa Hồng', plantEmoji: '🌹', time: '18:00', date: 'Hôm qua', amount: '350ml', method: 'manual' },
  { id: '7', plantName: 'Trầu Bà', plantEmoji: '🍃', time: '09:00', date: '2 ngày trước', amount: '200ml', method: 'manual' },
  { id: '8', plantName: 'Lưỡi Hổ', plantEmoji: '🌾', time: '08:00', date: '3 ngày trước', amount: '150ml', method: 'auto' },
];

export const notifications: Notification[] = [
  { id: '1', type: 'warning', title: 'Trầu Bà thiếu nước!', message: 'Độ ẩm đất của Trầu Bà chỉ còn 18%. Hãy tưới ngay!', time: '10 phút trước', date: 'Hôm nay', read: false, icon: 'alert-circle' },
  { id: '2', type: 'info', title: 'Tưới tự động hoàn tất', message: 'Đã tưới Monstera Deliciosa, Kim Tiền, Cây Bạc Hà vào lúc 06:00', time: '4 giờ trước', date: 'Hôm nay', read: false, icon: 'checkmark-circle' },
  { id: '3', type: 'warning', title: 'Nhiệt độ cao', message: 'Nhiệt độ vườn đạt 35°C. Cân nhắc bật quạt hoặc che nắng.', time: '2 giờ trước', date: 'Hôm nay', read: true, icon: 'thermometer' },
  { id: '4', type: 'reminder', title: 'Nhắc bón phân', message: 'Đã đến lịch bón phân cho Lan Hồ Điệp và Hoa Hồng', time: '5 giờ trước', date: 'Hôm nay', read: true, icon: 'time' },
  { id: '5', type: 'success', title: 'Cây mới khỏe mạnh', message: 'Monstera Deliciosa đã ra 2 lá mới trong tuần này!', time: '8 giờ trước', date: 'Hôm nay', read: true, icon: 'leaf' },
  { id: '6', type: 'warning', title: 'Lan Hồ Điệp cần chú ý', message: 'Lá có dấu hiệu vàng, kiểm tra ánh sáng và nước.', time: 'Hôm qua', date: 'Hôm qua', read: true, icon: 'warning' },
  { id: '7', type: 'info', title: 'Cập nhật hệ thống', message: 'Hệ thống tưới đã được cập nhật lịch mới thành công.', time: 'Hôm qua', date: 'Hôm qua', read: true, icon: 'settings' },
  { id: '8', type: 'reminder', title: 'Kiểm tra cảm biến', message: 'Cảm biến ánh sáng cần được vệ sinh định kỳ.', time: '2 ngày trước', date: '2 ngày trước', read: true, icon: 'hardware-chip' },
  { id: '9', type: 'success', title: 'Tiết kiệm nước', message: 'Tuần này bạn đã tiết kiệm 2.5L nước nhờ tưới tự động!', time: '3 ngày trước', date: '3 ngày trước', read: true, icon: 'water' },
];

export const userProfile = {
  name: 'Huy Tiếp',
  email: 'huytiep@epu.edu.vn',
  avatar: '👨‍🌾',
  gardenName: 'Vườn Nhà Tiếp',
  totalPlants: 10,
  joinDate: 'Tháng 1, 2026',
};

export const weatherData = {
  temp: 31,
  description: 'Nắng nhẹ',
  icon: 'partly-sunny',
  humidity: 68,
  wind: '12 km/h',
  location: 'Hà Nội',
};

// ============ CARE CALENDAR ============

export interface CareTask {
  id: string;
  plantId: string;
  plantName: string;
  plantEmoji: string;
  type: 'water' | 'fertilize' | 'prune' | 'rotate' | 'spray' | 'repot';
  date: string; // 'YYYY-MM-DD'
  time: string;
  done: boolean;
  notes: string;
}

export const careTypeConfig: Record<string, { label: string; emoji: string; color: string }> = {
  water: { label: 'Tưới nước', emoji: '💧', color: '#1E88E5' },
  fertilize: { label: 'Bón phân', emoji: '🧪', color: '#FF8F00' },
  prune: { label: 'Cắt tỉa', emoji: '✂️', color: '#43A047' },
  rotate: { label: 'Xoay chậu', emoji: '🔄', color: '#7E57C2' },
  spray: { label: 'Phun thuốc', emoji: '🧴', color: '#E53935' },
  repot: { label: 'Thay chậu', emoji: '🪴', color: '#795548' },
};

const today = new Date();
const fmt = (d: Date) => d.toISOString().split('T')[0];
const addDays = (d: Date, n: number) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };

export const careTasks: CareTask[] = [
  { id: 'ct1', plantId: '1', plantName: 'Monstera Deliciosa', plantEmoji: '🪴', type: 'water', date: fmt(today), time: '06:00', done: true, notes: 'Tưới vừa phải' },
  { id: 'ct2', plantId: '5', plantName: 'Lan Hồ Điệp', plantEmoji: '🌸', type: 'water', date: fmt(today), time: '06:30', done: true, notes: '' },
  { id: 'ct3', plantId: '6', plantName: 'Cây Bạc Hà', plantEmoji: '🌱', type: 'water', date: fmt(today), time: '07:30', done: false, notes: '' },
  { id: 'ct4', plantId: '5', plantName: 'Lan Hồ Điệp', plantEmoji: '🌸', type: 'fertilize', date: fmt(today), time: '08:00', done: false, notes: 'Phân NPK loãng' },
  { id: 'ct5', plantId: '9', plantName: 'Hoa Hồng', plantEmoji: '🌹', type: 'spray', date: fmt(today), time: '17:00', done: false, notes: 'Phun thuốc trừ rệp' },
  { id: 'ct6', plantId: '6', plantName: 'Cây Bạc Hà', plantEmoji: '🌱', type: 'prune', date: fmt(today), time: '09:00', done: false, notes: 'Cắt ngọn cho ra nhánh' },
  { id: 'ct7', plantId: '3', plantName: 'Kim Tiền', plantEmoji: '🌿', type: 'rotate', date: fmt(addDays(today, 1)), time: '08:00', done: false, notes: 'Xoay 90° cho đều ánh sáng' },
  { id: 'ct8', plantId: '1', plantName: 'Monstera Deliciosa', plantEmoji: '🪴', type: 'water', date: fmt(addDays(today, 1)), time: '06:00', done: false, notes: '' },
  { id: 'ct9', plantId: '9', plantName: 'Hoa Hồng', plantEmoji: '🌹', type: 'fertilize', date: fmt(addDays(today, 2)), time: '07:00', done: false, notes: 'Phân hữu cơ' },
  { id: 'ct10', plantId: '8', plantName: 'Trầu Bà', plantEmoji: '🍃', type: 'repot', date: fmt(addDays(today, 2)), time: '09:00', done: false, notes: 'Chậu lớn hơn + đất mới' },
  { id: 'ct11', plantId: '4', plantName: 'Lưỡi Hổ', plantEmoji: '🌾', type: 'water', date: fmt(addDays(today, 3)), time: '06:00', done: false, notes: '' },
  { id: 'ct12', plantId: '2', plantName: 'Sen Đá Echeveria', plantEmoji: '🌵', type: 'water', date: fmt(addDays(today, 4)), time: '08:00', done: false, notes: 'Ít nước' },
  { id: 'ct13', plantId: '10', plantName: 'Cây Phát Tài', plantEmoji: '🎋', type: 'fertilize', date: fmt(addDays(today, 5)), time: '07:00', done: false, notes: '' },
  { id: 'ct14', plantId: '7', plantName: 'Xương Rồng', plantEmoji: '🌵', type: 'water', date: fmt(addDays(today, 6)), time: '08:00', done: false, notes: 'Rất ít nước' },
];

// ============ SMART REMINDERS ============

export interface SmartReminder {
  id: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  icon: string;
  title: string;
  message: string;
  reason: string;
  actionLabel: string;
  color: string;
}

export const generateSmartReminders = (weather: typeof weatherData, plantList: Plant[]): SmartReminder[] => {
  const reminders: SmartReminder[] = [];

  // Weather-based
  if (weather.temp >= 33) {
    reminders.push({
      id: 'sr1', priority: 'urgent', icon: '🌡️',
      title: 'Nắng nóng gay gắt!',
      message: `Nhiệt độ ${weather.temp}°C - cần tưới thêm nước cho cây trong nhà và che nắng cây ngoài trời.`,
      reason: `Dựa trên nhiệt độ hiện tại: ${weather.temp}°C`,
      actionLabel: 'Tưới ngay', color: '#E53935',
    });
  }

  if (weather.humidity < 40) {
    reminders.push({
      id: 'sr2', priority: 'high', icon: '💨',
      title: 'Độ ẩm không khí thấp',
      message: 'Phun sương cho Lan Hồ Điệp, Monstera và Trầu Bà để tăng độ ẩm.',
      reason: `Độ ẩm KK: ${weather.humidity}%`,
      actionLabel: 'Phun sương', color: '#FF8F00',
    });
  }

  // Plant health-based
  const sickPlants = plantList.filter(p => p.health < 50);
  if (sickPlants.length > 0) {
    reminders.push({
      id: 'sr3', priority: 'urgent', icon: '🚨',
      title: `${sickPlants.length} cây cần cứu gấp!`,
      message: `${sickPlants.map(p => p.name).join(', ')} đang trong tình trạng nguy hiểm. Kiểm tra nước, ánh sáng và sâu bệnh.`,
      reason: 'Sức khỏe cây dưới 50%',
      actionLabel: 'Xem chi tiết', color: '#E53935',
    });
  }

  // Season-based
  reminders.push({
    id: 'sr4', priority: 'medium', icon: '☀️',
    title: 'Mùa hè - Tăng tần suất tưới',
    message: 'Thời tiết nóng, nên tưới nước sáng sớm (6-7h) hoặc chiều mát (17-18h) để tránh sốc nhiệt.',
    reason: 'Dựa trên mùa và thời tiết',
    actionLabel: 'Cập nhật lịch', color: '#FF8F00',
  });

  // Plant-type specific
  const outdoorPlants = plantList.filter(p => p.location === 'outdoor');
  if (weather.description.includes('mưa') || weather.description.includes('Mưa')) {
    reminders.push({
      id: 'sr5', priority: 'medium', icon: '🌧️',
      title: 'Trời mưa - Tạm dừng tưới cây ngoài trời',
      message: `${outdoorPlants.map(p => p.name).join(', ')} không cần tưới hôm nay.`,
      reason: 'Thời tiết mưa',
      actionLabel: 'Tắt tưới ngoài', color: '#1E88E5',
    });
  } else {
    reminders.push({
      id: 'sr5b', priority: 'low', icon: '🌱',
      title: 'Cây ngoài trời phát triển tốt',
      message: `${outdoorPlants.length} cây ngoài trời đang nhận đủ ánh sáng. Tiếp tục duy trì lịch tưới.`,
      reason: 'Dựa trên thời tiết hiện tại',
      actionLabel: 'Xem lịch', color: '#43A047',
    });
  }

  // Fertilizer reminder
  reminders.push({
    id: 'sr6', priority: 'low', icon: '🧪',
    title: 'Nhắc bón phân định kỳ',
    message: 'Lan Hồ Điệp và Hoa Hồng cần bón phân tuần này. Dùng phân NPK loãng cho Lan, phân hữu cơ cho Hồng.',
    reason: 'Lịch bón phân 2 tuần/lần',
    actionLabel: 'Đặt nhắc nhở', color: '#7E57C2',
  });

  return reminders.sort((a, b) => {
    const order = { urgent: 0, high: 1, medium: 2, low: 3 };
    return order[a.priority] - order[b.priority];
  });
};

// ============ SHOP ============

export interface Product {
  id: string;
  name: string;
  emoji: string;
  category: 'fertilizer' | 'soil' | 'medicine' | 'tool' | 'seed' | 'pot';
  price: number;
  originalPrice?: number;
  description: string;
  rating: number;
  sold: number;
}

export const shopCategories: { key: string; label: string; emoji: string }[] = [
  { key: 'all', label: 'Tất cả', emoji: '🏪' },
  { key: 'fertilizer', label: 'Phân bón', emoji: '🧪' },
  { key: 'soil', label: 'Đất trồng', emoji: '🪨' },
  { key: 'medicine', label: 'Thuốc', emoji: '💊' },
  { key: 'tool', label: 'Dụng cụ', emoji: '🔧' },
  { key: 'seed', label: 'Hạt giống', emoji: '🌾' },
  { key: 'pot', label: 'Chậu cây', emoji: '🪴' },
];

export const products: Product[] = [
  { id: 'p1', name: 'Phân NPK 20-20-20', emoji: '🧪', category: 'fertilizer', price: 85000, originalPrice: 120000, description: 'Phân bón đa dụng, phù hợp mọi loại cây', rating: 4.8, sold: 234 },
  { id: 'p2', name: 'Phân hữu cơ vi sinh', emoji: '🌱', category: 'fertilizer', price: 65000, description: 'Bổ sung vi sinh vật có lợi cho đất', rating: 4.6, sold: 189 },
  { id: 'p3', name: 'Đất trồng Premium', emoji: '🪨', category: 'soil', price: 45000, description: 'Hỗn hợp đất + xơ dừa + trấu hun', rating: 4.9, sold: 567 },
  { id: 'p4', name: 'Đất sạch Tribat', emoji: '🏔️', category: 'soil', price: 35000, description: 'Đất sạch giàu dinh dưỡng', rating: 4.5, sold: 423 },
  { id: 'p5', name: 'Thuốc trừ rệp sinh học', emoji: '🐛', category: 'medicine', price: 55000, description: 'An toàn, thân thiện môi trường', rating: 4.3, sold: 156 },
  { id: 'p6', name: 'Thuốc kích rễ B1', emoji: '💊', category: 'medicine', price: 30000, description: 'Kích thích ra rễ cho cây giâm cành', rating: 4.7, sold: 312 },
  { id: 'p7', name: 'Kéo cắt tỉa Nhật Bản', emoji: '✂️', category: 'tool', price: 185000, originalPrice: 250000, description: 'Thép không gỉ, sắc bén', rating: 4.9, sold: 98 },
  { id: 'p8', name: 'Bình xịt phun sương 2L', emoji: '🧴', category: 'tool', price: 75000, description: 'Phun sương mịn, bền bỉ', rating: 4.4, sold: 245 },
  { id: 'p9', name: 'Hạt giống Bạc Hà', emoji: '🌿', category: 'seed', price: 15000, description: 'Hạt giống nhập Mỹ, tỷ lệ nảy mầm 95%', rating: 4.6, sold: 678 },
  { id: 'p10', name: 'Hạt giống Hoa Hồng', emoji: '🌹', category: 'seed', price: 25000, description: 'Hồng Đà Lạt, nhiều màu', rating: 4.2, sold: 345 },
  { id: 'p11', name: 'Chậu sứ trắng cao cấp', emoji: '🏺', category: 'pot', price: 120000, originalPrice: 160000, description: 'Sứ trắng Bát Tràng, có lỗ thoát nước', rating: 4.8, sold: 178 },
  { id: 'p12', name: 'Chậu treo mây tre', emoji: '🪴', category: 'pot', price: 95000, description: 'Thủ công, phong cách Boho', rating: 4.7, sold: 145 },
];

export const bankOptions = [
  { id: 'momo', name: 'MoMo', color: '#A50064', icon: '📱', account: '0987654321', qrData: 'momo://pay?phone=0987654321' },
  { id: 'zalopay', name: 'ZaloPay', color: '#008FE5', icon: '💙', account: '0987654321', qrData: 'zalopay://pay?phone=0987654321' },
  { id: 'vietqr', name: 'VietQR - Vietcombank', color: '#006A4E', icon: '🏦', account: '1234567890', qrData: 'vietqr://transfer?bank=VCB&account=1234567890' },
  { id: 'vnpay', name: 'VNPay', color: '#E21F26', icon: '💳', account: '0987654321', qrData: 'vnpay://pay?phone=0987654321' },
];
