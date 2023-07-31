import { Flex, Box, Text, Icon, IconButton } from "@chakra-ui/react";
import { ElementType } from "react";
import {RiDownload2Fill} from 'react-icons/ri'
import { QrCodeImageModal } from "../Modal/QrCodeImageModal";
export const ReceiveButton = ({address,isOpen, onClick, onClose}) => {
  return (
    <Box as="a" mx="auto" color="gray.900">
      <Flex flexDir="row" align="center" bg="gray.50" borderRadius={8} pr="2">
        <IconButton
          aria-label="receive"
          variant="filled"
          onClick={onClick}
          size="sm"
          icon={<Icon as={RiDownload2Fill} />}
        />
        <Text fontSize="0.85rem">Receive</Text>
      </Flex>
      <QrCodeImageModal onClose={onClose} address={address} isOpen={isOpen}></QrCodeImageModal>
    </Box>
  );
};
