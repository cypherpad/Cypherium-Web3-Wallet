import {
  Box,
  Flex,
  VStack,
  HStack,
  Image,
  Heading,
  useBreakpointValue,
  Text,
  CircularProgress,
} from "@chakra-ui/react";
import { CreateWalletForm } from "../../components/Form/CreateWalletForm";
import { parseCookies } from "../../services/storage.service";
import { useState, useEffect } from "react";
import router from "next/router";
import { PinAuthModal } from "../../components/Modal/PinAuthModal";
import { WalletService } from "../../services/wallet/wallet.service";
export const CreateWallet = ({ data }) => {
  const isMediumVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  const [showPinAuthModal, setShowPinAuthModal] = useState(false);
  useEffect(() => {
    if (!data.isStarted) {
      if (data.isPinActive) {
        setShowPinAuthModal(true);
      } else {
        router.push("/home/balance");
      }
    }
  });
  return (
    <Box>
      <Flex
        h="100vh"
        align={isMediumVersion && "center"}
        justify={"center"}
        bgGradient="linear(to-t, blue.300, yellow.200)"
      >
        
        {data.isStarted ? (
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
            <Flex
              direction="column"
              justify="center"
              align="center"
              mt="8"
              p="8"
            >
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

            <CreateWalletForm></CreateWalletForm>
          </Flex>
        ) : (
          <Flex
            h="100vh"
            flexDir="column"
            align="center"
            justify="center"
            justifyContent="center"
          >
            <VStack align="center">
              <CircularProgress
                isIndeterminate
                color="green.300"
              ></CircularProgress>
            </VStack>
          </Flex>
        )}
      </Flex>
      <PinAuthModal
        callback={() => {
          setShowPinAuthModal(false);
          router.push("/home/balance");
        }}
        currentPin={data.pin}
        onClose={() => {
          setShowPinAuthModal(false);
        }}
        show={showPinAuthModal}
      ></PinAuthModal>
    </Box>
  );
};
CreateWallet.getInitialProps = async ({ req, res }) => {
  var walletService = new WalletService();
  const data = parseCookies(req);
  var isStarted: Boolean = false;
  var isPinActive: Boolean = false;
  if (res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      return {
        data: {
          isStarted: true,
          isPinActive: false,
          pin: null,
        },
      };
    }
  }
  var wallets = walletService.getWalletsFromLocal(data);
  if (wallets.length == 0) {
    isStarted = true;
  }
  if (data.pin !== null && data.wallet != undefined) {
    if (data.pin.length > 0 && data.pin.length === 6) {
      isPinActive = true;
    }
  }
  return {
    data: {
      isStarted: isStarted,
      isPinActive: isPinActive,
      pin: data.pin,
    },
  };
};
export default CreateWallet;
