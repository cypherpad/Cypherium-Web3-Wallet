import {
  Box,
  Flex,
  Center,
  Text,
  Image,
  Button,
  CircularProgress,
  VStack,
} from "@chakra-ui/react";
import { parseCookies } from "../services/storage.service";
import { PinAuthModal } from "../components/Modal/PinAuthModal";

import Link from "next/link";
import router from "next/router";
import { useEffect, useState } from "react";
import { WalletService } from "../services/wallet/wallet.service";

export const Home = ({ data }) => {
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
    <Box w="100vw" h="100vh" bgGradient="linear(to-t, gray.300, blue.200)">
      {data.isStarted ? (
        <Flex
          h="100vh"
          flexDir="column"
          align="center"
          justify="space-evenly"
          pt="20"
        >
          <Center>
            <Text
              fontSize={["1.4rem", "1.6rem", "2rem"]}
              fontWeight="900"
              textAlign="center"
            >
              A place where you can exchange, buy and take care of you crypto
              coins
            </Text>
          </Center>
          <Image src="/home-bitcoin.png" alt="Home background" w="40rem" />

          <Link href="/wallet/create">
            <Button
              type="button"
              variant="filled"
              color="gray.900"
              bg="blue.300"
            >
              Get Started
            </Button>
          </Link>
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
Home.getInitialProps = async ({ req, res }) => {
  var walletService = new WalletService();
  const data = parseCookies(req);
  var isStarted: Boolean = false;
  var isPinActive: Boolean = false;
  if (res) {
    if (data == null) {
      return {
        data: {
          isStarted: true,
          isPinActive: false,
          pin: null,
        },
      };
    } else {
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
  }
  var wallet = walletService.getWalletsFromLocal(data);
  console.log(wallet.length);
  if (wallet.length == 0) {
    isStarted = true;
  }
  if (data.pin !== null && data.pin !== undefined) {
    console.log(data.pin);
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
export default Home;
