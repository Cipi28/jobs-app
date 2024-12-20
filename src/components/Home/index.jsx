import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
  Input,
  Button,
  Flex,
  Box,
  Text,
} from '@chakra-ui/react';
import {CompanyCard} from '../CompanyCard';
import {Footer} from '../Footer';

export const Home = () => {
  const [showFirstDiv, setShowFirstDiv] = useState(window.innerWidth >= 768);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setShowFirstDiv(window.innerWidth >= 700);
      setCenterInfo(window.innerWidth >= 1099);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/companies', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCompanies(response.data);
        console.log('Companies:', response.data);
      } catch (error) {
        //todo: handle error
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();

  }, []);


  return (
    <>
      <div
        style={{
          display: 'flex',
          height: 'auto',
        }}
      >
        {showFirstDiv && (
          <div style={{ width: '200px', flexShrink: 0 }}>
            {' '}
          </div>
        )}
        <Box
          mt={10}
          maxWidth="700px"
          mx={7}
          textAlign={showFirstDiv ? 'left' : 'center'}
        >
          <Text color={'red'} fontWeight="bold" fontSize={'5xl'} opacity={0.7}>
            Gaseste jobul potrivit pentru tine
          </Text>
          <Text color={''} fontSize={'xl'}>
            Platforma noastra iti ofera acces la o colectie intreaga de joburi
            in diverse domenii. Simplu, rapid si eficient!
          </Text>
          <Box display="block">
            <Input
              height={50}
              variant="filled"
              placeholder="Cuvinte cheie"
              maxWidth="300px"
              mt={6}
            />
          </Box>
          <Box display="block">
            <Input
              height={50}
              variant="filled"
              placeholder="Oras"
              maxWidth="300px"
              mt={6}
            />
          </Box>
          <Box display="block">
            <Button
              mt={10}
              mb={10}
              w="35%"
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
              Cauta
            </Button>
          </Box>
        </Box>
        {showFirstDiv && (
          <div style={{ width: '200px', flexShrink: 0 }}>
            {' '}
          </div>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {showFirstDiv && (
          <div style={{ width: '200px', flexShrink: 0 }}>
            {' '}
          </div>
        )}
        <Box borderRadius="lg" overflow="hidden" mb={10}>
          <Text
            mt={10}
            color={'red'}
            fontWeight="bold"
            fontSize={'5xl'}
            opacity={0.7}
            align="center"
          >
            Oferte de munca
          </Text>
          <Text color={''} fontSize={'md'} align="center" mb={5}>
            Locuri de munca in 42 de domenii. Deswcopera cele mai noi joburi
          </Text>
          <Flex alignItems="center" wrap="wrap" mb={10}>
            {companies.map((company, index) => (
                <Box width="300px" mx="auto" className="job-card" key={index} >
                  <CompanyCard
                      key={index}
                      company={company}
                  />
                </Box>
              ))}
          </Flex>
        </Box>
        {showFirstDiv && (
          <div style={{ width: '200px', flexShrink: 0 }}>
            {' '}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}