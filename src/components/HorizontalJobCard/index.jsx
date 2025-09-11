import React from 'react';
import { Box, Image, Text, HStack, VStack, Button, Icon, Flex } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { BASE_ROUTE } from "../../App.jsx";

const HorizontalJobCard = ({ job }) => {
    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleDateString('ro-RO', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month}. ${year}`;
    };

    return (
        <Box
            bg="white"
            borderRadius="lg"
            boxShadow="md"
            p={4}
            mb={4}
            _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}
            transition="all 0.2s"
        >
            <HStack spacing={4} align="start">
                {/* Job Image */}
                <Box flexShrink={0}>
                    <Image
                        src={job.job_image || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=100&fit=crop'}
                        alt={job.name}
                        w="120px"
                        h="80px"
                        objectFit="cover"
                        borderRadius="md"
                    />
                </Box>

                {/* Job Details */}
                <VStack align="start" spacing={1} flex="1">
                    {/* Date */}
                    <Text fontSize="sm" color="gray.500">
                        {formatDate(job.created_at)}
                    </Text>
                    
                    {/* Job Title */}
                    <Link to={`${BASE_ROUTE}job/${job.id}`}>
                        <Text 
                            fontSize="lg" 
                            fontWeight="bold" 
                            color="gray.800"
                            _hover={{ color: "red.500" }}
                            cursor="pointer"
                        >
                            {job.name}
                        </Text>
                    </Link>
                    
                    {/* Company Name */}
                    <Text fontSize="md" color="gray.700" fontWeight="medium">
                        {job.company?.name || 'Company Name'}
                    </Text>
                    
                    {/* Location */}
                    <Text fontSize="sm" color="blue.500" fontWeight="medium">
                        {job.location}
                    </Text>
                </VStack>

                {/* Right Side Actions */}
                <VStack spacing={3} align="end" justify="space-between" h="full">
                    {/* Heart Icon */}
                    <Box>
                        <Icon 
                            as={FaHeart} 
                            color="gray.400" 
                            cursor="pointer"
                            _hover={{ color: "red.500" }}
                            transition="color 0.2s"
                        />
                    </Box>
                    
                    {/* Apply Button */}
                    <Box>
                        <Button
                            bg="red.400"
                            color="white"
                            size="sm"
                            borderRadius="full"
                            px={6}
                            _hover={{ bg: "red.500" }}
                            _focus={{ bg: "red.500" }}
                            boxShadow="0 2px 8px rgba(239, 68, 68, 0.3)"
                        >
                            Aplică rapid
                        </Button>
                    </Box>
                </VStack>
            </HStack>
        </Box>
    );
};

export default HorizontalJobCard;