import { getCountryOptions } from '@/constants/countries';
import { KeyboardArrowDown as KeyboardArrowDownIcon, Public as PublicIcon, Search as SearchIcon } from '@mui/icons-material';
import { Box, Chip, ClickAwayListener, InputLabel, TextField, Typography } from '@mui/material';
import React, { useCallback, useMemo, useRef, useState } from 'react';

interface CountrySelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showFlags?: boolean;
  showFlagsInSelected?: boolean; // Control flag display in selected field separately
  showRegions?: boolean;
  borderColor?: string;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  label,
  value,
  onChange,
  error = '',
  required = false,
  placeholder = 'Select a country',
  disabled = false,
  className = '',
  showFlags = true,
  showFlagsInSelected = true, // Default to true for backward compatibility
  showRegions = false,
  borderColor = '#ced4da',
}) => {

  const allCountries = useMemo(() => getCountryOptions(), []);


  const [internalValue, setInternalValue] = useState(value ?? '');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const isInternalUpdate = useRef(false);


  React.useEffect(() => {
    if (!isInternalUpdate.current && value !== internalValue) {
      setInternalValue(value ?? '');
    }
    isInternalUpdate.current = false;
  }, [value, internalValue]);


  const selectedCountry = useMemo(() => {
    if (!internalValue) return undefined;
    return allCountries.find(country => country.value.toUpperCase() === internalValue.toUpperCase());
  }, [allCountries, internalValue]);


  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) {
      return allCountries;
    }

    const query = searchQuery.toLowerCase();
    return allCountries.filter(country =>
      country.label.toLowerCase().includes(query) ||
      country.value.toLowerCase().includes(query)
    );
  }, [allCountries, searchQuery]);

  const handleCountryChange = useCallback((event: any) => {
    const selectedValue = event.target.value ?? '';
    isInternalUpdate.current = true;
    setInternalValue(selectedValue);
    onChange(selectedValue);
    setIsOpen(false);
    setSearchQuery('');
  }, [onChange]);


  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);


  const handleDropdownToggle = useCallback(() => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen]);


  const renderValue = useCallback((selected: string) => {
    if (!selected || selected === '') {
      return (
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          height: '23px',
          lineHeight: '23px'
        }}>
          <PublicIcon sx={{ color: '#9ca3af', fontSize: '1.25rem' }} />
          <Typography
            className="font-neue-regular"
            sx={{
              fontSize: '0.875rem',
              color: '#9ca3af',
              lineHeight: '23px',
            }}
          >
            {placeholder}
          </Typography>
        </Box>
      );
    }

    const country = selected ? allCountries.find(c => c.value.toUpperCase() === selected.toUpperCase()) : undefined;

    // Always show flag if showFlagsInSelected is true and country is found
    const shouldShowFlag = showFlagsInSelected && showFlags && country;

    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        height: '23px',
        lineHeight: '23px'
      }}>
        {shouldShowFlag && country && (
          <Box
            component="span"
            sx={{
              lineHeight: '23px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '24px',
              width: '24px',
              height: '18px',
              flexShrink: 0,
            }}
            role="img"
            aria-label={country.label || 'Country flag'}
            title={country.label || ''}
          >
            {country.flagImageUrl ? (
              <Box
                component="img"
                src={country.flagImageUrl}
                alt={country.label || 'Country flag'}
                sx={{
                  width: '24px',
                  height: '18px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : country.flag ? (
              <span style={{ fontSize: '1.25rem' }}>{country.flag}</span>
            ) : null}
          </Box>
        )}
        <Typography
          className="font-neue-regular"
          sx={{
            fontSize: '0.875rem',
            color: '#374151',
            lineHeight: '23px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {country?.label || selected}
        </Typography>
      </Box>
    );
  }, [allCountries, placeholder, showFlags, showFlagsInSelected]);

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <Box className={`w-full ${className}`} sx={{ position: 'relative', margin: 0, padding: 0 }}>
        {/* Label */}
        {label && (
          <InputLabel
            className="font-neue-medium"
            sx={{
              color: error ? '#ef4444' : '#374151',
              fontSize: '0.875rem',
              fontWeight: 500,
              marginBottom: '4px',
              display: 'block',
            }}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </InputLabel>
        )}

        {/* Custom Dropdown Trigger */}
        <Box
          onClick={handleDropdownToggle}
          sx={{
            width: '100%',
            padding: '7px 0px 7px 16px',
            minHeight: '37px',
            height: '37px',
            border: `1px solid ${error ? '#ef4444' : borderColor}`,
            borderRadius: '6px',
            backgroundColor: disabled ? '#f3f4f6' : '#f9fafb',
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            '&:hover': {
              borderColor: error ? '#ef4444' : disabled ? borderColor : '#9ca3af',
            },
            '&:focus-within': {
              borderColor: error ? '#ef4444' : '#000000',
              outline: 'none',
            },
          }}
        >
          <Box sx={{ flex: 1 }}>
            {renderValue(internalValue)}
          </Box>
          <KeyboardArrowDownIcon
            sx={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              color: '#9ca3af !important',
              fontSize: '1.25rem',
              transition: 'transform 0.2s ease-in-out',
              flexShrink: 0,
              '& path': {
                fill: '#9ca3af !important'
              }
            }}
          />
        </Box>

        {/* Custom Dropdown Menu */}
        {isOpen && (
          <Box
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 1000,
              backgroundColor: 'white',
              border: `1px solid ${borderColor}`,
              borderRadius: '6px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              maxHeight: '300px',
              overflow: 'hidden',
            }}
          >
            {/* Search Input */}
            <Box sx={{ p: 1, borderBottom: '1px solid #e5e7eb' }}>
              <TextField
                fullWidth
                placeholder="Search countries..."
                value={searchQuery}
                onChange={handleSearchChange}
                size="small"
                autoFocus
                className="font-neue-regular"
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: '#9ca3af', mr: 1, fontSize: '1rem' }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontSize: '0.875rem',
                    fontFamily: 'inherit',
                    '& input': {
                      fontFamily: 'inherit',
                    },
                    '& fieldset': {
                      borderColor: borderColor,
                    },
                    '&:hover fieldset': {
                      borderColor: '#9ca3af',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#000000',
                    },
                  },
                }}
              />
            </Box>

            {/* Country List */}
            <Box sx={{ maxHeight: '250px', overflow: 'auto' }}>
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <Box
                    key={country.value}
                    onClick={() => {
                      isInternalUpdate.current = true;
                      setInternalValue(country.value);
                      onChange(country.value);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      py: 1.5,
                      px: 2,
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#f3f4f6',
                      },
                    }}
                  >
                    {showFlags && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: '24px',
                          width: '24px',
                          height: '18px',
                          flexShrink: 0,
                        }}
                      >
                        {country.flagImageUrl ? (
                          <Box
                            component="img"
                            src={country.flagImageUrl}
                            alt={country.label || 'Country flag'}
                            sx={{
                              width: '24px',
                              height: '18px',
                              objectFit: 'cover',
                              display: 'block',
                            }}
                          />
                        ) : country.flag ? (
                          <span style={{ fontSize: '1.25rem' }}>{country.flag}</span>
                        ) : null}
                      </Box>
                    )}
                    <Typography
                      className="font-neue-regular"
                      sx={{
                        flex: 1,
                        fontSize: '0.875rem',
                        color: '#374151',
                        display: 'flex',
                        alignItems: 'center',
                        lineHeight: '1.5',
                      }}
                    >
                      {country.label}
                    </Typography>
                    {showRegions && (
                      <Chip
                        label={country.region}
                        size="small"
                        sx={{
                          fontSize: '0.75rem',
                          height: '20px',
                          backgroundColor: '#e5e7eb',
                          color: '#6b7280',
                        }}
                      />
                    )}
                  </Box>
                ))
              ) : (
                <Box
                  sx={{
                    py: 1.5,
                    px: 2,
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    className="font-neue-regular"
                    sx={{
                      fontSize: '0.875rem',
                      color: '#9ca3af',
                      fontStyle: 'italic',
                    }}
                  >
                    No countries found
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}

        {/* Error Message */}
        {error && (
          <Typography
            className="font-neue-regular"
            sx={{
              mt: 1,
              fontSize: '0.75rem',
              color: '#ef4444',
            }}
          >
            {error}
          </Typography>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default CountrySelector;