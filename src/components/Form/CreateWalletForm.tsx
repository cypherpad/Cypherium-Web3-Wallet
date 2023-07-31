import { Flex, Text, Stack, Button, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { WalletService } from "../../services/wallet/wallet.service";
import { PinModal } from "../Modal/PinModal";
import { useState } from "react";
import { useCookies } from "react-cookie";

export const CreateWalletForm = () => {
  var service = new WalletService();
  const [cookie, setCookie] = useCookies(["wallets","current_wallet_index"]);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [mnemonic, setMnemonic]= useState(new WalletService().generateRandomMnemonic());

  const onTapConfirm = async () => {
    var valid = service.validateMnemonic(mnemonic);
    if (!valid) {
      alert(`Invalid mnemonic`);
    } else {
      var wallet = service.fromMnemonic(mnemonic);
      console.log(wallet);
      setCookie("wallets", JSON.stringify([wallet]), {
        path: "/",
        maxAge: 3600 * 24 * 1000,
      });
      setCookie("current_wallet_index", JSON.stringify(0), {
        path: "/",
        maxAge: 3600 * 24 * 1000,
      });
      localStorage.setItem('wallets',JSON.stringify([wallet]));
      alert(`Success create wallet`);
      router.push("/home/balance");
    }
  };
  return (
    <Flex as="form" flexDir="column">
      <Stack spacing="2">
        <Text>Mnemonic</Text>
        <Textarea
          name="mnemonic"
          aria-label="Mnemonic"
          defaultValue={mnemonic}
          onChange={(event)=>setMnemonic(event.target.value)}
        ></Textarea>
      </Stack>
      <Flex flexDir={["column", "row"]} align="center" justify="center">
        <Text color="gray.400" fontSize="15">
          Make sure you already save this mnemonic
        </Text>
      </Flex>
      <Button
        type="button"
        colorScheme="blue"
        fontWeight="900"
        marginTop="5"
        onClick={()=>setShowModal(true)}
      >
        Confirm
      </Button>

      <PinModal
        callback={() => onTapConfirm()}
        show={showModal}
        onClose={() => setShowModal(false)}
      ></PinModal>
    </Flex>
  );
};
