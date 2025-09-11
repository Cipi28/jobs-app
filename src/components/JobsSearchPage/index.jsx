import {
    Box, Container, Grid, VStack, HStack, Input, Button, Text,
    Checkbox, IconButton, Select, Divider, useDisclosure, Drawer, DrawerOverlay,
    DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Tag, Image, Badge
} from "@chakra-ui/react";
import { FaFilter, FaHeart, FaEye } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { jobsApi } from '../../lib/supabase';
import HorizontalJobCard from "../HorizontalJobCard/index.jsx";
import { FiltersSidebar } from "../FiltersSidebar/index.jsx";

export const JobsSearchPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isMobile = window.innerWidth < 768;
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalCount: 0,
        totalPages: 0
    });
    const [filters, setFilters] = useState({
        keywords: '',
        location: '',
        department: '',
        workType: ''
    });
    const [sidebarFilters, setSidebarFilters] = useState({});

    const searchJobs = async (page = 1) => {
        setLoading(true);
        try {
            const result = await jobsApi.searchJobs(filters, page, 20);
            setJobs(result.jobs);
            setPagination(result.pagination);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        searchJobs();
    }, []);

    return (
        <Box bg="gray.100" minH="100vh" py={5}>
            <Container maxW="container.xl">
                <VStack spacing={4} align="stretch">
                    {/* Search Bar */}
                    <HStack>
                        <Input 
                            placeholder="Cuvinte cheie" 
                            bg="white" 
                            value={filters.keywords}
                            onChange={(e) => setFilters({...filters, keywords: e.target.value})}
                        />
                        <Button 
                            colorScheme="orange" 
                            onClick={() => searchJobs(1)}
                            isLoading={loading}
                        >
                            Caută Job
                        </Button>
                    </HStack>

                    {/* Grid Layout for Filters & Job Listings */}
                    <Grid templateColumns={{ base: "1fr", md: "1fr 3fr" }} gap={6}>
                        {/* Filters Section (Hidden on Mobile) */}
                        {!isMobile && (
                            <FiltersSidebar 
                                onFiltersChange={setSidebarFilters}
                                selectedFilters={sidebarFilters}
                            />
                        )}

                        {/* Job Listings Section */}
                        <VStack spacing={4} align="stretch">
                            {/* Filter Icon for Mobile */}
                            {isMobile && (
                                <IconButton
                                    icon={<FaFilter />}
                                    aria-label="Open Filters"
                                    onClick={onOpen}
                                    size="lg"
                                />
                            )}

                            {/* Job Count and Sorting (Inside Job Listings Column) */}
                            <VStack align="stretch" spacing={2} >
                                <Text fontSize="xl" fontWeight="bold">
                                    {pagination.totalCount} locuri de munca
                                </Text>
                                <HStack bg="white" p={3} borderRadius="md" boxShadow="sm" justify="space-between">
                                    <Text fontWeight="bold" color="purple.700">Relevanță</Text>
                                    <Text color="purple.500">Dată</Text>
                                    <Text color="purple.500">Distanță</Text>
                                </HStack>
                            </VStack>

                            {/* Job Cards */}
                            {loading ? (
                                <Text>Loading...</Text>
                            ) : (
                                <VStack spacing={0} align="stretch">
                                    {jobs.map((job) => (
                                        <HorizontalJobCard key={job.id} job={job} />
                                    ))}
                                </VStack>
                            )}

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <HStack justify="center" mt={6}>
                                    <Button 
                                        disabled={!pagination.hasPrevPage}
                                        onClick={() => searchJobs(pagination.currentPage - 1)}
                                    >
                                        Previous
                                    </Button>
                                    <Text>
                                        Page {pagination.currentPage} of {pagination.totalPages}
                                    </Text>
                                    <Button 
                                        disabled={!pagination.hasNextPage}
                                        onClick={() => searchJobs(pagination.currentPage + 1)}
                                    >
                                        Next
                                    </Button>
                                </HStack>
                            )}
                        </VStack>
                    </Grid>
                </VStack>
            </Container>
            
            {/* Mobile Filters Drawer */}
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                size="sm"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Filtre</DrawerHeader>
                    <DrawerBody>
                        <FiltersSidebar 
                            onFiltersChange={setSidebarFilters}
                            selectedFilters={sidebarFilters}
                        />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};
