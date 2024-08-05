import React from 'react';

import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  Flex,
  Image,
} from '@chakra-ui/react';


export const JobCard = () => {
  return (
    <Center py={6}>
      <Box
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Flex justifyContent="center" alignItems="center">
          <Box
            my={8}
            width="100px"
            height="100px"
            // overflow="hidden"
            // overflowY="auto"
            // rounded={'lg'}
            // boxShadow={'2xl'}
          >
            <Image
              src={
                'data:image/png;base64,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'
              }
              rounded={'lg'}
              alt="Staion photo"
              width="100%"
              height="100%"
              objectFit={'cover'}
            />
          </Box>
        </Flex>

        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={3}>
          <List spacing={3}>
            <ListItem>
              <Flex alignItems="center" justifyContent="center" mb={2}>
                {/*<Box mr={3} mt={3}>*/}
                {/*  <FaCarSide size={25} />*/}
                {/*</Box>*/}
                <Text fontSize={'md'} mt={3}>
                  Company Name
                </Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center" justifyContent="center" mb={2}>
                {/*<Box mr={3} mt={3}>*/}
                {/*  <FaCarSide size={25} />*/}
                {/*</Box>*/}
                <Text
                  color={'gray.500'}
                  fontSize={'md'}
                  textTransform={'uppercase'}
                >
                  3 locuri
                </Text>
              </Flex>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Center>
  );
}