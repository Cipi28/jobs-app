import {
    Box, Container, Grid, VStack, HStack, Avatar, Input, Button,
    Text, Heading, Divider, Tag, Switch, IconButton, Textarea, Badge, Stack, Select
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { FaLinkedin, FaGithub, FaGlobe, FaPlus, FaTimes, FaCheck } from "react-icons/fa";
import React from "react";

export const ProfilePage = () => {
    return (
        <Box bg="gray.100" minH="100vh" py={10}> {/* Grey background */}
            <Container maxW="container.lg">
                <Box bg="white" p={6} boxShadow="lg" borderRadius="lg">
                    {/* Responsive Grid: 1 Column (Mobile), 2 Columns (Desktop) */}
                    <Grid
                        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                        gap={6}
                    >
                        {/* Left Column - Profile Info */}
                        <VStack align="stretch" spacing={4}>
                            <HStack>
                                <Avatar
                                    size="xl"
                                    src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                                />
                                <VStack align="start">
                                    <Heading size="md">cipi manea</Heading>
                                    <Text color="gray.500">Web developer</Text>
                                </VStack>
                            </HStack>

                            <Divider />

                            <VStack align="stretch" spacing={3}>
                                <Text fontWeight="bold">Personal Information</Text>
                                <Input placeholder="First Name" defaultValue="cipi" />
                                <Input placeholder="Last Name" defaultValue="manea" />
                                <Input placeholder="Email" defaultValue="1@example.com" />
                                <Input placeholder="Phone Number" defaultValue="+1234567890" />
                                <Text fontWeight="bold">Sex</Text>
                                <HStack>
                                    <Button colorScheme="blackAlpha" variant="solid">Masculin</Button>
                                    <Button colorScheme="blackAlpha" variant="outline">Feminin</Button>
                                </HStack>
                                <Text fontWeight="bold">Link-uri personale</Text>
                                <HStack>
                                    <Input placeholder="Adaugă link-ul profilului tău de LinkedIn" />
                                    <IconButton icon={<FaLinkedin />} aria-label="LinkedIn" />
                                </HStack>
                                <HStack>
                                    <Input placeholder="Adaugă profilul tau Github" />
                                    <IconButton icon={<FaGithub />} aria-label="Github" />
                                </HStack>
                                <HStack>
                                    <Input placeholder="Adaugă link portofoliu" />
                                    <IconButton icon={<FaGlobe />} aria-label="Website" />
                                </HStack>
                                <Textarea placeholder="About Me" defaultValue="Short bio about the user..." />
                            </VStack>

                            <Box>
                                <Button
                                    w="100%"
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
                                    as="a"
                                    href="#"
                                    onClick={() => window.history.pushState({}, '', `${BASE_ROUTE}login`)}
                                >
                                    Salvează schimbarile
                                </Button>
                            </Box>
                        </VStack>

                        {/* Right Column - Additional Details */}
                        <VStack align="stretch" spacing={4}>
                            <HStack justify="space-between">
                                <Text fontWeight="bold">Educatie</Text>
                                <IconButton icon={<FaPlus />} aria-label="Add Education" size="sm" />
                            </HStack>
                            <VStack align="stretch" spacing={4}>
                                <Box p={4} borderWidth={1} borderRadius="md">
                                    <Text fontWeight="bold">Universitatea Politehnica din Timișoara - Facultatea de Automatică și Calculatoare</Text>
                                    <Text color="gray.500">Facultate (terminat) 2020 -> prezent • 5 ani</Text>
                                    <Text>Specializarea CTI (Calculatoare și Tehnologii informaționale)</Text>
                                </Box>
                                <Box p={4} borderWidth={1} borderRadius="md">
                                    <Text fontWeight="bold">Liceul Teoretic "George Călinescu" - Chișinău</Text>
                                    <Text color="gray.500">Liceu / Școală profesională 2017 -> 2020 • 3 ani</Text>
                                    <Text>Profil Real</Text>
                                </Box>
                                <Box p={4} borderWidth={1} borderRadius="md">
                                    <Text fontWeight="bold">Școala de Arte "Valeriu Poleakov"</Text>
                                    <Text color="gray.500">2015 -> 2019 • 4 ani</Text>
                                    <Text>Accordeon</Text>
                                </Box>
                            </VStack>

                            <Divider />

                            <Text fontWeight="bold">Aptitudini</Text>
                            <Input placeholder="Adaugă aptitudini" />
                            <HStack wrap="wrap">
                                {["java test", "Leadership comunitar", "autoritate", "Exercitii cardiovasculare", "Cardiorespiratory Fitness", "Leadership transformațional", "Flexibilitate cognitivă", "Conștientizarea afacerilor", "Eticheta de afaceri", "Sensul afacerii"].map((aptitude, index) => (
                                    // <Tag key={index} size="lg" colorScheme="gray" variant="outline">+ {aptitude}</Tag>
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

                            <Divider />

                            <Text fontWeight="bold">Caută limba (din listă)</Text>
                            <Select placeholder="ex: Engleza">
                                <option>Engleză - avansat</option>
                                <option>Italiană - avansat</option>
                                <option>Română - mediu</option>
                                <option>Rusă - mediu</option>
                            </Select>
                            <HStack wrap="wrap">
                                {["Engleză - avansat", "Italiană - avansat", "Română - mediu", "Rusă - mediu"].map((language, index) => (
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
                                        {language}
                                        <IconButton icon={<FaTimes />} size="xs" aria-label="Remove language" />
                                    </Box>
                                ))}
                            </HStack>

                            <Divider />

                            <HStack justify="space-between">
                                <Text fontWeight="bold">Driving License</Text>
                                <Switch colorScheme="green" />
                            </HStack>
                        </VStack>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default ProfilePage;
