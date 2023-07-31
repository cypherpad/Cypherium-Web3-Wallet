import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  HStack,
  Button,
  Text,
  List,
  ListItem,
  Box,
  Circle,
  VStack,
  Switch,
  Textarea,
  Tooltip,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { RiClipboardFill } from "react-icons/ri";
import { useCookies } from "react-cookie";
import { WalletService } from "../../services/wallet/wallet.service";
import { environment } from "../../environment/environment";
import { fsync, writeFile } from "fs";
import router from "next/router";

export const SettingModal = ({
  show,
  onClose,
  wallets,
  currentWallet,
  switchWallet,
  switchNetwork,
  currentNetwork,
}) => {
  const [cookie, setCookie] = useCookies(["wallets"]);
  const toast = useToast();
  const service = new WalletService();
  const [accounts, setAccounts] = useState(wallets);
  const [revealMnemonic, setRevealMnemonic] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const addWallet = async () => {
    var valid = service.validateMnemonic(wallets[0].mnemonic);
    if (!valid) {
      alert(`Invalid mnemonic`);
    } else {
      var wallet = service.fromMnemonic(wallets[0].mnemonic, wallets.length);
      wallets.push(wallet);
      setCookie("wallets", JSON.stringify(wallets), {
        path: "/",
        maxAge: 3600 * 24 * 1000,
      });
      setAccounts(wallets);
      localStorage.setItem('wallets',JSON.stringify(wallets));
      alert(`Success add new wallet with address ${wallet.address}`);
    }
  };
  const downloadFile = async () => {
    router.push('/download')
  };
  return (
    <Modal
      motionPreset="slideInBottom"
      isOpen={show}
      onClose={onClose}
      closeOnOverlayClick={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack justifyContent="space-between">
            <Text>Setting</Text>
            <Switch
              id={"network-switch"}
              onChange={(evt) => {
                if (currentNetwork.name === "mainnet") {
                  switchNetwork(environment.testnet);
                } else {
                  switchNetwork(environment.mainnet);
                }
              }}
              isChecked={currentNetwork.name === "mainnet"}
            >
              {currentNetwork.name}
            </Switch>
          </HStack>
        </ModalHeader>
        <ModalBody>
          <Box>
            <Text fontWeight={"bold"} fontSize={"large"}>
              Accounts
            </Text>
          </Box>
          <List
            height={"35vh"}
            style={{
              overflowY: accounts.length < 5 ? "hidden" : "scroll",
              overflowX: "hidden",
            }}
          >
            {accounts.map((wallet, index) => (
              <ListItem
                paddingY={"1vh"}
                paddingX="2vh"
                key={wallet}
                marginY="2"
                cursor={index == currentWallet ? "cursor" : "pointer"}
                _hover={{ "background-color": "gray", color: "white" }}
                onClick={(evnt) => {
                  switchWallet(index, currentNetwork);
                }}
              >
                <HStack justify={"space-between"} align={"start"}>
                  <Box>
                    <VStack align={"start"}>
                      <Text>{wallet.name}</Text>
                      <Text fontSize={"2vh"}>
                        {wallet.address.toLowerCase()}
                      </Text>
                    </VStack>
                  </Box>
                  <Box>
                    {index == currentWallet ? (
                      <Circle size="2vh" bg="green" color="white"></Circle>
                    ) : (
                      <Box></Box>
                    )}
                  </Box>
                </HStack>
              </ListItem>
            ))}
          </List>
          <Box>
            <Button
              width={"100%"}
              colorScheme={"blue"}
              onClick={(event) => addWallet()}
            >
              Add Account
            </Button>
          </Box>
          <Box width={"100%"} marginTop={"2vh"}>
            {revealMnemonic ? (
              <HStack>
                <Textarea
                  disabled={false}
                  color={"black"}
                  defaultValue={currentWallet.mnemonic}
                  name="mnemonic"
                  aria-label="Mnemonic"
                ></Textarea>
                <Icon
                  as={RiClipboardFill}
                  cursor={"pointer"}
                  onClick={() => {
                    toast({
                      duration: 1000,
                      status: "success",
                      title: "success",
                      description: "Success copied mnemonic",
                      isClosable: true,
                    });
                    navigator.clipboard
                      .writeText(currentWallet.mnemonic)
                      .then((val) => {
                        setRevealMnemonic(false);
                      });
                  }}
                ></Icon>
              </HStack>
            ) : (
              <Button
                width={"100%"}
                colorScheme={"blue"}
                onClick={(event) => setRevealMnemonic(true)}
              >
                Reveal Mnemonic
              </Button>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
