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
            p={{ base: 4, md: 6 }}
            mb={4}
            _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}
            transition="all 0.2s"
        >
            <Flex 
                direction={{ base: "column", md: "row" }}
                spacing={{ base: 4, md: 6 }} 
                align={{ base: "stretch", md: "start" }} 
                minH={{ base: "auto", md: "120px" }}
                gap={{ base: 4, md: 6 }}
            >
                {/* Job Image */}
                <Box flexShrink={0} alignSelf={{ base: "center", md: "flex-start" }}>
                    <Image
                        src={job.job_image || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=100&fit=crop'}
                        alt={job.name}
                        w={{ base: "100%", sm: "200px", md: "150px" }}
                        h={{ base: "120px", sm: "100px", md: "100px" }}
                        maxW={{ base: "300px", md: "150px" }}
                        objectFit="cover"
                        borderRadius="md"
                    />
                </Box>

                {/* Job Details */}
                <VStack 
                    align={{ base: "center", md: "start" }} 
                    spacing={2} 
                    flex="1"
                    textAlign={{ base: "center", md: "left" }}
                >
                    {/* Date */}
                    <Text fontSize="md" color="gray.500">
                        {formatDate(job.created_at)}
                    </Text>
                    
                    {/* Job Title */}
                    <Link to={`${BASE_ROUTE}job/${job.id}`}>
                        <Text 
                            fontSize={{ base: "lg", md: "xl" }}
                            fontWeight="bold" 
                            color="gray.800"
                            _hover={{ color: "red.500" }}
                            cursor="pointer"
                        >
                            {job.name}
                        </Text>
                    </Link>
                    
                    {/* Company Name */}
                    <Text fontSize={{ base: "md", md: "lg" }} color="gray.700" fontWeight="medium">
                        {job.company?.name || 'Company Name'}
                    </Text>
                    
                    {/* Location */}
                    <Text fontSize="md" color="blue.500" fontWeight="medium">
                        {job.location}
                    </Text>
                </VStack>

                {/* Right Side Actions */}
                <Flex 
                    direction={{ base: "row", md: "column" }} 
                    align={{ base: "center", md: "end" }} 
                    justify={{ base: "space-between", md: "space-between" }} 
                    h={{ base: "auto", md: "120px" }} 
                    minH={{ base: "auto", md: "120px" }}
                    w={{ base: "100%", md: "auto" }}
                    mt={{ base: 2, md: 0 }}
                >
                    {/* Heart Icon */}
                    <Box>
                        <Icon 
                            as={FaHeart} 
                            color="gray.400" 
                            cursor="pointer"
                            _hover={{ color: "red.500" }}
                            transition="color 0.2s"
                            boxSize={5}
                        />
                    </Box>
                    
                    {/* Apply Button */}
                    <Box>
                        <Button
                            bg="red.400"
                            color="white"
                            size={{ base: "sm", md: "md" }}
                            borderRadius="full"
                            px={{ base: 6, md: 8 }}
                            _hover={{ bg: "red.500" }}
                            _focus={{ bg: "red.500" }}
                            boxShadow="0 2px 8px rgba(239, 68, 68, 0.3)"
                        >
                            Aplică rapid
                        </Button>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    );
};

export default HorizontalJobCard;