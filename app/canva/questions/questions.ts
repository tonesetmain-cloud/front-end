export const onboardingQuestionsSelect = [
  {
    "How would you describe your brand’s style?": [
      "Modern",
      "Minimal",
      "Classic",
      "Bold",
      "Playful",
      "Elegant",
      "Rustic",
    ],
  },
  {
    "What emotion do you want your brand to evoke?": [
      "Trust",
      "Creativity",
      "Energy",
      "Luxury",
      "Calm",
      "Excitement",
    ],
  },
  {
    "Would you like a light, dark, or both color themes?": [
      "Light",
      "Dark",
      "Both",
    ],
  },
];

export const onboardingQuestionsTextFormat = [
  "Are there any colors you definitely want to include or avoid?",
  "What is the name of your business?",
  "What type of business or industry do you run?",
  "Who is your target audience?",
  "How would you describe the personality of your brand?",
];

export const advancedQuestions: string[] = [
  "What are the core values of your business?",
  "What is the main purpose of your branding?",
  "Are there any competitors or brands you admire?",
  "Do you have any specific geographic or cultural influences?",
  "Would you like your color palette to have accent or secondary tones?",
  "Do you want to differentiate from your competitors' colors?",
];

export const questionKeyMap: Record<string, string> = {
  "What is the name of your business?": "business_name",
  "What type of business or industry do you run?": "business_type",
  "Who is your target audience?": "target_audience",
  "How would you describe the personality of your brand?": "brand_personality",
  "How would you describe your brand’s style?": "brand_style",
  "What emotion do you want your brand to evoke?": "brand_emotion",
  "Are there any colors you definitely want to include or avoid?":
    "preferred_colors",
  "Would you like a light, dark, or both color themes?": "color_theme",
  "What are the core values of your business?": "core_values",
  "What is the main purpose of your branding?": "branding_purpose",
  "Are there any competitors or brands you admire?": "admired_competitors",
  "Do you have any specific geographic or cultural influences?":
    "geographic_influences",
  "Would you like your color palette to have accent or secondary tones?":
    "wants_secondary_colors",
  "Do you want to differentiate from your competitors' colors?":
    "differentiate_competitor_colors",
};
