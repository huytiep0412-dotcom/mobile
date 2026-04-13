import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, FlatList, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, BorderRadius, FontSize, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { products as allProducts, shopCategories, bankOptions, Product } from '@/constants/mockData';

interface CartItem { product: Product; qty: number; }

const formatPrice = (p: number) => p.toLocaleString('vi-VN') + ' ₫';

export default function ShopScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  const [category, setCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [selectedBank, setSelectedBank] = useState(bankOptions[0]);

  const filteredProducts = category === 'all' ? allProducts : allProducts.filter(p => p.category === category);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === productId);
      if (existing && existing.qty > 1) return prev.map(i => i.product.id === productId ? { ...i, qty: i.qty - 1 } : i);
      return prev.filter(i => i.product.id !== productId);
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) { Alert.alert('Giỏ hàng trống', 'Vui lòng thêm sản phẩm'); return; }
    setShowCart(false);
    setShowQR(true);
  };

  const handlePaymentDone = () => {
    setShowQR(false);
    setCart([]);
    Alert.alert('🎉 Đặt hàng thành công!', 'Đơn hàng của bạn đang được xử lý.\nCảm ơn bạn đã mua hàng!');
  };

  const renderProduct = ({ item: product }: { item: Product }) => (
    <Pressable style={[styles.productCard, { backgroundColor: colors.backgroundCard, borderColor: colors.borderLight }]}>
      <View style={[styles.productEmojiWrap, { backgroundColor: colors.backgroundInput }]}>
        <Text style={styles.productEmoji}>{product.emoji}</Text>
      </View>
      <Text style={[styles.productName, { color: colors.text }]} numberOfLines={2}>{product.name}</Text>
      <Text style={[styles.productDesc, { color: colors.textLight }]} numberOfLines={1}>{product.description}</Text>
      <View style={styles.productRating}>
        <Ionicons name="star" size={12} color="#FFB74D" />
        <Text style={[styles.ratingText, { color: colors.textSecondary }]}>{product.rating} ({product.sold})</Text>
      </View>
      <View style={styles.productPriceRow}>
        <View>
          <Text style={[styles.productPrice, { color: colors.tint }]}>{formatPrice(product.price)}</Text>
          {product.originalPrice && (
            <Text style={[styles.originalPrice, { color: colors.textLight }]}>{formatPrice(product.originalPrice)}</Text>
          )}
        </View>
        <Pressable
          onPress={() => addToCart(product)}
          style={[styles.addBtn, { backgroundColor: colors.tint }]}
        >
          <Ionicons name="add" size={18} color="#fff" />
        </Pressable>
      </View>
    </Pressable>
  );

  // QR code content rendered as text art pattern
  const renderQRCode = () => {
    const qrSize = 180;
    return (
      <View style={[styles.qrBox, { borderColor: colors.border }]}>
        <View style={[styles.qrInner, { backgroundColor: '#fff' }]}>
          {/* Simulated QR code pattern using blocks */}
          <View style={styles.qrPattern}>
            {Array.from({ length: 11 }).map((_, row) => (
              <View key={row} style={styles.qrRow}>
                {Array.from({ length: 11 }).map((_, col) => {
                  const isCorner = (row < 3 && col < 3) || (row < 3 && col > 7) || (row > 7 && col < 3);
                  const isCenter = row >= 4 && row <= 6 && col >= 4 && col <= 6;
                  const isRandom = Math.random() > 0.5;
                  const filled = isCorner || isCenter || (isRandom && !isCorner);
                  return (
                    <View key={col} style={[styles.qrBlock, { backgroundColor: filled ? '#000' : '#fff' }]} />
                  );
                })}
              </View>
            ))}
          </View>
          <Text style={styles.qrLabel}>QR Code</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.title, { color: colors.text }]}>🛒 Cửa hàng</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Vật tư vườn cây</Text>
          </View>
          <Pressable
            onPress={() => setShowCart(true)}
            style={[styles.cartBtn, { backgroundColor: colors.tint }]}
          >
            <Ionicons name="cart" size={20} color="#fff" />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
        {shopCategories.map(cat => (
          <Pressable
            key={cat.key}
            onPress={() => setCategory(cat.key)}
            style={[
              styles.catChip,
              {
                backgroundColor: category === cat.key ? colors.tint : colors.backgroundCard,
                borderColor: category === cat.key ? colors.tint : colors.border,
              },
            ]}
          >
            <Text style={styles.catEmoji}>{cat.emoji}</Text>
            <Text style={[styles.catText, { color: category === cat.key ? '#fff' : colors.textSecondary }]}>
              {cat.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Product Grid */}
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      />

      {/* Cart Bottom Bar */}
      {cartCount > 0 && (
        <Pressable
          onPress={() => setShowCart(true)}
          style={[styles.cartBar, { backgroundColor: colors.tint }]}
        >
          <View style={styles.cartBarLeft}>
            <Ionicons name="cart" size={20} color="#fff" />
            <Text style={styles.cartBarCount}>{cartCount} sản phẩm</Text>
          </View>
          <Text style={styles.cartBarTotal}>{formatPrice(cartTotal)}</Text>
        </Pressable>
      )}

      {/* Cart Modal */}
      <Modal visible={showCart} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeaderRow}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>🛒 Giỏ hàng</Text>
              <Pressable onPress={() => setShowCart(false)} style={[styles.closeBtn, { backgroundColor: colors.backgroundInput }]}>
                <Ionicons name="close" size={20} color={colors.textSecondary} />
              </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {cart.length === 0 ? (
                <View style={styles.emptyCart}>
                  <Text style={{ fontSize: 48 }}>🛒</Text>
                  <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Giỏ hàng trống</Text>
                </View>
              ) : (
                <>
                  {cart.map(item => (
                    <View key={item.product.id} style={[styles.cartItem, { borderColor: colors.borderLight }]}>
                      <Text style={styles.cartItemEmoji}>{item.product.emoji}</Text>
                      <View style={styles.cartItemInfo}>
                        <Text style={[styles.cartItemName, { color: colors.text }]} numberOfLines={1}>{item.product.name}</Text>
                        <Text style={[styles.cartItemPrice, { color: colors.tint }]}>{formatPrice(item.product.price)}</Text>
                      </View>
                      <View style={styles.qtyControls}>
                        <Pressable onPress={() => removeFromCart(item.product.id)} style={[styles.qtyBtn, { borderColor: colors.border }]}>
                          <Ionicons name="remove" size={16} color={colors.text} />
                        </Pressable>
                        <Text style={[styles.qtyText, { color: colors.text }]}>{item.qty}</Text>
                        <Pressable onPress={() => addToCart(item.product)} style={[styles.qtyBtn, { borderColor: colors.border }]}>
                          <Ionicons name="add" size={16} color={colors.text} />
                        </Pressable>
                      </View>
                    </View>
                  ))}
                  <View style={[styles.cartTotal, { borderColor: colors.borderLight }]}>
                    <Text style={[styles.cartTotalLabel, { color: colors.text }]}>Tổng cộng:</Text>
                    <Text style={[styles.cartTotalValue, { color: colors.tint }]}>{formatPrice(cartTotal)}</Text>
                  </View>
                  <Pressable style={[styles.checkoutBtn, { backgroundColor: colors.tint }]} onPress={handleCheckout}>
                    <Ionicons name="qr-code" size={20} color="#fff" />
                    <Text style={styles.checkoutText}>Thanh toán QR</Text>
                  </Pressable>
                </>
              )}
              <View style={{ height: 40 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* QR Payment Modal */}
      <Modal visible={showQR} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeaderRow}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>💳 Thanh toán QR</Text>
              <Pressable onPress={() => setShowQR(false)} style={[styles.closeBtn, { backgroundColor: colors.backgroundInput }]}>
                <Ionicons name="close" size={20} color={colors.textSecondary} />
              </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Amount */}
              <View style={[styles.amountCard, { backgroundColor: colors.tint }]}>
                <Text style={styles.amountLabel}>Số tiền thanh toán</Text>
                <Text style={styles.amountValue}>{formatPrice(cartTotal)}</Text>
                <Text style={styles.amountItems}>{cartCount} sản phẩm</Text>
              </View>

              {/* Bank Selection */}
              <Text style={[styles.formLabel, { color: colors.text }]}>Chọn phương thức</Text>
              <View style={styles.bankGrid}>
                {bankOptions.map(bank => (
                  <Pressable
                    key={bank.id}
                    onPress={() => setSelectedBank(bank)}
                    style={[
                      styles.bankOption,
                      {
                        backgroundColor: selectedBank.id === bank.id ? bank.color + '15' : colors.backgroundCard,
                        borderColor: selectedBank.id === bank.id ? bank.color : colors.borderLight,
                      },
                    ]}
                  >
                    <Text style={styles.bankIcon}>{bank.icon}</Text>
                    <Text style={[
                      styles.bankName,
                      { color: selectedBank.id === bank.id ? bank.color : colors.text },
                    ]} numberOfLines={1}>{bank.name}</Text>
                  </Pressable>
                ))}
              </View>

              {/* QR Code */}
              <View style={[styles.qrCard, { backgroundColor: colors.backgroundCard, borderColor: colors.borderLight }]}>
                <Text style={[styles.qrTitle, { color: colors.text }]}>Quét mã để thanh toán</Text>
                {renderQRCode()}
                <View style={styles.qrInfoRow}>
                  <View style={styles.qrInfoItem}>
                    <Text style={[styles.qrInfoLabel, { color: colors.textLight }]}>Tài khoản</Text>
                    <Text style={[styles.qrInfoValue, { color: colors.text }]}>{selectedBank.account}</Text>
                  </View>
                  <View style={styles.qrInfoItem}>
                    <Text style={[styles.qrInfoLabel, { color: colors.textLight }]}>Nội dung CK</Text>
                    <Text style={[styles.qrInfoValue, { color: colors.text }]}>VUON {Date.now().toString().slice(-6)}</Text>
                  </View>
                </View>
              </View>

              {/* Confirm */}
              <Pressable style={[styles.confirmBtn, { backgroundColor: colors.tint }]} onPress={handlePaymentDone}>
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <Text style={styles.confirmText}>Đã thanh toán xong</Text>
              </Pressable>
              <Pressable
                style={[styles.cancelBtn, { borderColor: colors.border }]}
                onPress={() => setShowQR(false)}
              >
                <Text style={[styles.cancelText, { color: colors.text }]}>Quay lại</Text>
              </Pressable>
              <View style={{ height: 40 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.md },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: FontSize.xxl, fontWeight: '700' },
  subtitle: { fontSize: FontSize.sm, marginTop: 2 },
  cartBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  cartBadge: { position: 'absolute', top: -2, right: -2, backgroundColor: '#FF5252', width: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  cartBadgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },

  // Categories
  catScroll: { paddingHorizontal: Spacing.xl, gap: Spacing.sm, marginBottom: Spacing.md },
  catChip: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 14, paddingVertical: 8, borderRadius: BorderRadius.full, borderWidth: 1 },
  catEmoji: { fontSize: 14 },
  catText: { fontSize: FontSize.sm, fontWeight: '600' },

  // Product Grid
  productList: { paddingHorizontal: Spacing.xl, paddingBottom: 80 },
  productRow: { gap: Spacing.md, marginBottom: Spacing.md },
  productCard: { flex: 1, borderRadius: BorderRadius.lg, borderWidth: 1, padding: Spacing.md },
  productEmojiWrap: { width: '100%', height: 80, borderRadius: BorderRadius.md, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm },
  productEmoji: { fontSize: 36 },
  productName: { fontSize: FontSize.md, fontWeight: '600', marginBottom: 3, minHeight: 38 },
  productDesc: { fontSize: FontSize.xs, marginBottom: Spacing.xs },
  productRating: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: Spacing.sm },
  ratingText: { fontSize: FontSize.xs },
  productPriceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  productPrice: { fontSize: FontSize.md, fontWeight: '700' },
  originalPrice: { fontSize: FontSize.xs, textDecorationLine: 'line-through' },
  addBtn: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },

  // Cart bottom bar
  cartBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.xl, paddingVertical: 14, borderTopLeftRadius: BorderRadius.xl, borderTopRightRadius: BorderRadius.xl },
  cartBarLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  cartBarCount: { color: '#fff', fontSize: FontSize.md, fontWeight: '600' },
  cartBarTotal: { color: '#fff', fontSize: FontSize.lg, fontWeight: '700' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: BorderRadius.xxl, borderTopRightRadius: BorderRadius.xxl, maxHeight: '92%', paddingHorizontal: Spacing.xl, paddingTop: Spacing.md },
  modalHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: '#ccc', alignSelf: 'center', marginBottom: Spacing.md },
  modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.lg },
  modalTitle: { fontSize: FontSize.xxl, fontWeight: '700' },
  closeBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },

  // Cart items
  emptyCart: { alignItems: 'center', paddingTop: 60, gap: Spacing.md },
  emptyText: { fontSize: FontSize.md },
  cartItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md, borderBottomWidth: 1, gap: Spacing.md },
  cartItemEmoji: { fontSize: 28 },
  cartItemInfo: { flex: 1 },
  cartItemName: { fontSize: FontSize.md, fontWeight: '600' },
  cartItemPrice: { fontSize: FontSize.sm, fontWeight: '600', marginTop: 2 },
  qtyControls: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  qtyBtn: { width: 30, height: 30, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  qtyText: { fontSize: FontSize.md, fontWeight: '700', minWidth: 20, textAlign: 'center' },
  cartTotal: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: Spacing.lg, borderTopWidth: 1, marginTop: Spacing.md },
  cartTotalLabel: { fontSize: FontSize.lg, fontWeight: '600' },
  cartTotalValue: { fontSize: FontSize.xl, fontWeight: '700' },
  checkoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, paddingVertical: 14, borderRadius: BorderRadius.md, marginTop: Spacing.md },
  checkoutText: { color: '#fff', fontSize: FontSize.md, fontWeight: '600' },

  // QR Payment
  amountCard: { alignItems: 'center', borderRadius: BorderRadius.lg, padding: Spacing.xl, marginBottom: Spacing.xl },
  amountLabel: { color: 'rgba(255,255,255,0.75)', fontSize: FontSize.sm },
  amountValue: { color: '#fff', fontSize: FontSize.xxxl, fontWeight: '700', marginVertical: Spacing.xs },
  amountItems: { color: 'rgba(255,255,255,0.6)', fontSize: FontSize.xs },
  formLabel: { fontSize: FontSize.md, fontWeight: '600', marginBottom: Spacing.sm },
  bankGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.xl },
  bankOption: { width: '48%', flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, padding: Spacing.md, borderRadius: BorderRadius.md, borderWidth: 1.5 },
  bankIcon: { fontSize: 22 },
  bankName: { fontSize: FontSize.sm, fontWeight: '600', flex: 1 },

  // QR Code
  qrCard: { alignItems: 'center', borderRadius: BorderRadius.lg, borderWidth: 1, padding: Spacing.xl, marginBottom: Spacing.xl },
  qrTitle: { fontSize: FontSize.md, fontWeight: '600', marginBottom: Spacing.lg },
  qrBox: { width: 200, height: 200, borderRadius: BorderRadius.md, borderWidth: 2, padding: 8, marginBottom: Spacing.lg },
  qrInner: { flex: 1, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  qrPattern: { gap: 2 },
  qrRow: { flexDirection: 'row', gap: 2 },
  qrBlock: { width: 14, height: 14, borderRadius: 1 },
  qrLabel: { fontSize: 10, color: '#999', marginTop: 6 },
  qrInfoRow: { width: '100%', gap: Spacing.md },
  qrInfoItem: { flexDirection: 'row', justifyContent: 'space-between' },
  qrInfoLabel: { fontSize: FontSize.sm },
  qrInfoValue: { fontSize: FontSize.sm, fontWeight: '600' },

  confirmBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, paddingVertical: 14, borderRadius: BorderRadius.md },
  confirmText: { color: '#fff', fontSize: FontSize.md, fontWeight: '600' },
  cancelBtn: { alignItems: 'center', paddingVertical: 14, borderRadius: BorderRadius.md, borderWidth: 1, marginTop: Spacing.md },
  cancelText: { fontSize: FontSize.md, fontWeight: '600' },
});
