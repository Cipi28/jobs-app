import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Text,
    VStack,
    Image,
    HStack,
    Button,
    Icon,
    Flex,
    SimpleGrid,
    Badge,
    Container,
    Link,
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaStar, FaShareAlt, FaHeart } from 'react-icons/fa';
import JobCard from "../JobCard/index.jsx";

export const CompanyDetails = () => {
    const { companyId } = useParams();
    const [company, setCompany] = useState(null);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(
                    `https://jobs-api-1pqa.onrender.com/api/v1/companies/${companyId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const responseJobs = await axios.get(
                    `https://jobs-api-1pqa.onrender.com/api/v1/companies/${companyId}/jobs`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setCompany(response.data);
                setJobs(responseJobs.data);
            } catch (error) {
                console.error('Error fetching company details:', error);
            }
        };


        fetchCompanyDetails();
    }, [companyId]);

    if (!company) {
        return (
            <Text textAlign="center" mt={8} fontSize="xl" fontWeight="bold">
                Loading...
            </Text>
        );
    }

    return (
        <Box minH="100vh" bg="gray.50" py={8}>
            <Container maxW="6xl" mx="auto">
                {/* Header */}
                {/* Company Info */}
                <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
                    {/* Left Section */}
                    <Box flex="1" bg="white" boxShadow="md" p={6} rounded="md">
                        <VStack spacing={4} alignItems="start">
                            <HStack>
                                <Image
                                    src={company.logo_image || '/placeholder.png'}
                                    alt={`${company.name} Logo`}
                                    boxSize="100px"
                                    objectFit="contain"
                                />
                                <VStack align="start" spacing={1}>
                                    <Text fontSize="2xl" fontWeight="bold">
                                        {company.name}
                                    </Text>
                                    <HStack spacing={2}>
                                        {Array(4)
                                            .fill(0)
                                            .map((_, i) => (
                                                <Icon key={i} as={FaStar} color="yellow.400" />
                                            ))}
                                        <Icon as={FaStar} color="gray.300" />
                                    </HStack>
                                    <Flex>
                                    <Icon as={FaMapMarkerAlt} color="gray.500" mt={1} mr={2}/>
                                    <Text color="gray.500">{company.location}</Text>
                                    </Flex>
                                </VStack>
                            </HStack>
                            <HStack spacing={2}>
                                <Icon as={FaShareAlt} color="gray.500" />
                                <Link href={company.url} isExternal target="_blank">
                                    <Text color="blue.500" textDecoration="underline">
                                        {company.url}
                                    </Text>
                                </Link>
                            </HStack>
                            <Text>{company.description}</Text>
                            <Button
                                size="lg"
                                colorScheme="red"
                                leftIcon={<Icon as={FaHeart} />}
                                width="100%"
                                borderRadius="full"
                                variant="outline"
                            >
                                Urmarește
                            </Button>
                        </VStack>
                    </Box>

                    {/* Right Section (Job Listings) */}
                    <Box flex="2" bg="transparent" p={6} rounded="md">
                        <HStack justifyContent="space-between" alignItems="center" mb={6}>
                            <Text fontSize="xl" fontWeight="bold" >
                                Joburi active
                            </Text>
                            <Button
                                size="sm"
                                variant="outline"
                                colorScheme="red"
                                leftIcon={<Icon as={FaShareAlt} />}
                            >
                                Share
                            </Button>
                        </HStack>
                        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} >
                            {jobs.map((job, index) => (
                                <JobCard key={index} job={job} />
                            ))}
                        </SimpleGrid>
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
};
