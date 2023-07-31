import { FunctionComponent } from "react";
import {
  Account,
  AccountTransaction,
  Receiver,
  Token,
  TransactionValue,
} from "../../interface/wallet";
import { Box, Button, HStack, Text, Flex } from "@chakra-ui/react";
type ConfirmTransactionProps = {
  token: Token;
  account: Account;
  value: TransactionValue;
  receiver: Receiver;
  onOK: (transaction: AccountTransaction) => void;
};
export const ConfirmTransaction: FunctionComponent<ConfirmTransactionProps> = ({
  token,
  account,
  value,
  receiver,
  onOK,
}) => (
  <Box>
    <Flex flexDir="column">
      <Box>
        <HStack justify={"space-between"}>
        <Text>From : </Text>
      <Text>{account.name}</Text>
        </HStack>
      </Box>
      <Box marginTop={"1vh"}>
        <HStack justify={"space-between"}>
          <Text>{account.address}</Text>
        </HStack>
      </Box>
    </Flex>

    <Flex flexDir="column" marginTop={"4vh"}>
      <Text>To : </Text>
      <Box>
        <Text>{receiver.address}</Text>
      </Box>
    </Flex>

    <Flex flexDir="column" marginTop={"4vh"}>
      <Text>Value : </Text>
      <Box>
        <Text>
          {value.smallValue} {token.symbol}
        </Text>
      </Box>
    </Flex>

    <Flex flexDir={"row"} justify="space-between" marginTop={"4vh"}>
      <Button
        colorScheme={"blue"}
        width={"100%"}
        onClick={() =>
          onOK({
            receiver: receiver,
            sender: {
              address: account.address,
              name: account.name,
            },
            token: token,
            value: value,
            time: Date.now.toString(),
          })
        }
      >
        OK
      </Button>
    </Flex>
  </Box>
);
