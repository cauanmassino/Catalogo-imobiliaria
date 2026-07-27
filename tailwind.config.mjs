import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        surface2: 'var(--color-surface-2)',
        mist: 'var(--color-border)',
        slate: 'var(--color-text-muted)',
        ink: 'var(--color-text)',
        brass: 'var(--color-primary)',
        'brass-dark': 'var(--color-primary-hover)',
        'brass-soft': 'var(--color-primary-highlight)',
        forest: 'var(--color-success)',
        'forest-soft': 'var(--color-success-highlight)',
      },
      fontFamily: {
        sans: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
        display: ['var(--font-display)', ...defaultTheme.fontFamily.serif],
        mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
      },
      boxShadow: {
        soft: 'var(--shadow-sm)',
        mid: 'var(--shadow-md)',
        lift: 'var(--shadow-lg)',
      },
      borderRadius: {
        xl2: '1.5rem',
        xl3: '2rem',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at top right, color-mix(in oklch, var(--color-primary) 20%, transparent), transparent 55%)',
        'surface-noise':
          'linear-gradient(transparent, transparent)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floatSoft: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s ease-in-out infinite',
        floatSoft: 'floatSoft 6s ease-in-out infinite',
      },
      maxWidth: {
        '8xl': '90rem',
      },
    },
  },
  plugins: [],
};