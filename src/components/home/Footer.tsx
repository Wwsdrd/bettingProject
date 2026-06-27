import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BloomingBetLogo from "@/components/ui/BloomingBetLogo";

const BG = "#1C1F26";
const TEXT_MUTED = "#8893A6";
const TEXT_WHITE = "#FFFFFF";
const GREEN = "#159A42";
const BORDER = "#2E3348";

const bloomingBetLinks = [
  "About Us",
  "Terms & Conditions",
  "Privacy Policy",
  "Betting Rules",
  "Responsible Gambling",
];

const quickLinks: { label: string; green?: boolean }[] = [
  { label: "FAQ" },
  { label: "Sports" },
  { label: "Help" },
  { label: "Live Betting" },
  { label: "Contact Us" },
  { label: "Become an Agent", green: true },
];

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

const socialIcons: { name: IoniconsName; label: string }[] = [
  { name: "logo-twitter",   label: "X" },
  { name: "logo-facebook",  label: "Facebook" },
  { name: "logo-youtube",   label: "YouTube" },
  { name: "logo-instagram", label: "Instagram" },
  { name: "logo-linkedin",  label: "LinkedIn" },
  { name: "logo-tiktok",   label: "TikTok" },
];

export default function Footer() {
  return (
    <View style={{ backgroundColor: BG }}>
      <View style={{ paddingTop: 36, paddingHorizontal: 24, paddingBottom: 28 }}>

        {/* Logo */}
        <View style={{ alignItems: "center", marginBottom: 22 }}>
          <BloomingBetLogo />
        </View>

        {/* License text */}
        <Text
          style={{
            color: TEXT_MUTED,
            fontSize: 13,
            textAlign: "center",
            lineHeight: 21,
            marginBottom: 24,
          }}
        >
          Bloomingbet Limited, the provider of this website, operates under the
          Permit No: 000000 issued by the National Lottery Regulatory Commision
          Abuja.
        </Text>

        {/* 18+ badge + responsible gambling text */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 14,
            marginBottom: 30,
          }}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderWidth: 1.5,
              borderColor: "#E53935",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Text style={{ color: TEXT_MUTED, fontSize: 11, fontWeight: "800" }}>
              18+
            </Text>
          </View>
          <Text style={{ color: TEXT_MUTED, fontSize: 13, lineHeight: 20, flex: 1 }}>
            Age 18 and above only to register or play at Bloomingbet. Play
            Responsible
          </Text>
        </View>

        {/* Payment methods */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            marginBottom: 36,
          }}
        >
          {/* VISA */}
          <View
            style={{
              backgroundColor: "#1A3882",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 14,
                fontWeight: "900",
                fontStyle: "italic",
                letterSpacing: 0.5,
              }}
            >
              VISA
            </Text>
          </View>

          {/* Mastercard */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: "#EB001B",
              }}
            />
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: "#F79E1B",
                marginLeft: -10,
              }}
            />
          </View>

          {/* Bank */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Ionicons name="business-outline" size={18} color={TEXT_MUTED} />
            <Text style={{ color: TEXT_MUTED, fontSize: 13 }}>Bank</Text>
          </View>
        </View>

        {/* Two-column links */}
        <View style={{ flexDirection: "row", gap: 16, marginBottom: 36 }}>
          {/* BLOOMING BET column */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: TEXT_WHITE,
                fontSize: 13,
                fontWeight: "700",
                marginBottom: 16,
                letterSpacing: 0.3,
              }}
            >
              BLOOMING BET
            </Text>
            {bloomingBetLinks.map((link) => (
              <TouchableOpacity key={link} style={{ marginBottom: 13 }} activeOpacity={0.7}>
                <Text style={{ color: TEXT_MUTED, fontSize: 13 }}>{link}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* QUICK LINKS column */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: TEXT_WHITE,
                fontSize: 13,
                fontWeight: "700",
                marginBottom: 16,
                letterSpacing: 0.3,
              }}
            >
              QUICK LINKS
            </Text>
            {quickLinks.map((link) => (
              <TouchableOpacity key={link.label} style={{ marginBottom: 13 }} activeOpacity={0.7}>
                <Text
                  style={{
                    color: link.green ? GREEN : TEXT_MUTED,
                    fontSize: 13,
                  }}
                >
                  {link.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Connect With Us */}
        <Text
          style={{
            color: TEXT_WHITE,
            fontSize: 12,
            fontWeight: "700",
            textAlign: "center",
            letterSpacing: 1.5,
            marginBottom: 16,
          }}
        >
          CONNECT WITH US
        </Text>
        <Text
          style={{
            color: TEXT_MUTED,
            fontSize: 13,
            textAlign: "center",
            marginBottom: 6,
          }}
        >
          Telephone: +234 890 7864  222
        </Text>
        <Text
          style={{
            color: TEXT_MUTED,
            fontSize: 13,
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          Email: support@Bloomingbet.com
        </Text>

        {/* Social icons */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 20,
            marginBottom: 28,
          }}
        >
          {socialIcons.map((icon) => (
            <TouchableOpacity key={icon.label} activeOpacity={0.7}>
              <Ionicons name={icon.name} size={24} color={GREEN} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Divider */}
        <View
          style={{
            height: 1,
            backgroundColor: BORDER,
            marginBottom: 20,
          }}
        />

        {/* Copyright */}
        <Text style={{ color: TEXT_MUTED, fontSize: 12, textAlign: "center" }}>
          Copyright © 2025 Bloomingbet. All rights reserved.
        </Text>
      </View>
    </View>
  );
}
