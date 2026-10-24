function buildComponents(palette) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 18px',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          /* Sur fond sombre, une ombre portée ne se voit pas : c'est un
             filet clair qui détache la carte de l'arrière-plan. */
          boxShadow:
            palette.mode === 'dark'
              ? '0 4px 20px rgba(0, 0, 0, 0.45)'
              : '0 4px 20px rgba(15, 23, 42, 0.06)',
          border:
            palette.mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.07)'
              : '1px solid transparent',
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },

      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  };
}

export default buildComponents;