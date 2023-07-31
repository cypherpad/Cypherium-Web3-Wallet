import {
  Box,
  Flex,
  Text,
  Stack,
  Button,
  useBreakpointValue,
  Textarea,
} from "@chakra-ui/react";
import router from "next/router";
import { ChangeEvent, useState } from "react";
import { WalletService } from "../../services/wallet/wallet.service";
import { useCookies } from "react-cookie";
export const ImportWalletForm = () => {
  var service = new WalletService();
  const [mnemonic, setMnemonic] = useState("");
  const [cookie, setCookie] = useCookies(["wallet"]);

  const onTapConfirm = async (event) => {
    var valid = service.validateMnemonic(mnemonic);
    if (!valid) {
      alert(`Invalid mnemonic`);
    } else {
      var wallet = service.fromMnemonic(mnemonic);
      console.log(wallet);
      setCookie("wallet", JSON.stringify(wallet), {
        path: "/",
        maxAge: 3600 * 24 * 1000,
      });
      alert(`Success create wallet`);
      router.push("/home/balance");
    }
  };
  const handleChange = (event: ChangeEvent<{ value: string }>) => {
    setMnemonic(event?.currentTarget?.value);
  };

  return (
    <Flex as="form" flexDir="column">
      <Stack spacing="2">
        <Text>Mnemonic</Text>
        <Textarea
          name="mnemonic"
          aria-label="Mnemonic"
          placeholder="Paste your mnemonic here"
          onChange={handleChange}
        ></Textarea>
      </Stack>
      <Button
        type="button"
        colorScheme="blue"
        fontWeight="900"
        marginTop="5"
        onClick={onTapConfirm}
      >
        Confirm
      </Button>
    </Flex>
  );
};
