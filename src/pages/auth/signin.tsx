import {
  Box,
  VStack,
  HStack,
  Flex,
  Heading,
  Text,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";

import { RiGithubFill, RiGoogleFill } from "react-icons/ri";

import { ThirdPartSignUp } from "../../components/Button/SignUpButton";
import { SignInForm } from "../../components/Form/SignInForm";

export const SignIn = () => {
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
        justify={isWideVersion ? "flex-start" : "center"}
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
                Crypto Wallet
              </Heading>
            </HStack>
            <Text
              textAlign="center"
              fontSize={["0.8rem", "1rem", "1.2rem"]}
              color="gray.400"
              m="6"
            >
              Where you can buy and exchange cryptocurrency
            </Text>
          </Flex>

          <Flex flexDir="column" justify="center" mt="6">
            {isSmallVersion ? (
              <Flex flexDir="row">
                <ThirdPartSignUp icon={RiGithubFill} name="Github" />
                <ThirdPartSignUp icon={RiGoogleFill} name="Google" />
              </Flex>
            ) : (
              <VStack spacing="2">
                <ThirdPartSignUp icon={RiGithubFill} name="Github" />
                <ThirdPartSignUp icon={RiGoogleFill} name="Google" />
              </VStack>
            )}
            <Text
              mt="6"
              mb="2"
              fontSize={["0.7rem", "0.9rem", "1.1rem"]}
              align="center"
            >
              Or sign in with E-mail
            </Text>

            <SignInForm />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SignIn;
