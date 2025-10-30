export type projects = {
  id?: string;
  user_id: string;
  business_name: string;
  business_type: string;
  target_audience: string;
  brand_personality: string;
  brand_style: string;
  brand_emotion: string;
  preferred_colors: string;
  color_theme: string;
  core_values: string;
  branding_purpose: string;
  admired_competitors: string;
  geographic_influences: string;
  wants_secondary_colors: boolean;
  differentiate_competitor_colors: string;
};

export type UIElementsAttributes = {
  id?: string;
  user_id?: string;
  business_details_id: string;
  light_theme_colors: string[];
  dark_theme_colors: string[];
  accent_colors: string[];
  fonts: {
    h1: {
      fontFamily: string;
      fontWeight: string;
      fontSize: string;
      lineHeight: string;
    };
    h2: {
      fontFamily: string;
      fontWeight: string;
      fontSize: string;
      lineHeight: string;
    };
    h3: {
      fontFamily: string;
      fontWeight: string;
      fontSize: string;
      lineHeight: string;
    };
    h4: {
      fontFamily: string;
      fontWeight: string;
      fontSize: string;
      lineHeight: string;
    };
    h5: {
      fontFamily: string;
      fontWeight: string;
      fontSize: string;
      lineHeight: string;
    };
    h6: {
      fontFamily: string;
      fontWeight: string;
      fontSize: string;
      lineHeight: string;
    };
    p: {
      fontFamily: string;
      fontWeight: string;
      fontSize: string;
      lineHeight: string;
    };
  };
  user_flow: {
    nodes_data: { id: string; type: string; label: string }[];
    edges_data: { id: string; source: string; target: string; label: string }[];
  };
  version?: number;
};
