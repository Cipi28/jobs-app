import {
    Box, Container, Grid, VStack, HStack, Input, Button, Text,
    Checkbox, IconButton, Select, Divider, useDisclosure, Drawer, DrawerOverlay,
    DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Tag, Image, Badge
} from "@chakra-ui/react";
import { FaFilter, FaHeart, FaEye } from "react-icons/fa";
import React from "react";

export const JobsSearchPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isMobile = window.innerWidth < 768;

    return (
        <Box bg="gray.100" minH="100vh" py={5}>
            <Container maxW="container.xl">
                <VStack spacing={4} align="stretch">
                    {/* Search Bar */}
                    <HStack>
                        <Input placeholder="Cuvinte cheie" bg="white" />
                        <Button colorScheme="orange">Caută Job</Button>
                    </HStack>

                    {/* Grid Layout for Filters & Job Listings */}
                    <Grid templateColumns={{ base: "1fr", md: "1fr 3fr" }} gap={6}>
                        {/* Filters Section (Hidden on Mobile) */}
                        {!isMobile && (
                            <Box bg="white" p={4} boxShadow="md" borderRadius="md">
                                <Text fontWeight="bold">Salariu & Beneficii</Text>
                                <Checkbox>Salarii</Checkbox>
                                <Divider my={3} />

                                <Text fontWeight="bold">Orașe</Text>
                                <Checkbox>Remote (de acasă)</Checkbox>
                                <Checkbox>Străinătate</Checkbox>
                                <Checkbox>București</Checkbox>
                                <Checkbox>Cluj-Napoca</Checkbox>
                                <Checkbox>Timișoara</Checkbox>
                                <Divider my={3} />

                                <Text fontWeight="bold">Departamente</Text>
                                <Select placeholder="ex: IT Software" bg="white" />
                                <Checkbox>Achiziții</Checkbox>
                                <Checkbox>Administrativ / Logistică</Checkbox>
                                <Checkbox>Agricultură</Checkbox>
                                <Checkbox>Alimentație / HoReCa</Checkbox>
                                <Divider my={3} />

                                <Text fontWeight="bold">Tipul jobului</Text>
                                <Checkbox>Full time</Checkbox>
                                <Checkbox>Part time</Checkbox>
                                <Checkbox>Internship / Voluntariat</Checkbox>
                                <Checkbox>Proiect / Sezonier</Checkbox>
                                <Divider my={3} />
                            </Box>
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
                                <Text fontSize="xl" fontWeight="bold">20761 locuri de munca</Text>
                                <HStack bg="white" p={3} borderRadius="md" boxShadow="sm" justify="space-between">
                                    <Text fontWeight="bold" color="purple.700">Relevanță</Text>
                                    <Text color="purple.500">Dată</Text>
                                    <Text color="purple.500">Distanță</Text>
                                </HStack>
                            </VStack>

                            {/* Job Cards */}
                            {[1, 2, 3, 4].map((job, index) => (
                                <Box key={index} bg="white" p={4} boxShadow="md" borderRadius="md">
                                    <HStack align="start">
                                        <Image
                                            src={job.image || 'https://learn.uat.edu/hubfs/Software%20Engineering%20Careers%202.jpg'}
                                            alt={job.title}
                                            objectFit="cover"
                                            w="15%"
                                            // aspectRatio={5 / 4}
                                            p={3}
                                        />
                                        {/*<Image boxSize="50px" src="/logo.png" alt="Company Logo" />*/}
                                        <VStack align="start" spacing={1} flex="1">
                                            <HStack>
                                                <Text fontSize="sm" color="gray.500">9 Mart. 2025</Text>
                                                {/*<Badge colorScheme="green">VIDEO</Badge>*/}
                                            </HStack>
                                            <Text fontWeight="bold" fontSize="lg">Business Developer - Bucuresti</Text>
                                            <Text fontWeight="bold" color="gray.700">Coca Cola HBC - Romania</Text>
                                            <Text fontSize="sm" color="gray.600">Bucuresti</Text>
                                        </VStack>
                                    </HStack>
                                    <HStack justify="space-between" mt={4}>
                                        <HStack>
                                            <IconButton icon={<FaHeart />} aria-label="Favorite" variant="ghost" />
                                        </HStack>
                                        <Button
                                            w="20%"
                                            h={45}
                                            bg={'red.400'}
                                            color={'white'}
                                            rounded={'3xl'}
                                            boxShadow={'0 5px 20px 0px rgba(139, 0, 0, 0.7)'}
                                            _hover={{
                                                bg: 'red.500',
                                            }}
                                            _focus={{
                                                bg: 'red.500',
                                            }}
                                        >
                                            Aplica rapid
                                        </Button>
                                        {/*<Button colorScheme="orange" borderRadius="full" px={6}>Aplică rapid</Button>*/}
                                    </HStack>
                                </Box>
                            ))}
                        </VStack>
                    </Grid>
                </VStack>
            </Container>
        </Box>
    );
};
