import React, { useState } from 'react';
import {
    Box,
    VStack,
    Text,
    Checkbox,
    Input,
    Collapse,
    IconButton,
    HStack,
    Button,
    Tag,
    TagLabel,
    TagCloseButton,
    Divider,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';

// Configuration object - Edit this to add/modify filter sections
const FILTER_SECTIONS = [
    {
        id: 'salary',
        title: 'Salariu și beneficii',
        searchable: false,
        items: [
            { id: 'salarii', label: 'Salarii', value: 'salarii' }
        ]
    },
    {
        id: 'cities',
        title: 'Orașe',
        searchable: true,
        searchPlaceholder: 'ex: București',
        items: [
            { id: 'remote', label: 'Remote (de acasă)', value: 'remote' },
            { id: 'strainatate', label: 'Străinătate', value: 'strainatate' },
            { id: 'bucuresti', label: 'București', value: 'bucuresti' },
            { id: 'cluj', label: 'Cluj-Napoca', value: 'cluj' },
            { id: 'timisoara', label: 'Timișoara', value: 'timisoara' },
            { id: 'iasi', label: 'Iași', value: 'iasi' },
            { id: 'constanta', label: 'Constanța', value: 'constanta' },
            { id: 'brasov', label: 'Brașov', value: 'brasov' }
        ]
    },
    {
        id: 'departments',
        title: 'Departamente',
        searchable: true,
        searchPlaceholder: 'ex: IT Software',
        items: [
            { id: 'achizitii', label: 'Achiziții', value: 'achizitii' },
            { id: 'admin', label: 'Administrativ / Logistică', value: 'admin' },
            { id: 'agricultura', label: 'Agricultură', value: 'agricultura' },
            { id: 'alimentatie', label: 'Alimentație / HoReCa', value: 'alimentatie' },
            { id: 'altele', label: 'Altele', value: 'altele' },
            { id: 'it', label: 'IT Software', value: 'it' },
            { id: 'marketing', label: 'Marketing', value: 'marketing' },
            { id: 'vanzari', label: 'Vânzări', value: 'vanzari' }
        ]
    },
    {
        id: 'jobType',
        title: 'Tipul jobului',
        searchable: false,
        items: [
            { id: 'fulltime', label: 'Full time', value: 'fulltime' },
            { id: 'parttime', label: 'Part time', value: 'parttime' },
            { id: 'internship', label: 'Internship / Voluntariat', value: 'internship' },
            { id: 'proiect', label: 'Proiect / Sezonier', value: 'proiect' }
        ]
    }
];

export const FiltersSidebar = ({ onFiltersChange, selectedFilters = {} }) => {
    const [expandedSections, setExpandedSections] = useState({
        salary: true,
        cities: true,
        departments: true,
        jobType: true
    });
    const [searchTerms, setSearchTerms] = useState({});
    const [activeFilters, setActiveFilters] = useState([]);

    const toggleSection = (sectionId) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const handleCheckboxChange = (sectionId, itemId, itemValue, itemLabel) => {
        const newFilters = { ...selectedFilters };
        
        if (!newFilters[sectionId]) {
            newFilters[sectionId] = [];
        }

        const isChecked = newFilters[sectionId].includes(itemValue);
        
        if (isChecked) {
            newFilters[sectionId] = newFilters[sectionId].filter(val => val !== itemValue);
            setActiveFilters(prev => prev.filter(filter => filter.value !== itemValue));
        } else {
            newFilters[sectionId] = [...newFilters[sectionId], itemValue];
            setActiveFilters(prev => [...prev, { 
                sectionId, 
                value: itemValue, 
                label: itemLabel 
            }]);
        }

        // Clean up empty arrays
        if (newFilters[sectionId].length === 0) {
            delete newFilters[sectionId];
        }

        onFiltersChange(newFilters);
    };

    const removeFilter = (filterValue) => {
        const filterToRemove = activeFilters.find(f => f.value === filterValue);
        if (filterToRemove) {
            handleCheckboxChange(
                filterToRemove.sectionId, 
                null, 
                filterToRemove.value, 
                filterToRemove.label
            );
        }
    };

    const clearAllFilters = () => {
        setActiveFilters([]);
        onFiltersChange({});
    };

    const handleSearchChange = (sectionId, value) => {
        setSearchTerms(prev => ({
            ...prev,
            [sectionId]: value
        }));
    };

    const getFilteredItems = (section) => {
        const searchTerm = searchTerms[section.id]?.toLowerCase() || '';
        if (!searchTerm) return section.items;
        
        return section.items.filter(item => 
            item.label.toLowerCase().includes(searchTerm)
        );
    };

    return (
        <Box bg="white" p={4} boxShadow="md" borderRadius="md" h="fit-content">
            <VStack spacing={4} align="stretch">
                {/* Active Filters */}
                {activeFilters.length > 0 && (
                    <Box>
                        <HStack justify="space-between" mb={2}>
                            <Text fontSize="sm" fontWeight="bold" color="gray.600">
                                Filtre active
                            </Text>
                            <Button size="xs" variant="ghost" onClick={clearAllFilters}>
                                Șterge
                            </Button>
                        </HStack>
                        <HStack wrap="wrap" spacing={1}>
                            {activeFilters.map((filter) => (
                                <Tag
                                    key={filter.value}
                                    size="sm"
                                    colorScheme="purple"
                                    borderRadius="full"
                                >
                                    <TagLabel>{filter.label}</TagLabel>
                                    <TagCloseButton onClick={() => removeFilter(filter.value)} />
                                </Tag>
                            ))}
                        </HStack>
                        <Divider mt={3} />
                    </Box>
                )}

                {/* Filter Sections */}
                {FILTER_SECTIONS.map((section) => (
                    <Box key={section.id}>
                        <HStack 
                            justify="space-between" 
                            cursor="pointer" 
                            onClick={() => toggleSection(section.id)}
                            p={2}
                            borderRadius="md"
                            _hover={{ bg: "gray.50" }}
                        >
                            <Text fontWeight="bold" fontSize="md">
                                {section.title}
                            </Text>
                            <IconButton
                                size="sm"
                                variant="ghost"
                                icon={expandedSections[section.id] ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                aria-label={`Toggle ${section.title}`}
                            />
                        </HStack>

                        <Collapse in={expandedSections[section.id]}>
                            <Box pl={2} pr={2} pb={2}>
                                {/* Search Input for searchable sections */}
                                {section.searchable && (
                                    <InputGroup size="sm" mb={3}>
                                        <InputLeftElement>
                                            <SearchIcon color="gray.400" />
                                        </InputLeftElement>
                                        <Input
                                            placeholder={section.searchPlaceholder}
                                            value={searchTerms[section.id] || ''}
                                            onChange={(e) => handleSearchChange(section.id, e.target.value)}
                                            bg="gray.50"
                                            border="1px solid"
                                            borderColor="gray.200"
                                            _focus={{
                                                bg: "white",
                                                borderColor: "purple.300"
                                            }}
                                        />
                                    </InputGroup>
                                )}

                                {/* Scrollable Items Container */}
                                <Box 
                                    maxH="200px" 
                                    overflowY="auto" 
                                    css={{
                                        '&::-webkit-scrollbar': {
                                            width: '4px',
                                        },
                                        '&::-webkit-scrollbar-track': {
                                            background: '#f1f1f1',
                                            borderRadius: '10px',
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            background: '#c1c1c1',
                                            borderRadius: '10px',
                                        },
                                        '&::-webkit-scrollbar-thumb:hover': {
                                            background: '#a8a8a8',
                                        },
                                    }}
                                >
                                    <VStack spacing={2} align="stretch">
                                        {getFilteredItems(section).map((item) => (
                                            <Checkbox
                                                key={item.id}
                                                isChecked={selectedFilters[section.id]?.includes(item.value) || false}
                                                onChange={() => handleCheckboxChange(
                                                    section.id, 
                                                    item.id, 
                                                    item.value, 
                                                    item.label
                                                )}
                                                colorScheme="purple"
                                                size="sm"
                                            >
                                                <Text fontSize="sm">{item.label}</Text>
                                            </Checkbox>
                                        ))}
                                    </VStack>
                                </Box>
                            </Box>
                        </Collapse>
                        
                        {section.id !== FILTER_SECTIONS[FILTER_SECTIONS.length - 1].id && (
                            <Divider mt={2} />
                        )}
                    </Box>
                ))}

                {/* Create Alert Button */}
                <Button
                    colorScheme="purple"
                    variant="outline"
                    size="sm"
                    borderRadius="full"
                >
                    Creează alertă
                </Button>
            </VStack>
        </Box>
    );
};