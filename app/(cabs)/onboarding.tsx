import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { AnimatePresence, MotiText, MotiView } from "moti";
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

const slides = [
  {
    title: "Discover Rides in Devbhoomi",
    subtitle: "Explore scenic drives through Kumaon’s hidden trails.",
    image: require("../assets/images/cabs/onboarding_1.png"),
    textStyle: { color: "#ffffff", fontFamily: "Poppins-Bold", fontSize: 34 },
    anim: "fadeUp",
  },
  {
    title: "Book Your Way (Flexi, Full, Clustered)",
    subtitle: "Choose your travel mode — flexible, full-day or shared.",
    image: require("../assets/images/cabs/onboarding_2.png"),
    textStyle: {
      color: "#fffbe7",
      fontFamily: "Poppins-SemiBold",
      fontSize: 30,
    },
    anim: "slideInLeft",
  },
  {
    title: "Smart, Local, Trusted",
    subtitle: "Driven by locals, for locals — the heart of Kumaon.",
    image: require("../assets/images/cabs/onboarding_3.png"),
    textStyle: { color: "#ffebc2", fontFamily: "Poppins-Bold", fontSize: 32 },
    anim: "zoomIn",
  },
  {
    title: "Premium Travel Redefined",
    subtitle: "Luxury comfort meets mountain roads.",
    image: require("../assets/images/cabs/onboarding_4.png"),
    textStyle: { color: "#dfe9f3", fontFamily: "Poppins-Medium", fontSize: 31 },
    anim: "slideInRight",
  },
  {
    title: "Your Journey, Elevated",
    subtitle: "Begin your premium journey through the Himalayas.",
    image: require("../assets/images/cabs/onboarding_1.png"),
    textStyle: { color: "#fdfdfd", fontFamily: "Poppins-Bold", fontSize: 34 },
    anim: "rotateIn",
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleScroll = (event: any) => {
    Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
      useNativeDriver: false,
    })(event);
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setIndex(slideIndex);
  };

  const goNext = () => {
    if (index === slides.length - 1) {
      router.replace("/(cabs)/booking");
    } else {
      flatListRef.current?.scrollToIndex({ index: index + 1 });
      setIndex(index + 1);
    }
  };

  const renderAnimatedText = (item: any, active: boolean) => {
    if (!active) return null;

    const animations: Record<string, any> = {
      fadeUp: {
        from: { opacity: 0, translateY: 40 },
        animate: { opacity: 1, translateY: 0 },
      },
      slideInLeft: {
        from: { opacity: 0, translateX: -100 },
        animate: { opacity: 1, translateX: 0 },
      },
      slideInRight: {
        from: { opacity: 0, translateX: 100 },
        animate: { opacity: 1, translateX: 0 },
      },
      zoomIn: {
        from: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
      },
      rotateIn: {
        from: { opacity: 0, rotate: "-15deg", scale: 0.8 },
        animate: { opacity: 1, rotate: "0deg", scale: 1 },
      },
    };

    const anim = animations[item.anim] || animations.fadeUp;

    return (
      <MotiView
        from={anim.from}
        animate={anim.animate}
        transition={{ type: "timing", duration: 800 }}
        style={{ alignItems: "center" }}
      >
        <MotiText
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 150, duration: 600 }}
          style={[styles.title, item.textStyle, styles.textShadow]}
        >
          {item.title}
        </MotiText>

        <MotiText
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 300, duration: 500 }}
          style={[styles.subtitle, styles.textGlow]}
        >
          {item.subtitle}
        </MotiText>
      </MotiView>
    );
  };

  const renderItem = ({ item, index: itemIndex }: any) => {
    const inputRange = [
      (itemIndex - 1) * width,
      itemIndex * width,
      (itemIndex + 1) * width,
    ];

    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [-50, 0, 50],
    });
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
    });
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [1.05, 1, 1.05],
    });

    return (
      <Animated.View
        style={{
          width,
          height,
          transform: [{ translateX }, { scale }],
          opacity,
        }}
      >
        <ImageBackground
          source={item.image}
          style={styles.slide}
          resizeMode="cover"
        >
          {/* gradient overlay for readability */}
          <LinearGradient
            colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.6)", "rgba(0,0,0,0.8)"]}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.overlay} />
          <View style={styles.textContainer}>
            <AnimatePresence>
              {renderAnimatedText(item, index === itemIndex)}
            </AnimatePresence>
          </View>
        </ImageBackground>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { opacity: index === i ? 1 : 0.3, width: index === i ? 20 : 8 },
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={goNext}>
          <Text style={styles.buttonText}>
            {index === slides.length - 1 ? "Begin Your Ride" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  slide: {
    flex: 1,
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 25,
    zIndex: 2,
  },
  title: {
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 10,
    letterSpacing: 0.8,
  },
  subtitle: {
    color: "#f0f0f0",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  textShadow: {
    textShadowColor: "rgba(255, 255, 255, 0.6)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12,
  },
  textGlow: {
    textShadowColor: "rgba(255, 255, 255, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
  footer: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    alignItems: "center",
  },
  dots: {
    flexDirection: "row",
    marginBottom: 15,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderColor: "#fff",
    borderWidth: 1.5,
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
