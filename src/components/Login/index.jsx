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

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    const handleLogin = async () => {
        try {
            const { user, session } = await authApi.signIn(email, password);

            // Check if email is confirmed
            if (!user.email_confirmed_at) {
                toast({
                    title: "Email Not Confirmed",
                    description: "Please check your email and click the confirmation link before logging in.",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }

            // Get user profile after successful login
            try {
                const profile = await authApi.getUserProfile();
                
                if (profile) {
                    // Save user data in localStorage for compatibility
                    localStorage.setItem("user", JSON.stringify(profile));
                    localStorage.setItem("token", session.access_token);

                    // Redirect to homepage
                    window.location.href = "/";
                } else {
                    toast({
                        title: "Profile Setup Required",
                        description: "Please complete your profile setup.",
                        status: "warning",
                        duration: 3000,
                        isClosable: true,
                    });
                    // Still allow login but redirect to profile setup
                    localStorage.setItem("token", session.access_token);
                    window.location.href = "/profile";
                }
            } catch (profileError) {
                console.error('Profile fetch error:', profileError);
                toast({
                    title: "Profile Setup Required", 
                    description: "Please complete your profile setup.",
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
                });
                // Still allow login but redirect to profile setup
                localStorage.setItem("token", session.access_token);
                window.location.href = "/profile";
            }

        } catch (error) {
            console.error('Login error:', error);
            toast({
                title: "Login Failed",
                description: error.message || "Invalid credentials",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const loginForm = () => {
        return (
            <VStack spacing={4} align="stretch" px={8}>
                <Input
                    placeholder="Adresa email"
                    size="lg"
                    variant="filled"
                    focusBorderColor="red.500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    placeholder="Parolă"
                    type="password"
                    size="lg"
                    variant="filled"
                    focusBorderColor="red.500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    Intră în cont
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
                    Nu ai cont?{" "}
                    <Text as="span" color="red.500" fontWeight="bold" cursor="pointer">
                        <Link to={`${BASE_ROUTE}register`}>Creează acum un cont nou</Link>
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
                        Conectează-te pentru a începe
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

