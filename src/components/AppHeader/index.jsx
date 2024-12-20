import React from 'react';
import {
  FiActivity,
  FiBell,
  FiChevronDown,
  FiBookOpen,
  FiCompass,
  FiHeart,
  FiHome,
  FiLogOut,
  FiMenu,
  FiUser,
} from 'react-icons/fi';
import {
  Avatar,
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

export const AppHeader = () => {
  const LinkItems = [
    { name: 'Acasa', icon: FiHome, href: '/jobs-app/' },
    { name: 'Joburi', icon: FiActivity, href: '/jobs' },
    { name: 'Profile', icon: FiUser, href: '/profile' },
  ];

  const SidebarContent = ({ onClose, ...rest }) => (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          LOGO
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem
          mt={4}
          key={link.name}
          icon={link.icon}
          onClick={() => window.history.pushState({}, '', link.href)}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );

  const NavItem = ({ icon, children, ...rest }) => (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        mt="2"
        p="2"
        mx="7"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'red.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );

  const MobileNav = ({ onOpen, ...rest }) => (
    <Flex
      // ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      backgroundColor={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'space-between' }}
      {...rest}
    >
      <Box display={{ base: 'none', md: 'flex' }}>
        <Text
          // display={{ base: 'space-between', md: 'flex' }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          mt={2}
          ml={4}
          mr={10}
        >
          LOGO
        </Text>
        {LinkItems.map(link => (
          <NavItem
            // mt={4}
            key={link.name}
            icon={link.icon}
            onClick={() => window.history.pushState({}, '', link.href)}
          >
            {link.name}
          </NavItem>
        ))}
      </Box>

      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        LOGO
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        {/*<IconButton*/}
        {/*  size="lg"*/}
        {/*  variant="ghost"*/}
        {/*  aria-label="open menu"*/}
        {/*  icon={<FiBell />}*/}
        {/*/>*/}
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size="md"
                  src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Manea Ciprian</Text>
                  <Text fontSize="xs" color="gray.600">
                    User
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuDivider />
              <MenuItem
                as="a"
                href="#"
                onClick={() => {
                  window.history.pushState({}, '', '/jobs-app/login');
                }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')}>
      {/*<SidebarContent*/}
      {/*  onClose={() => onClose}*/}
      {/*  display={{ base: 'none', md: 'block' }}*/}
      {/*/>*/}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      {/* <Box ml={{ base: 0, md: 60 }} p="4"> */}
      {/*  /!* Content *!/ */}
      {/* </Box> */}
    </Box>
  );
}