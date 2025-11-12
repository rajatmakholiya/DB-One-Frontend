import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiText, MotiView } from "moti";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

/* -------------------- SLIDE DATA -------------------- */
const slides = [
  {
    id: "1",
    title: "Discover Uttarakhand’s Majestic Peaks",
    subtitle:
      "Explore curated treks, from challenging climbs to serene nature walks — all within the breathtaking landscapes of the Himalayas.",
    image: require("../assets/images/trek/onboarding_1.png"),
  },
  {
    id: "2",
    title: "Trusted Trek Partners & Guides",
    subtitle:
      "Book your trek with verified local guides and trusted camp operators across Devbhoomi.",
    image: require("../assets/images/trek/onboarding_2.png"),
  },
  {
    id: "3",
    title: "Book Your Dream Trek",
    subtitle:
      "Compare routes, packages, and experiences — from weekend camps to summit expeditions.",
    image: require("../assets/images/trek/onboarding_3.png"),
  },
  {
    id: "4",
    title: "Experience Every Altitude",
    subtitle:
      "Embark through forests, meadows, and glaciers — crafted for explorers at every level.",
    image: require("../assets/images/trek/onboarding_4.png"),
  },
  {
    id: "5",
    title: "Begin Your Journey with Devbhoomi One",
    subtitle:
      "Start your trek or camping adventure with confidence — powered by local experts and real-time updates.",
    image: require("../assets/images/trek/onboarding_5.png"),
  },
];

/* -------------------- MAIN COMPONENT -------------------- */
export default function TrekOnboarding() {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const ref = useRef<FlatList>(null);

  const handleNext = () => {
    if (index < slides.length - 1) {
      ref.current?.scrollToIndex({ index: index + 1 });
    } else {
      router.replace("/(trek)/dashboard");
    }
  };

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setIndex(slideIndex);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        data={slides}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={handleScroll}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index: i }) => (
          <ImageBackground
            source={item.image}
            style={styles.image}
            resizeMode="cover"
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.1)"]}
              style={StyleSheet.absoluteFill}
            />

            <View style={styles.content}>
              <MotiView
                from={{ opacity: 0, translateY: 40 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 300, type: "timing", duration: 800 }}
              >
                <Text style={styles.title}>{item.title}</Text>
              </MotiView>

              <MotiText
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 500, type: "timing", duration: 800 }}
                style={styles.subtitle}
              >
                {item.subtitle}
              </MotiText>
            </View>
          </ImageBackground>
        )}
      />

      {/* -------------------- INDICATORS -------------------- */}
      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { opacity: i === index ? 1 : 0.4, width: i === index ? 20 : 8 },
              ]}
            />
          ))}
        </View>

        {/* -------------------- BUTTON -------------------- */}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {index === slides.length - 1 ? "Continue" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  image: { width, height, justifyContent: "flex-end" },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 160,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontFamily: "Poppins-SemiBold",
    lineHeight: 36,
  },
  subtitle: {
    color: "#E5E7EB",
    fontSize: 15,
    fontFamily: "Inter-Regular",
    marginTop: 10,
    lineHeight: 22,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    width,
    alignItems: "center",
  },
  indicatorContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginHorizontal: 4,
  },
  button: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 14,
    paddingHorizontal: 64,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
});
