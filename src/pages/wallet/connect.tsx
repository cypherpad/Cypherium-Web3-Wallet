import {
  Box,
  Flex,
  useBreakpointValue,
  VStack,
  Text,
  HStack,
  Button,
} from "@chakra-ui/react";
import { environment } from "../../environment/environment";
import { queryString } from "../../handlers/query";
import { WalletHandler } from "../../handlers/wallet";
import { parseCookies } from "../../services/storage.service";
import { WalletService } from "../../services/wallet/wallet.service";
export default function Connect({ data }) {
  const isMediumVersion = useBreakpointValue({
    base: false,
    md: true,
  });
  return (
    <Box>
      <Flex
        h="100vh"
        align={isMediumVersion && "center"}
        justify={"center"}
        bgGradient="linear(to-t, blue.300, yellow.200)"
      >
        <Flex
          flexDir="column"
          justify="center"
          borderRadius={isMediumVersion ? 15 : "none"}
          width="100%"
          maxWidth={isMediumVersion ? 567 : "none"}
          bg="gray.900"
          color="gray.50"
          // pt={6}
          ml={isMediumVersion ? "8" : ""}
          position="relative"
          paddingY={"5vh"}
        >
          <VStack>
            {data.from === false ? (
              <Text>Failed to connect wallet</Text>
            ) : (
              <VStack>
                <Text>{data.from} want to connect to your wallet</Text>
                <HStack>
                  <Button colorScheme={"red"}>Cancel</Button>
                  <Button
                    colorScheme={"blue"}
                    onClick={() => {
                      WalletHandler.connectWalletCallback(
                        data.message,
                        data.network,
                        data.accounts,
                      );
                    }}
                  >
                    Accept
                  </Button>
                </HStack>
              </VStack>
            )}
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
}

Connect.getInitialProps = async (context) => {
  var data = {
    success: false,
    from: null,
  };
  var query = queryString(context.req.url);
  var cookie = parseCookies(context.req);

  console.log(`Cookie ${cookie.wallets}`);
  console.log(`query : ${query}`);
  console.log(query.get("auth"));
  console.log(`data : ${data}`);

  if (query.get("auth") === null || query.get("auth") === undefined) {
    return {
      data: {
        success: data.success,
        from: data.from,
      },
    };
  }
  var network =
    cookie.network === null || cookie.network === undefined
      ? {
          chainId: environment.mainnet.chainId,
          provider: environment.mainnet.provider,
          name: environment.mainnet.name,
        }
      : JSON.parse(cookie.network);
  var wallets = new WalletService().getWalletsFromLocal(cookie);
  var auth = query.get("auth");
  if (auth != environment.authorizationApp) {
    return {
      data: {
        success: data.success,
        from: data.from,
      },
    };
  }
  data.success = true;
  data.from = "Cypherpad Swap";
  // return context.res.status(200).json({
  //   success: data.success,
  //     from: data.from,
  //     network: network,
  //     accounts : wallets,
  // });
  return {
    data: {
      success: data.success,
      from: data.from,
      message:query.get("message"),
      network: network,
      accounts: wallets,
    },
  };
};
