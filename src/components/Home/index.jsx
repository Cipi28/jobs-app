// export const Home = () => {
//     return (
//         <>
//             Home
//         </>
//     )
// }

import React, { useEffect, useState } from 'react';
import {
  Icon,
  Input,
  Button,
  Flex,
  useDisclosure,
  Heading,
  Box,
  Text,
} from '@chakra-ui/react';
import {JobCard} from '../JobCard';
import {Footer} from '../Footer';

const activeBookings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

export const Home = () => {
  const [showFirstDiv, setShowFirstDiv] = useState(window.innerWidth >= 768);
//   const [centerInfo, setCenterInfo] = useState(window.innerWidth >= 1099);

//   useEffect(() => {
//     const handleResize = () => {
//       setShowFirstDiv(window.innerWidth >= 700);
//       setCenterInfo(window.innerWidth >= 1099);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

  return (
    <>
      <div
        style={{
          display: 'flex',
          height: 'auto',
          // justifyContent: 'center',
          // alignItems: 'center',
        }}
      >
        {showFirstDiv && (
          <div style={{ width: '200px', flexShrink: 0 }}>
            {' '}
            {/* Added flexShrink: 0 */}
            {/* Content for the first div */}
          </div>
        )}
        <Box
          mt={10}
          maxWidth="700px"
          mx={7}
          textAlign={showFirstDiv ? 'left' : 'center'}
          // alignItems="center"
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
            {/* Added flexShrink: 0 */}
            {/* Content for the first div */}
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
            {/* Added flexShrink: 0 */}
            {/* Content for the first div */}
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
            {activeBookings.map(booking => (
                <Box width="300px" mx="auto" className="job-card">
                  <JobCard />
                </Box>
              ))}
          </Flex>
        </Box>
        {showFirstDiv && (
          <div style={{ width: '200px', flexShrink: 0 }}>
            {' '}
            {/* Added flexShrink: 0 */}
            {/* Content for the first div */}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}