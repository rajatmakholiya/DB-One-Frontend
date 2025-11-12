import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const data = [
  {
    id: "1",
    title: "Welcome to KumaonBazaar",
    desc: "Discover the heart of Kumaon through stories, community, and unique, handcrafted goods.",
    image: require("../assets/images/onboarding/onboarding_1.png"),
  },
  {
    id: "2",
    title: "Discover Kumaon’s Culture",
    desc: "Every product tells a story, connecting you to artisans and traditions.",
    image: require("../assets/images/onboarding/onboarding_2.png"),
  },
  {
    id: "3",
    title: "Join the Kumaoni Circles",
    desc: "Connect with fellow enthusiasts to share recipes, rituals, and culture.",
    image: require("../assets/images/onboarding/onboarding_3.png"),
  },
  {
    id: "4",
    title: "Support Local Artisans",
    desc: "Your purchases empower local creators and preserve cultural heritage.",
    image: require("../assets/images/onboarding/onboarding_4.png"),
  },
];

const OnboardingCard = ({ item }: any) => (
  <View style={styles.card}>
    <ImageBackground source={item.image} style={styles.image}>
      <LinearGradient
        colors={[
          "rgba(255,255,255,0)",
          "rgba(255,255,255,0.4)",
          "rgba(255,255,255,0.8)",
        ]}
        style={styles.overlay}
      />
      <View style={styles.textBox}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
      </View>
    </ImageBackground>
  </View>
);

export default function OnboardingScreen() {
  const [current, setCurrent] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (current < data.length - 1)
      flatListRef.current?.scrollToIndex({ index: current + 1 });
  };

  const handleSkip = () => {
    flatListRef.current?.scrollToIndex({ index: data.length - 1 });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrent(index);
        }}
        renderItem={({ item }) => <OnboardingCard item={item} />}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {data.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 20, 8],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={[styles.dot, { width: dotWidth }]}
              />
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={current === data.length - 1 ? () => {} : handleNext}
        >
          <Text style={styles.buttonText}>
            {current === data.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>

        {current < data.length - 1 && (
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { width, height },
  image: { flex: 1, justifyContent: "flex-end" },
  overlay: { ...StyleSheet.absoluteFillObject },
  textBox: {
    padding: 30,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)", // previously 0.8 or solid white
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 160,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    color: "#222",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  desc: {
    fontSize: 16,
    color: "#444",
    marginTop: 10,
    textAlign: "center",
    fontWeight: 700,
  },
  footer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E46C1E",
    marginHorizontal: 4,
  },
  button: {
    backgroundColor: "#E46C1E",
    borderRadius: 25,
    width: "60%",
    textAlign: "center",
    alignSelf: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
  skip: { color: "#888", marginTop: 10, fontSize: 15 },
});
