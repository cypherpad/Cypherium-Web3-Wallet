import { Box, Image, Flex, Text, HStack } from "@chakra-ui/react";

export const TokenItem = ({ token, onClick }) => {
  return (
    <Box bgColor="gray.800" onClick={onClick} cursor={onClick != null ? "pointer" : "none"}>
      <Flex direction="column" justifyContent="space-between">
        <HStack
          spacing="3"
          justifyContent="space-between"
          paddingLeft="5"
          paddingRight="5"
          paddingTop="2"
          paddingBottom="2"
        >
          <Flex direction="row" align="center">
            <Box
              borderRadius="25"
              borderWidth="2px"
              width="50px"
              height="50px"
              alignContent="center"
            >
              <Image
                src={token.url}
                layout="fill"
                objectFit="contain"
                borderRadius="50"
                height="46px"
                width="46px"
              ></Image>
            </Box>
            <Text marginLeft="3vh">{token.name}</Text>
          </Flex>
          <Text>
            {token.ui_balance}{" "}
            {token.symbol}
          </Text>
        </HStack>
      </Flex>
    </Box>
  );
};
