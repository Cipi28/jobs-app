import React, { useState } from "react";
import { authApi } from '../../lib/supabase';
import {
    Box,
    Button,
    Input,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    VStack,
    HStack,
    Text,
    Divider, useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faApple, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import {BASE_ROUTE} from "../../App.jsx";

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    const [userData, setUserdata] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        city: '',
    });

    const handleLogin = async () => {
        try {
            const result = await authApi.signUp(userData.email, userData.password, {
                firstName: userData.firstName,
                lastName: userData.lastName,
                city: userData.city
            });

            // Check if user was created successfully
            if (result.user) {
                toast({
                    title: "Registration Successful", 
                    description: "Redirecting to email confirmation page...",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });

                // Redirect to email confirmation page
                setTimeout(() => {
                    window.location.href = `${BASE_ROUTE}email-confirmation`;
                }, 1500);
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast({
                title: "Registration Failed",
                description: error.message || "Registration failed",
                status: "error",
                duration: 3000,
                isClosable: true,
            }
            )
          emailRedirectTo: `${window.location.origin}${import.meta.env.BASE_URL || '/'}`
        }
    };

    const loginForm = () => {
        return (
            <VStack spacing={5} align="stretch" px={8}>
                <Input
                    placeholder="Nume"
                    size="lg"
                    variant="filled"
                    focusBorderColor="red.500"
                    value={userData.firstName}
                    onChange={(e) => setUserdata({ ...userData, firstName: e.target.value })}
                />
                <Input
                    placeholder="Prenume"
                    size="lg"
                    variant="filled"
                    focusBorderColor="red.500"
                    value={userData.lastName}
                    onChange={(e) => setUserdata({ ...userData, lastName: e.target.value })}
                />
                <Input
                    placeholder="Adresa email"
                    size="lg"
                    variant="filled"
                    focusBorderColor="red.500"
                    value={userData.email}
                    onChange={(e) => setUserdata({ ...userData, email: e.target.value })}
                />
                <Input
                    placeholder="Parolă"
                    type="password"
                    size="lg"
                    variant="filled"
                    focusBorderColor="red.500"
                    value={userData.password}
                    onChange={(e) => setUserdata({ ...userData, password: e.target.value })}
                />
                <Input
                    placeholder="Oras"
                    size="lg"
                    variant="filled"
                    focusBorderColor="red.500"
                    value={userData.city}
                    onChange={(e) => setUserdata({ ...userData, city: e.target.value })}
                />
                />
                <Text align="right" fontSize="sm" color="red.500" cursor="pointer">
                    Am uitat parola
                </Text>
                <Button
                    colorScheme="red"
                    size="lg"
                    width="full"
                    bg="red.500"
                    _hover={{ bg: "red.400" }}
                    onClick={handleLogin}
                >
                    Inregistrează-te
                    Inregistrează-te
                </Button>

                <HStack align="center">
                    <Divider borderColor="black"/>
                    <Text fontSize="sm" color="gray.500" whiteSpace="nowrap" mx={1}>
                        Sau conectează-te cu
                    </Text>
                    <Divider borderColor="black"/>
                </HStack>

                <HStack justify="center" spacing={4} mt={2}>
                    <Button size="lg" bg="gray.100" _hover={{ bg: "gray.200" }}>
                        <FontAwesomeIcon icon={faGoogle} size="lg" />
                    </Button>
                    <Button size="lg" bg="gray.100" _hover={{ bg: "gray.200" }}>
                        <FontAwesomeIcon icon={faApple} size="lg" />
                    </Button>
                    <Button size="lg" bg="gray.100" _hover={{ bg: "gray.200" }}>
                        <FontAwesomeIcon icon={faFacebook} size="lg" />
                    </Button>
                </HStack>

                <Text fontSize="sm" align="center" color="gray.500" mt={3}>
                    Ai deja un cont?{" "}
                    <Text as="span" color="red.500" fontWeight="bold" cursor="pointer">
                        <Link to={`${BASE_ROUTE}login`}>Conectează-te acum</Link>
                    </Text>
                </Text>
            </VStack>
        );
    }


    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minH="100vh"
            bg="#FFF7F7"
            px={4} // Add padding to prevent overflow on smaller screens
            backgroundImage="url('https://png.pngtree.com/background/20210711/original/pngtree-high-tech-business-meeting-year-end-meeting-poster-banner-picture-image_1110958.jpg')"
            backgroundSize="cover"
            backgroundPosition="center"
        >
            <Box
                display="flex"
                flexDirection={{ base: "column", lg: "row" }} // Stack vertically on small screens
                alignItems="center"
                justifyContent="center"
                maxW="1200px"
                width="100%"
                bg="transparent"
                p={12}
            >
                {/* Left Section */}
                <Box flex="1" textAlign={{ base: "center", lg: "left" }} py={10}>
                    <Text fontSize="4xl" fontWeight="bold" color="red.500">
                        Înregistrează-te pentru a începe
                    </Text>
                    <Text fontSize="lg" mt={4} color="gray.500">
                        Caută jobul potrivit pentru tine!
                    </Text>
                </Box>

                {/* Right Section */}
                <Box
                    flex="1"
                    maxW="400px"
                    bg="white"
                    boxShadow="xl"
                    borderRadius="md"
                    pb={4}
                    mt={{ base: 8, lg: 0 }} // Add spacing for mobile
                >
                    {/* Tabs for Candidate and Company */}
                    <Tabs
                        isFitted
                        variant="enclosed"
                        onChange={(index) =>
                            setActiveTab(index === 0 ? "candidate" : "company")
                        }
                    >
                        <TabList mb={4} >
                            <Tab p={4}>Candidat</Tab>
                            <Tab p={4}>Companie</Tab>
                        </TabList>
                        <TabPanels>
                            {/* Login Form */}
                            <TabPanel>
                                {loginForm()}
                            </TabPanel>
                            <TabPanel>
                                {/*todo: add Register pannel*/}
                                {/*<LoginForm type={activeTab} />*/}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Box>
        </Box>
    );
}

