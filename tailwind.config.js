/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#6366F1', // indigo-500
        'primary-50': '#EEF2FF', // indigo-50
        'primary-100': '#E0E7FF', // indigo-100
        'primary-200': '#C7D2FE', // indigo-200
        'primary-300': '#A5B4FC', // indigo-300
        'primary-400': '#818CF8', // indigo-400
        'primary-500': '#6366F1', // indigo-500
        'primary-600': '#4F46E5', // indigo-600
        'primary-700': '#4338CA', // indigo-700
        'primary-800': '#3730A3', // indigo-800
        'primary-900': '#312E81', // indigo-900
        'primary-foreground': '#FFFFFF', // white

        // Secondary Colors
        'secondary': '#8B5CF6', // violet-500
        'secondary-50': '#F5F3FF', // violet-50
        'secondary-100': '#EDE9FE', // violet-100
        'secondary-200': '#DDD6FE', // violet-200
        'secondary-300': '#C4B5FD', // violet-300
        'secondary-400': '#A78BFA', // violet-400
        'secondary-500': '#8B5CF6', // violet-500
        'secondary-600': '#7C3AED', // violet-600
        'secondary-700': '#6D28D9', // violet-700
        'secondary-800': '#5B21B6', // violet-800
        'secondary-900': '#4C1D95', // violet-900
        'secondary-foreground': '#FFFFFF', // white

        // Accent Colors
        'accent': '#06B6D4', // cyan-500
        'accent-50': '#ECFEFF', // cyan-50
        'accent-100': '#CFFAFE', // cyan-100
        'accent-200': '#A5F3FC', // cyan-200
        'accent-300': '#67E8F9', // cyan-300
        'accent-400': '#22D3EE', // cyan-400
        'accent-500': '#06B6D4', // cyan-500
        'accent-600': '#0891B2', // cyan-600
        'accent-700': '#0E7490', // cyan-700
        'accent-800': '#155E75', // cyan-800
        'accent-900': '#164E63', // cyan-900
        'accent-foreground': '#FFFFFF', // white

        // Background Colors
        'background': '#FAFBFC', // slate-50
        'surface': '#FFFFFF', // white
        'surface-secondary': '#F8FAFC', // slate-50

        // Text Colors
        'text-primary': '#1F2937', // gray-800
        'text-secondary': '#6B7280', // gray-500
        'text-muted': '#9CA3AF', // gray-400
        'text-inverse': '#FFFFFF', // white

        // Status Colors
        'success': '#10B981', // emerald-500
        'success-50': '#ECFDF5', // emerald-50
        'success-100': '#D1FAE5', // emerald-100
        'success-200': '#A7F3D0', // emerald-200
        'success-300': '#6EE7B7', // emerald-300
        'success-400': '#34D399', // emerald-400
        'success-500': '#10B981', // emerald-500
        'success-600': '#059669', // emerald-600
        'success-700': '#047857', // emerald-700
        'success-800': '#065F46', // emerald-800
        'success-900': '#064E3B', // emerald-900
        'success-foreground': '#FFFFFF', // white

        'warning': '#F59E0B', // amber-500
        'warning-50': '#FFFBEB', // amber-50
        'warning-100': '#FEF3C7', // amber-100
        'warning-200': '#FDE68A', // amber-200
        'warning-300': '#FCD34D', // amber-300
        'warning-400': '#FBBF24', // amber-400
        'warning-500': '#F59E0B', // amber-500
        'warning-600': '#D97706', // amber-600
        'warning-700': '#B45309', // amber-700
        'warning-800': '#92400E', // amber-800
        'warning-900': '#78350F', // amber-900
        'warning-foreground': '#FFFFFF', // white

        'error': '#EF4444', // red-500
        'error-50': '#FEF2F2', // red-50
        'error-100': '#FEE2E2', // red-100
        'error-200': '#FECACA', // red-200
        'error-300': '#FCA5A5', // red-300
        'error-400': '#F87171', // red-400
        'error-500': '#EF4444', // red-500
        'error-600': '#DC2626', // red-600
        'error-700': '#B91C1C', // red-700
        'error-800': '#991B1B', // red-800
        'error-900': '#7F1D1D', // red-900
        'error-foreground': '#FFFFFF', // white

        // Border Colors
        'border': '#E5E7EB', // gray-200
        'border-light': '#F3F4F6', // gray-100
        'border-dark': '#D1D5DB', // gray-300
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'Ubuntu Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
        'card': '8px',
        'button': '4px',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'DEFAULT': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'md': '0 4px 12px rgba(99, 102, 241, 0.1)',
        'lg': '0 8px 24px rgba(99, 102, 241, 0.15)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
        'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'elevation-2': '0 4px 12px rgba(99, 102, 241, 0.1)',
        'elevation-3': '0 8px 24px rgba(99, 102, 241, 0.15)',
        'primary': '0 4px 12px rgba(99, 102, 241, 0.15)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '240': '60rem',
      },
      zIndex: {
        '900': '900',
        '1000': '1000',
        '1100': '1100',
        '1200': '1200',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}