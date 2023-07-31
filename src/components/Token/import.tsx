import {
  Box,
  Flex,
  VStack,
  HStack,
  SimpleGrid,
  Button,
  Image,
  Heading,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { CreateWalletForm } from "../Form/CreateWalletForm";
import { ImportWalletForm } from "../Form/ImportWalletForm";

export const ImportWallet = () => {
  const isSmallVersion = useBreakpointValue({
    base: false,
    sm: true,
  });

  const isMediumVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Box>
      <Flex
        h="100vh"
        align={isMediumVersion && "center"}
        justify={"center"}
        bgGradient="linear(to-t, blue.300, yellow.200)"
      >
        {isWideVersion && (
          <Image
            src="/cryptocurrency.png"
            alt="logo"
            position="absolute"
            right="0"
            w="40vw"
            _hover={{
              transition: "transform 0.5s",
              transform: "scale(0.942)",
            }}
          />
        )}

        <Flex
          flexDir="column"
          justify="center"
          borderRadius={isMediumVersion ? 15 : "none"}
          width="100%"
          maxWidth={isMediumVersion ? 567 : "none"}
          bg="gray.900"
          color="gray.50"
          // pt={6}
          px={12}
          py={6}
          ml={isMediumVersion ? "8" : ""}
          position="relative"
        >
          <Flex direction="column" justify="center" align="center" mt="8" p="8">
            <HStack spacing="2">
              <Image src="/bitcoin.svg" alt="bitcoin" w="4rem" />
              <Heading
                fontSize={["1rem", "1.4rem"]}
                fontWeight="900"
                align="center"
              >
                Cypherpad Wallet
              </Heading>
            </HStack>
            <Text
              textAlign="center"
              fontSize={["0.8rem", "1rem", "1.2rem"]}
              color="gray.400"
              m="6"
            >
              Where you can store Cypherium safely
            </Text>
          </Flex>

          <ImportWalletForm></ImportWalletForm>
        </Flex>
      </Flex>
    </Box>
  );
};
export default ImportWallet;
