import React from "react";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { Session } from "next-auth";
import { isAuthenticated } from "../../utils/isAuthenticated";
import Image from "next/image";
import { signOut } from "next-auth/react";

type UserMenuProps = {
  session: Session | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ session }) => {
  if (!isAuthenticated(session) || !session) return null;

  return (
    <Menu>
      <MenuButton>
        <Flex align="center" gap={2}>
          <Text color="white" fontSize="sm">
            {session.user.name}
          </Text>
          <Box
            borderWidth={1}
            borderColor="primary"
            rounded="full"
            width="55px"
            height="55px"
          >
            {session.user.picture && (
              <Image
                style={{ borderRadius: "50%" }}
                width={55}
                height={55}
                src={session.user.picture}
              />
            )}
          </Box>
          <Box opacity={0.7}>
            <FaChevronDown color="white" size="12px" />
          </Box>
        </Flex>
      </MenuButton>
      <MenuList bgColor="secondary" color="white">
        <MenuItem
          bgColor="secondary"
          _focus={{ bgColor: "secondary" }}
          onClick={() => signOut()}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
