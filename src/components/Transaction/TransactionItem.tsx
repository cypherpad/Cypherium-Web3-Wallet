import { Box, Flex, Text, HStack, Icon } from "@chakra-ui/react";
import { RiDownload2Fill, RiUpload2Fill } from "react-icons/ri";

export const TransactionItem = ({ transaction, myAddress }) => {
  return (
    <Box bgColor="gray.800">
      <Flex direction="column" align="start" justifyContent="space-between">
        <HStack
          spacing="3"
          justify="space-between"
          paddingLeft="5"
          paddingRight="5"
          paddingTop="2"
          paddingBottom="2"
        >
          <Flex
            flexDir="row"
            align="center"
            alignContent="center"
            justify="space-between"
            justifyContent="space-between"
          >
            <Box marginRight="5vh">
              <Icon
                as={
                  transaction.from.toLowerCase() === myAddress.toLowerCase()
                    ? RiUpload2Fill
                    : RiDownload2Fill
                }
                fontSize="30px"
              ></Icon>
            </Box>
          </Flex>
          <Flex flexDir="column" align="start" justifyItems="start">
            <Text textAlign="left" align="left" color="gray.600">
              {transaction.from.toLowerCase() === myAddress.toLowerCase()
                ? "Sending To : " +
                  transaction.to.toString().substr(0, 28).toLowerCase() +
                  "..."
                : "Receive From : " +
                  transaction.from.toString().substr(0, 28).toLowerCase() +
                  "..."}
            </Text>
            <Text>
              {Number.parseFloat(transaction.value) / Math.pow(10, 18)} CPH
            </Text>
          </Flex>
        </HStack>
      </Flex>
    </Box>
  );
};
