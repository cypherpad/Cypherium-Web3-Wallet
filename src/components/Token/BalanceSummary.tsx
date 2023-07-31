import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { ApiService } from "../../services/api.service";
import cr from 'currency-formatter'

export const BalanceSummary = ({ cphAmount, valueInFiat, currency }) => {
  return (
    <Box marginTop="20px">
      <Flex flexDir="column" align="center">
        <Box borderRadius="25" borderWidth="2px" width="52px" height="52px" alignContent="center">
          <Image src="/cph-logo.jpg" layout="fill" objectFit="contain" borderRadius="50" height="48px" width="48px"></Image>
        </Box>
        <Text marginTop="10px" fontSize="24px">{(cphAmount).toString()+" CPH"}</Text>
        <Text color="gray.400">{cr.format(valueInFiat,{code:currency.toUpperCase()})}</Text>
      </Flex>
    </Box>
  );
};
