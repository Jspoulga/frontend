import React from 'react';

import {
  Box,
  Button,
  FormControl,
  InputBase,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';

import {
  TuneRounded,
  KeyboardArrowDownRounded,
  CategoryOutlined,
  SortRounded,
  CloseRounded,
} from '@mui/icons-material';

import { CATEGORIES } from '../../utils/constants';

function ProductFilters({
  category,
  setCategory,
  sort,
  setSort,
}) {
  const hasCategory = Boolean(category);
  const hasSort = sort !== 'default';
  const activeFiltersCount =
    Number(hasCategory) + Number(hasSort);

  const handleReset = () => {
    setCategory('');
    setSort('default');
  };

  const selectSx = {
    width: '100%',
    height: 52,
    borderRadius: '15px',
    bgcolor: 'var(--pv-surface)',
    border: '1px solid var(--pv-line)',
    px: 1.5,

    fontSize: '0.84rem',
    fontWeight: 650,
    color: 'var(--pv-ink)',

    transition:
      'border-color .25s ease, box-shadow .25s ease, background .25s ease',

    '&:hover': {
      borderColor: '#ec4899',
      bgcolor: '#fffafd',
    },

    '&.Mui-focused': {
      borderColor: '#ec4899',
      boxShadow:
        '0 0 0 4px rgba(236,72,153,.09)',
      bgcolor: 'var(--pv-surface)',
    },

    '& .MuiSelect-select': {
      display: 'flex',
      alignItems: 'center',
      minHeight: 'unset',
      py: 0,
      pr: 5,
    },

    '& .MuiSelect-icon': {
      color: '#ec4899',
      right: 13,
      fontSize: 22,
    },
  };

  const menuProps = {
    /* MUI 9 : Menu stylise son Paper via slotProps, plus via PaperProps. */
    slotProps: {
      paper: {
      sx: {
        mt: 1,
        borderRadius: '16px',
        border: '1px solid var(--pv-line)',
        boxShadow:
          '0 18px 50px rgba(0,0,0,0.12)',
        overflow: 'hidden',
        p: 0.6,

        '& .MuiMenuItem-root': {
          minHeight: 44,
          borderRadius: '11px',
          px: 1.5,
          my: 0.25,

          fontSize: '0.82rem',
          fontWeight: 600,
          color: 'var(--pv-ink)',

          transition:
            'background .2s ease, color .2s ease',

          '&:hover': {
            bgcolor: '#fff1f7',
            color: '#db2777',
          },

          '&.Mui-selected': {
            bgcolor: 'var(--pv-accent-soft)',
            color: '#db2777',
            fontWeight: 800,
          },

          '&.Mui-selected:hover': {
            bgcolor: 'var(--pv-accent-soft)',
          },
        },
        },
      },
    },
  };

  return (
    <Box
      sx={{
        width: '100%',
        mb: {
          xs: 3,
          md: 4,
        },
        animation: 'filtersEnter .45s ease both',
      }}
    >
      {/* Header */}
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
       
       
        spacing={2}
        sx={{ alignItems: {
          xs: 'flex-start',
          sm: 'center',
        }, justifyContent: 'space-between', 
          mb: {
            xs: 2,
            md: 2.5,
          },
        }}
      >
        <Stack
          direction="row"
         
          spacing={1.4} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              flexShrink: 0,
              borderRadius: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background:
                'linear-gradient(135deg, var(--pv-accent-soft), var(--pv-accent-soft))',
              color: '#db2777',
              border:
                '1px solid rgba(236,72,153,.10)',
            }}
          >
            <TuneRounded
              sx={{
                fontSize: 21,
              }}
            />
          </Box>

          <Box>
            <Stack
              direction="row"
             
              spacing={1} sx={{ alignItems: 'center' }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: '0.95rem',
                    md: '1rem',
                  },
                  fontWeight: 850,
                  color: 'var(--pv-ink)',
                  letterSpacing: '-0.02em',
                }}
              >
                Affiner votre recherche
              </Typography>

              {activeFiltersCount > 0 && (
                <Box
                  sx={{
                    minWidth: 22,
                    height: 22,
                    px: 0.7,
                    borderRadius: '999px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'var(--pv-band)',
                    color: '#fff',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                  }}
                >
                  {activeFiltersCount}
                </Box>
              )}
            </Stack>

            <Typography
              sx={{
                mt: 0.25,
                fontSize: {
                  xs: '0.72rem',
                  md: '0.76rem',
                },
                color: 'var(--pv-muted)',
                lineHeight: 1.5,
              }}
            >
              Trouvez exactement ce que vous cherchez.
            </Typography>
          </Box>
        </Stack>

        {/* Reset */}
        {activeFiltersCount > 0 && (
          <Button
            onClick={handleReset}
            startIcon={
              <CloseRounded
                sx={{
                  fontSize: '17px !important',
                }}
              />
            }
            sx={{
              minHeight: 38,
              px: 1.4,
              borderRadius: '11px',
              textTransform: 'none',
              fontSize: '0.75rem',
              fontWeight: 750,
              color: 'var(--pv-muted)',
              bgcolor: 'var(--pv-surface)',
              border:
                '1px solid var(--pv-line)',

              '&:hover': {
                bgcolor: 'var(--pv-band)',
                color: '#fff',
                borderColor: 'var(--pv-ink)',
              },
            }}
          >
            Réinitialiser
          </Button>
        )}
      </Stack>

      {/* Filters container */}
      <Box
        sx={{
          p: {
            xs: 1.2,
            sm: 1.5,
            md: 1.8,
          },
          borderRadius: {
            xs: '19px',
            md: '22px',
          },
          bgcolor: '#f1f1f3',
          border: '1px solid var(--pv-line)',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
            },
            gap: {
              xs: 1.2,
              sm: 1.4,
              md: 1.6,
            },
          }}
        >
          {/* Category */}
          <Box
            sx={{
              minWidth: 0,
              p: {
                xs: 1.2,
                md: 1.4,
              },
              borderRadius: '16px',
              bgcolor: 'var(--pv-surface)',
              border: hasCategory
                ? '1px solid rgba(236,72,153,.25)'
                : '1px solid var(--pv-line)',
              boxShadow: hasCategory
                ? '0 8px 25px rgba(236,72,153,.07)'
                : 'none',
              transition:
                'border-color .25s ease, box-shadow .25s ease',
            }}
          >
            <Stack
              direction="row"
             
              spacing={1}
              sx={{ alignItems: 'center', 
                mb: 0.9,
              }}
            >
              <CategoryOutlined
                sx={{
                  fontSize: 17,
                  color: hasCategory
                    ? '#ec4899'
                    : 'var(--pv-muted)',
                }}
              />

              <Typography
                sx={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  color: 'var(--pv-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Catégorie
              </Typography>

              {hasCategory && (
                <Box
                  sx={{
                    ml: 'auto',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: '#ec4899',
                  }}
                />
              )}
            </Stack>

            <FormControl
              fullWidth
              size="small"
            >
              <Select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                displayEmpty
                IconComponent={
                  KeyboardArrowDownRounded
                }
                input={<InputBase />}
                sx={selectSx}
                MenuProps={menuProps}
              >
                <MenuItem value="">
                  Toutes les catégories
                </MenuItem>

                {CATEGORIES.map(name => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Sort */}
          <Box
            sx={{
              minWidth: 0,
              p: {
                xs: 1.2,
                md: 1.4,
              },
              borderRadius: '16px',
              bgcolor: 'var(--pv-surface)',
              border: hasSort
                ? '1px solid rgba(236,72,153,.25)'
                : '1px solid var(--pv-line)',
              boxShadow: hasSort
                ? '0 8px 25px rgba(236,72,153,.07)'
                : 'none',
              transition:
                'border-color .25s ease, box-shadow .25s ease',
            }}
          >
            <Stack
              direction="row"
             
              spacing={1}
              sx={{ alignItems: 'center', 
                mb: 0.9,
              }}
            >
              <SortRounded
                sx={{
                  fontSize: 17,
                  color: hasSort
                    ? '#ec4899'
                    : 'var(--pv-muted)',
                }}
              />

              <Typography
                sx={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  color: 'var(--pv-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Trier par
              </Typography>

              {hasSort && (
                <Box
                  sx={{
                    ml: 'auto',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: '#ec4899',
                  }}
                />
              )}
            </Stack>

            <FormControl
              fullWidth
              size="small"
            >
              <Select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
                displayEmpty
                IconComponent={
                  KeyboardArrowDownRounded
                }
                input={<InputBase />}
                sx={selectSx}
                MenuProps={menuProps}
              >
                <MenuItem value="default">
                  Pertinence
                </MenuItem>

                <MenuItem value="price-low">
                  Prix : du moins cher au plus cher
                </MenuItem>

                <MenuItem value="price-high">
                  Prix : du plus cher au moins cher
                </MenuItem>

                <MenuItem value="rating">
                  Meilleures notes
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Active filters */}
        {activeFiltersCount > 0 && (
          <Stack
            direction="row"
           
            spacing={1}
            sx={{ alignItems: 'center', 
              mt: 1.2,
              px: 0.5,
              animation:
                'activeFiltersEnter .25s ease both',
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: '#ec4899',
                boxShadow:
                  '0 0 0 4px rgba(236,72,153,.10)',
              }}
            />

            <Typography
              sx={{
                fontSize: '0.7rem',
                fontWeight: 650,
                color: 'var(--pv-muted)',
              }}
            >
              {activeFiltersCount === 1
                ? '1 filtre actif'
                : `${activeFiltersCount} filtres actifs`}
            </Typography>
          </Stack>
        )}
      </Box>

      <style>
        {`
          @keyframes filtersEnter {
            from {
              opacity: 0;
              transform: translateY(8px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes activeFiltersEnter {
            from {
              opacity: 0;
              transform: translateY(-4px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
            }
          }
        `}
      </style>
    </Box>
  );
}

export default ProductFilters;