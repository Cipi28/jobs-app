import React from "react";
import {
    Box,
    Button,
    VStack,
    Text,
    Icon,
    Container,
} from "@chakra-ui/react";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BASE_ROUTE } from "../../App.jsx";

export const EmailConfirmation = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minH="100vh"
            bg="#FFF7F7"
            px={4}
            backgroundImage="url('https://png.pngtree.com/background/20210711/original/pngtree-high-tech-business-meeting-year-end-meeting-poster-banner-picture-image_1110958.jpg')"
            backgroundSize="cover"
            backgroundPosition="center"
        >
            <Container maxW="md">
                <Box
                    bg="white"
                    boxShadow="xl"
                    borderRadius="lg"
                    p={8}
                    textAlign="center"
                >
                    <VStack spacing={6}>
                        <Icon as={FaEnvelope} boxSize={16} color="red.500" />
                        
                        <Text fontSize="2xl" fontWeight="bold" color="red.500">
                            Verifică-ți emailul
                        </Text>
                        
                        <Text fontSize="lg" color="gray.600" textAlign="center">
                            Am trimis un link de confirmare la adresa ta de email. 
                            Te rugăm să accesezi linkul pentru a-ți activa contul.
                        </Text>
                        
                        <Text fontSize="md" color="gray.500" textAlign="center">
                            Nu ai primit emailul? Verifică folderul de spam sau 
                            încearcă să te înregistrezi din nou.
                        </Text>
                        
                        <Button
                            as={Link}
                            to={`${BASE_ROUTE}login`}
                            colorScheme="red"
                            size="lg"
                            width="full"
                            bg="red.500"
                            _hover={{ bg: "red.400" }}
                        >
                            Mergi la pagina de conectare
                        </Button>
                        
                        <Text fontSize="sm" color="gray.400">
                            După confirmarea emailului, vei putea să te conectezi la cont.
                        </Text>
                    </VStack>
                </Box>
            </Container>
        </Box>
    );
};