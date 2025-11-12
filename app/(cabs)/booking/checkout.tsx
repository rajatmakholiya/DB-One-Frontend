import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function SecurePaymentScreen() {
  const insets = useSafeAreaInsets();
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("full");
  const [selectedMethod, setSelectedMethod] = useState("UPI");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const paymentOptions = [
    {
      id: "full",
      title: "Pay Full Amount",
      desc: "Complete payment now",
      amount: 210,
    },
    {
      id: "half",
      title: "Pay Half Deposit",
      desc: "Pay remaining at pickup",
      amount: 105,
    },
    {
      id: "pickup",
      title: "Pay at Pickup",
      desc: "Cash payment to driver",
      amount: 0,
    },
  ];

  const paymentMethods = [
    { id: "UPI", title: "UPI", desc: "Pay with any UPI app", tag: "Instant" },
    {
      id: "Card",
      title: "Card",
      desc: "Credit/Debit cards",
      tag: "Instant",
    },
    {
      id: "Wallet",
      title: "Wallet",
      desc: "Digital wallet balance",
      tag: "Instant",
    },
    {
      id: "Cash",
      title: "Cash",
      desc: "Pay driver directly",
    },
  ];

  const amountToPay =
    paymentOptions.find((p) => p.id === selectedPaymentOption)?.amount || 0;

  const handlePayment = () => {
    setIsProcessing(true);
    // simulate network payment confirmation
    setTimeout(() => {
      setIsProcessing(false);
      router.push("/(cabs)/booking/track-driver");
    }, 2500);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <View style={styles.headerCopy}>
          <Text style={styles.headerTitle}>Secure Payment</Text>
          <Text style={styles.headerSub}>
            Your money stays protected with escrow-backed checkout
          </Text>
        </View>
        <View style={styles.headerBadge}>
          <Ionicons name="lock-closed-outline" size={16} color="#118a24" />
          <Text style={styles.headerBadgeText}>Protected</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom + 200, 240),
        }}
      >
        <View style={styles.block}>
          <View style={styles.blockHeader}>
            <Ionicons name="card-outline" size={18} color="#1E90FF" />
            <Text style={styles.blockTitle}>Payment Options</Text>
          </View>
          {paymentOptions.map((opt, i) => {
            const selected = selectedPaymentOption === opt.id;
            return (
              <MotiView
                key={opt.id}
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: i * 90 }}
              >
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={[
                    styles.optionCard,
                    selected && styles.optionCardSelected,
                  ]}
                  onPress={() => setSelectedPaymentOption(opt.id)}
                >
                  <View style={styles.optionLeft}>
                    <View style={styles.optionRadioOuter}>
                      {selected && <View style={styles.optionRadioInner} />}
                    </View>
                    <View style={styles.optionCopy}>
                      <Text style={styles.optionTitle}>{opt.title}</Text>
                      <Text style={styles.optionDesc}>{opt.desc}</Text>
                    </View>
                  </View>
                  <Text style={styles.optionAmount}>₹{opt.amount}</Text>
                </TouchableOpacity>
              </MotiView>
            );
          })}
        </View>

        <View style={[styles.block, { marginTop: 22 }]}>
          <View style={styles.blockHeader}>
            <Ionicons name="wallet-outline" size={18} color="#1E90FF" />
            <Text style={styles.blockTitle}>Choose Payment Method</Text>
          </View>
          {paymentMethods.map((m, i) => {
            const selected = selectedMethod === m.id;
            return (
              <MotiView
                key={m.id}
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: i * 80 }}
              >
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={[
                    styles.methodCard,
                    selected && styles.methodCardSelected,
                  ]}
                  onPress={() => setSelectedMethod(m.id)}
                >
                  <View style={styles.methodLeft}>
                    <View
                      style={[
                        styles.methodIcon,
                        selected && styles.methodIconActive,
                      ]}
                    >
                      <Ionicons
                        name={
                          m.id === "UPI"
                            ? "phone-portrait-outline"
                            : m.id === "Card"
                            ? "card-outline"
                            : m.id === "Wallet"
                            ? "wallet-outline"
                            : "cash-outline"
                        }
                        size={18}
                        color={selected ? "#1E90FF" : "#4a5a87"}
                      />
                    </View>
                    <View style={styles.methodCopy}>
                      <Text style={styles.methodTitle}>{m.title}</Text>
                      <Text style={styles.methodDesc}>{m.desc}</Text>
                    </View>
                  </View>
                  {m.tag && (
                    <View style={styles.tagBadge}>
                      <Text style={styles.tagText}>{m.tag}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </MotiView>
            );
          })}
        </View>

        <View style={[styles.block, styles.trustBlock]}>
          <View style={styles.blockHeader}>
            <Ionicons
              name="shield-checkmark-outline"
              size={18}
              color="#118a24"
            />
            <Text style={styles.blockTitle}>Security & Trust</Text>
          </View>
          <View style={styles.trustGrid}>
            <View style={styles.trustItem}>
              <View style={[styles.trustIcon, styles.trustIconGreen]}>
                <Ionicons
                  name="lock-closed-outline"
                  size={16}
                  color="#118a24"
                />
              </View>
              <Text style={styles.trustTitle}>SSL Encrypted</Text>
              <Text style={styles.trustDesc}>Bank-level security</Text>
            </View>
            <View style={styles.trustItem}>
              <View style={[styles.trustIcon, styles.trustIconBlue]}>
                <Ionicons
                  name="checkmark-done-outline"
                  size={16}
                  color="#1E90FF"
                />
              </View>
              <Text style={styles.trustTitle}>PCI Compliant</Text>
              <Text style={styles.trustDesc}>Secure payments</Text>
            </View>
            <View style={styles.trustItem}>
              <View style={[styles.trustIcon, styles.trustIconOrange]}>
                <Ionicons
                  name="shield-half-outline"
                  size={16}
                  color="#E46C1E"
                />
              </View>
              <Text style={styles.trustTitle}>Escrow Protected</Text>
              <Text style={styles.trustDesc}>Money held safely</Text>
            </View>
            <View style={styles.trustItem}>
              <View style={[styles.trustIcon, styles.trustIconPurple]}>
                <Ionicons name="ribbon-outline" size={16} color="#8751e8" />
              </View>
              <Text style={styles.trustTitle}>Zero Fraud</Text>
              <Text style={styles.trustDesc}>100% guarantee</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View
        style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}
      >
        <View style={styles.footerRow}>
          <View>
            <Text style={styles.footerLabel}>Pay Now</Text>
            <Text style={styles.footerTotal}>₹{amountToPay}</Text>
          </View>
          <View style={styles.footerBadge}>
            <Ionicons
              name="shield-checkmark-outline"
              size={14}
              color="#118a24"
            />
            <Text style={styles.footerBadgeText}>Secure</Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.88}
          style={styles.footerAction}
          onPress={handlePayment}
          disabled={isProcessing}
        >
          <LinearGradient
            colors={
              isProcessing ? ["#b0b0b0", "#c0c0c0"] : ["#8fd3f4", "#84fab0"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.payBtn}
          >
            {isProcessing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.payBtnText}>Pay Securely 🔒</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.footerNote}>
          By proceeding, you agree to our terms and privacy policy
        </Text>
      </View>
      {/* Payment Loader Modal */}
      <Modal visible={isProcessing} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "timing", duration: 400 }}
            style={styles.modalContent}
          >
            <ActivityIndicator size="large" color="#1E90FF" />
            <Text style={styles.modalText}>Confirming your payment...</Text>
            <Text style={styles.modalSub}>Please don’t close this window</Text>
          </MotiView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f8ff", paddingHorizontal: 24 },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  backBtn: {
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e8ff",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  headerCopy: { flex: 1, marginLeft: 12 },
  headerTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 22,
    color: "#09102b",
  },
  headerSub: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#5a6487",
    marginTop: 4,
    lineHeight: 19,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  modalText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#0f1c3f",
    marginTop: 16,
  },
  modalSub: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#5a6487",
    marginTop: 4,
  },

  headerBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#e7f6ee",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  headerBadgeText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#118a24",
  },

  block: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e8ebff",
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 5,
  },
  blockHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 18,
  },
  blockTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#0f1c3f",
  },

  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#edf0ff",
    backgroundColor: "#f9faff",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  optionCardSelected: {
    borderColor: "#1E90FF",
    backgroundColor: "#eef5ff",
    shadowColor: "#1E90FF",
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  optionLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  optionRadioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#1E90FF",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  optionRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1E90FF",
  },
  optionCopy: { flexShrink: 1 },
  optionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#0f1c3f",
  },
  optionDesc: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#5a6487",
    marginTop: 4,
  },
  optionAmount: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#1E90FF",
  },

  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#edf0ff",
    backgroundColor: "#f9faff",
    marginBottom: 12,
  },
  methodCardSelected: {
    borderColor: "#1E90FF",
    backgroundColor: "#eef5ff",
    shadowColor: "#1E90FF",
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  methodLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  methodIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#eef2ff",
    alignItems: "center",
    justifyContent: "center",
  },
  methodIconActive: { backgroundColor: "#e0ecff" },
  methodCopy: { flexShrink: 1 },
  methodTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#0f1c3f",
  },
  methodDesc: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#5a6487",
    marginTop: 2,
  },
  tagBadge: {
    backgroundColor: "#eef2ff",
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  tagText: {
    color: "#1E90FF",
    fontSize: 11,
    fontFamily: "Poppins-Medium",
  },

  trustBlock: { marginTop: 22 },
  trustGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginTop: 8,
  },
  trustItem: {
    width: "47%",
    backgroundColor: "#f9faff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#edf0ff",
    paddingVertical: 18,
    alignItems: "center",
    gap: 6,
  },
  trustIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  trustIconGreen: { backgroundColor: "#e7f6ee" },
  trustIconBlue: { backgroundColor: "#e4f0ff" },
  trustIconOrange: { backgroundColor: "#fff2e4" },
  trustIconPurple: { backgroundColor: "#f1e4ff" },
  trustTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 13,
    color: "#0f1c3f",
  },
  trustDesc: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#5a6487",
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e5e8ff",
    paddingTop: 16,
    alignItems: "center",
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width - 48,
    alignItems: "center",
  },
  footerLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#5a6487",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  footerTotal: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 22,
    color: "#0f1c3f",
    marginTop: 4,
  },
  footerBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#e7f6ee",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  footerBadgeText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#118a24",
  },
  footerAction: {
    width: width - 48,
    borderRadius: 22,
    marginTop: 16,
  },
  payBtn: {
    width: width - 48,
    borderRadius: 22,
    paddingVertical: 16,
    alignItems: "center",
  },
  payBtnText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  footerNote: {
    fontSize: 11,
    color: "#7b839f",
    fontFamily: "Poppins-Regular",
    marginTop: 12,
    textAlign: "center",
  },
});
