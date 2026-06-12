import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Paper,
  Slider,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import { FilterState } from '../../types/landing-page';
import CountrySelector from '../General/form/countrySelector';
import { CustomButton } from '../General/ui/custom-button';




export const
  FilterSidebar: React.FC<{
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    onApplyFilters?: () => void;
    onResetFilters?: () => void;
  }> = ({ filters, onFiltersChange, onApplyFilters, onResetFilters }) => {
    const categories = ['Fintech', 'Agriculture', 'Healthcare', 'Real Estate', 'Logistics', 'Energy', 'Manufacturing', 'Hospitality'];
    const roiRanges = ['10 - 15%', '15 - 20%', '20 - 25%', '25% +'];

    const handleCategoryChange = (category: string, checked: boolean) => {
      const newCategories = checked
        ? [...filters.categories, category]
        : filters.categories.filter(c => c !== category);

      onFiltersChange({ ...filters, categories: newCategories });
    };

    const handleROIChange = (roi: string, checked: boolean) => {
      const newROI = checked
        ? [...filters.expectedROI, roi]
        : filters.expectedROI.filter(r => r !== roi);

      onFiltersChange({ ...filters, expectedROI: newROI });
    };

    const handleComplianceChange = (compliance: string, checked: boolean) => {
      const currentCompliance = filters.compliance ?? [];
      const newCompliance = checked
        ? [...currentCompliance, compliance]
        : currentCompliance.filter(c => c !== compliance);

      onFiltersChange({ ...filters, compliance: newCompliance });
    };

    const handleResetFilters = () => {
      const resetFilters: FilterState = {
        categories: [],
        investmentAmount: [1000, 2000000000],
        location: '',
        compliance: [],
        expectedROI: [],
        search: ''
      };
      // Update filter state first
      onFiltersChange(resetFilters);
      // Then call parent reset handler (which will trigger refetch)
      if (onResetFilters) {
        onResetFilters();
      }
    };

    const handleApplyFilters = () => {
      if (onApplyFilters) {
        onApplyFilters();
      }
    };

    return (
      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: '20px',
          backgroundColor: '#ffffff',
          height: 'fit-content',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          border: '1px solid #f0f0f0'
        }}
      >
        <TextField
          fullWidth
          placeholder="Search"
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: '25px',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#33CC33',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#33CC33',
                borderWidth: '2px',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#33CC33',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            )
          }}
        />

        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight={600}>Categories</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {categories.map((category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      checked={filters.categories.includes(category)}
                      onChange={(e) => handleCategoryChange(category, e.target.checked)}
                      sx={{ color: '#4CAF50', '&.Mui-checked': { color: '#4CAF50' } }}
                    />
                  }
                  label={category}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight={600}>Investment Amount</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ px: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2">Min: $50,000</Typography>
                <Typography variant="body2">Max: $500,000</Typography>
              </Box>
              <Slider
                value={filters.investmentAmount || [50000, 500000]}
                onChange={(_, newValue) =>
                  onFiltersChange({ ...filters, investmentAmount: newValue as [number, number] })
                }
                valueLabelDisplay="auto"
                min={50000}
                max={500000}
                step={10000}
                sx={{ color: '#043A66' }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight={600}>Location</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ width: '100%' }}>
              <CountrySelector
                label=""
                value={filters.location || ''}
                onChange={(value) => onFiltersChange({ ...filters, location: value })}
                placeholder="Select a country"
                showFlags={true}
                showFlagsInSelected={true}
                borderColor="#E0E0E0"
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight={600}>Compliance</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={(filters.compliance ?? []).includes('Sharia-compliant')}
                    onChange={(e) => handleComplianceChange('Sharia-compliant', e.target.checked)}
                    sx={{ color: '#4CAF50', '&.Mui-checked': { color: '#4CAF50' } }}
                  />
                }
                label="Sharia-compliant investments"
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight={600}>Expected ROI</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {roiRanges.map((roi) => (
                <FormControlLabel
                  key={roi}
                  control={
                    <Checkbox
                      checked={filters.expectedROI.includes(roi)}
                      onChange={(e) => handleROIChange(roi, e.target.checked)}
                      sx={{ color: '#4CAF50', '&.Mui-checked': { color: '#4CAF50' } }}
                    />
                  }
                  label={roi}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <CustomButton
            variant="primary"
            fullWidth
            onClick={handleApplyFilters}
          >
            Apply filters
          </CustomButton>
          <CustomButton
            variant="outline"
            fullWidth
            onClick={handleResetFilters}
          >
            Reset filters
          </CustomButton>
        </Box>
      </Paper >
    );
  };
