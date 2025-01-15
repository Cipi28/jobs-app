import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import {Link} from "react-router-dom";
import {BASE_ROUTE} from "../../App.jsx";

const JobCard = ({ job }) => {
    return (
        <Link to={`${BASE_ROUTE}job/${job.id}`}>
            <Box
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
                bg="white"
                boxShadow="lg"
                w="100%"
                aspectRatio={4 / 6}
            >
                <Image
                    src={job.image || 'https://learn.uat.edu/hubfs/Software%20Engineering%20Careers%202.jpg'}
                    alt={job.title}
                    objectFit="cover"
                    w="100%"
                    aspectRatio={5 / 4}
                    p={3}
                />
                <Box px={4} pt={2}>
                    <Text fontWeight="bold" fontSize="md" mb={2}>
                        {job.name}
                    </Text>
                    <Text fontSize="sm" color="gray.600" mb={2}>
                        {JSON.parse(job.work_mode).type}
                    </Text>
                    <Text fontSize="sm" fontWeight="bold" color="red.500">
                        {job.location}
                    </Text>
                </Box>
            </Box>
        </Link>
    );
};

export default JobCard;