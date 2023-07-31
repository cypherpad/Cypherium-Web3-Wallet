import { Flex, Box, Text, Icon, IconButton } from "@chakra-ui/react";
import {RiUpload2Fill} from 'react-icons/ri'
export const SendButton = ({onClick}) => {
  return (
    <Box as="a" mx="auto" color="gray.900">
      <Flex flexDir="row" align="center" bg="gray.50" borderRadius={8} pr="2">
        <IconButton
          aria-label="send"
          variant="filled"
          size="sm"
          onClick={onClick}
          icon={<Icon as={RiUpload2Fill} />}
        />
        <Text fontSize="0.85rem">Send</Text>
      </Flex>
    </Box>
  );
};
