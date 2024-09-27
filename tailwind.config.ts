import type { Config } from "tailwindcss"
import colors from 'tailwindcss/colors'

// 扁平化颜色调色板的辅助函数
const flattenColorPalette = (colors: Record<string, any> = {}): Record<string, string> => {
	return Object.entries(colors).flatMap(([color, values]) => {
	  if (typeof values === 'object') {
		return Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({
		  [color + (number === 'DEFAULT' ? '' : `-${number}`)]: hex
		}));
	  }
	  return [{ [color]: values }];
	}).reduce((acc, curr) => ({ ...acc, ...curr }), {});
  };
// const {
//   default: flattenColorPalette,
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// } = require("tailwindcss/lib/util/flattenColorPalette");
const config = {
  darkMode: ["class"],
  content: [
    // 指定需要处理的文件
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      // 容器配置
      // center: true,
      padding: {
        // 不同断点的内边距
        DEFAULT: '0rem',
        xs: '0rem',
        sm: '0rem',
        md: '2rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '2rem',
      },
      screens: {
        // 响应式断点设置
        'xs': '320px', // => @media (min-width: 320px){ ... }
        'sm': '575px', // => @media (min-width: 575px){ ... }
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        "2xl": "1440px",
      },
    },
    extend: {
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
        // 自定义动画关键帧
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          from: {
            "backgroundPosition": "0 0"
          },
          to: {
            "backgroundPosition": "-200% 0"
          }
        }
      },
      "loading": {
        // 加载动画的不透明度变化
        '0%': { opacity: "0" },
        '10%': { opacity: "0.1" },
        '20%': { opacity: "0.2" },
        '50%': { opacity: "0.5" },
        '70%': { opacity: "0.7" },
        '100%': { opacity: "1" },
      },
      animation: {
        // 自定义动画
        aurora: "aurora 60s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "loading-transition": "loading 1s ease-in-out",
        "shimmer": "shimmer 2s linear infinite"
      },
    },

    colors: {
      // 颜色配置
      // 默认颜色
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.gray,
      sky: colors.sky,
      black: colors.black,
      white: colors.white,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      slate: colors.slate,
      blue: colors.blue,
      neutral: colors.neutral,

      dark: {
        '1': "#161925",
        '2': "#1C1F2E",
      },

      primary: {
        '400': '#0e78f9'
      },

      secondary: {
        '400': '#252A41'
      },

      tertiare: {
        '400': '#ECF0FF'
      },

      meeting: '#FF742E',
      schedule: '#830EF9',
      recording: '#F9A90E',
    }
  },
  plugins: [
    require("tailwindcss-animate"), 
    addVariablesForColors,
  ],
} satisfies Config

// 为颜色添加CSS变量
function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config