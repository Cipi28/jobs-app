import React from 'react';
import {
  Box,
  Center,
  Text,
  List,
  ListItem,
  useColorModeValue,
  Flex,
  Image, Icon,
} from '@chakra-ui/react';
import {Link} from "react-router-dom";
import {FaStar} from "react-icons/fa";
import {BASE_ROUTE} from "../../App.jsx";


export const CompanyCard = (props) => {

  const { company } = props;

  console.log("Company", company);
  return (
    <Link to={`${BASE_ROUTE}company/${company.id}`}>
      <Center py={6} >
        <Box
            mx={4}
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
            >
              <Image
                  src={company.logo_image || '/placeholder.png'}
                  alt={`${company.name} Logo`}
                  boxSize="100px"
                  objectFit="contain"
              />
            </Box>
          </Flex>

          <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={3}>
            <List spacing={1}>
              <ListItem>
                <Flex alignItems="center" justifyContent="center" >
                  <Text fontSize={'md'} mt={1}>
                    {company.name}
                  </Text>
                </Flex>
              </ListItem>
              <ListItem>
                <Flex alignItems="center" justifyContent="center" mb={4}>
                  {Array(4)
                      .fill(0)
                      .map((_, i) => (
                          <Icon key={i} as={FaStar} color="yellow.400" />
                      ))}
                  <Icon as={FaStar} color="gray.300" />
                </Flex>
              </ListItem>
              <ListItem>
                <Flex alignItems="center" justifyContent="center" mb={1}>
                  <Text
                    color={'gray.500'}
                    fontSize={'md'}
                    textTransform={'uppercase'}
                  >
                    {company.jobsNumber} locuri
                  </Text>
                </Flex>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Center>
    </Link>
  );
}