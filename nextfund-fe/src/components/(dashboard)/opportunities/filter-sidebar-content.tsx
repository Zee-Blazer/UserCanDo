'use client';

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
    TextField,
    Typography
} from '@mui/material';
import { FilterState } from '../../../types/landing-page';
import CountrySelector from '../../General/form/countrySelector';
import { CustomButton } from '../../General/ui/custom-button';

interface FilterSidebarContentProps {
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    onClose?: () => void;
    onApplyFilters?: () => void;
    onResetFilters?: () => void;
}

export const FilterSidebarContent: React.FC<FilterSidebarContentProps> = ({
    filters,
    onFiltersChange,
    onClose,
    onApplyFilters,
    onResetFilters
}) => {
    const categories = ['Technology', 'Agriculture', 'Healthcare', 'Real Estate', 'Logistics', 'Energy', 'Manufacturing', 'Hospitality'];
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

    const handleApplyFilters = () => {
        if (onApplyFilters) {
            onApplyFilters();
        }
        if (onClose) {
            onClose();
        }
    };

    const handleResetFilters = () => {

        const resetFilters: FilterState = {
            categories: [],
            location: '',
            expectedROI: [],
            search: ''
        };

        onFiltersChange(resetFilters);

        if (onResetFilters) {
            onResetFilters();
        }
        if (onClose) {
            onClose();
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <TextField
                fullWidth
                placeholder="Search"
                value={filters.search}
                onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
                sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '25px',
                        backgroundColor: 'white',
                    }
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
                    <Typography variant="h6" fontWeight={600} className="font-neue-medium">Categories</Typography>
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
                    <Typography variant="h6" fontWeight={600} className="font-neue-medium">Location</Typography>
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
                    <Typography variant="h6" fontWeight={600} className="font-neue-medium">Expected ROI</Typography>
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
                <CustomButton variant="primary" fullWidth onClick={handleApplyFilters}>
                    Apply filters
                </CustomButton>
                <CustomButton variant="outline" fullWidth onClick={handleResetFilters}>
                    Reset filters
                </CustomButton>
            </Box>
        </Box>
    );
};