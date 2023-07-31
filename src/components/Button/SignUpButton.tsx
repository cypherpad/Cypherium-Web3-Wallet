import { Flex, Box, Text, Icon, IconButton } from "@chakra-ui/react";
import { ElementType } from "react";

interface SignUpButtonProps {
  icon: ElementType;
  name: string;
}

export const ThirdPartSignUp = ({ icon, name }: SignUpButtonProps) => {
  return (
    <Box as="a" mx="auto" color="gray.900">
      <Flex flexDir="row" align="center" bg="gray.50" borderRadius={8} pr="2">
        <IconButton
          aria-label={name}
          variant="filled"
          size="sm"
          icon={<Icon as={icon} />}
        />
        <Text fontSize="0.85rem">Sign In with {name}</Text>
      </Flex>
    </Box>
  );
};
