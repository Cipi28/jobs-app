import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
    Box,
    Text,
    VStack,
    HStack,
    Icon,
    Button,
    Container,
    Divider, Image, Flex,
} from "@chakra-ui/react";
import {FaMapMarkerAlt, FaBriefcase, FaClock, FaStar, FaHeart} from "react-icons/fa";

export const JobDetails = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`https://jobs-api-1pqa.onrender.com/api/v1/jobs/${jobId}`);
                setJob(response.data);
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };

        fetchJobDetails();
    }, [jobId]);

    if (!job) {
        return (
            <Text textAlign="center" mt={8} fontSize="xl" fontWeight="bold">
                Loading...
            </Text>
        );
    }

    return (
        <Box minH="100vh" bg="gray.50">
            <Container
                maxW="6xl"
                display="flex"
                flexDirection={{ base: "column", lg: "row" }} // Stack on small screens, row on larger
                gap={6}
                py={6}
            >
                {/* Left Section */}
                <Box
                    flex="1"
                    // bg="white"
                    bg="gray.100"
                    boxShadow="md"
                    p={6}
                    rounded="md"
                    position={{ base: "relative", lg: "sticky" }} // Sticky only on large screens
                    top={{ base: "unset", lg: "0px" }} // Apply sticky offset on large screens
                    alignSelf={{ base: "unset", lg: "start" }} // Prevent collapsing on large screens
                >
                    <VStack spacing={4} alignItems="start">
                        <Text fontSize="2xl" fontWeight="bold">
                            {job.name}
                        </Text>
                        <Text color="gray.500" fontWeight="medium">
                            Salary: Confidential
                        </Text>
                        <HStack spacing={2}>
                            <Icon as={FaBriefcase} color="gray.500" />
                            <Text>Experience Level: {job.experience_level}</Text>
                        </HStack>
                        <HStack spacing={2}>
                            <Icon as={FaMapMarkerAlt} color="gray.500" />
                            <Text>{job.location}</Text>
                        </HStack>
                        <HStack spacing={2}>
                            <Icon as={FaClock} color="gray.500" />
                            <Text>Work Mode: {JSON.parse(job.work_mode).type}</Text>
                        </HStack>
                        <Divider />
                        <VStack spacing={4} alignItems="start">
                            <HStack>
                                <Image
                                    src={job.company.logo_image || '/placeholder.png'}
                                    alt={`${job.company.name} Logo`}
                                    boxSize="100px"
                                    objectFit="contain"
                                />
                                <VStack align="start" spacing={1}>
                                    <Text fontSize="2xl" fontWeight="bold">
                                        {job.company.name}
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
                                        <Text color="gray.500">{job.company.location}</Text>
                                    </Flex>
                                </VStack>
                            </HStack>
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
                    </VStack>
                </Box>

                {/* Right Section */}
                <Box
                    flex="2"
                    bg="white"
                    boxShadow="md"
                    p={6}
                    rounded="md"
                    position="relative"
                >
                    <VStack spacing={4} alignItems="start" mb={6}>
                        <Text fontWeight="bold" fontSize="lg">
                            Job Description
                        </Text>
                        <Box px={6} my={4} dangerouslySetInnerHTML={{ __html: job.description }} />
                        <Divider />
                        <Text fontWeight="bold" mt={4}>
                            Aptitudini
                        </Text>
                        <VStack align="start" spacing={1}>
                            <HStack spacing={4} wrap="wrap">
                                {JSON.parse(job.aptitudes || "[]").map((aptitude, index) => (
                                    <Box
                                        key={index}
                                        as="span"
                                        color="gray.700"
                                        bg="gray.100"
                                        px={3}
                                        py={1}
                                        borderRadius="full"
                                        fontSize="md"
                                        boxShadow="md"

                                    >
                                        {aptitude}
                                    </Box>
                                ))}
                            </HStack>
                        </VStack>
                    </VStack>

                    {/* Apply Button (Sticky at the Bottom of the Right Section) */}
                    <Box
                        position="sticky"
                        bottom="4"
                        bg="white"
                        boxShadow="xl"
                        borderRadius="full"
                        p={2}
                        zIndex="10"
                    >
                        <Button
                            size="lg"
                            colorScheme="red"
                            width="100%"
                            borderRadius="full"
                        >
                            Apply Now
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};
