import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalFooter,
  Button,
  ModalBody,
  Flex,
  ModalHeader,
  Text,
  Input,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { TokenList } from "../Token/TokenList";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useState } from "react";
import { ConfirmTransaction } from "../Transaction/ConfirmTransaction";
import { BigNumber } from "ethers";
import {AmountValue, CurrencyHandler} from "./../../handlers/currency";
type SendTokenFieldProps = {
  token: any;
  callback: (value: number, address: string) => void;
};
const SendTokenField: FunctionComponent<SendTokenFieldProps> = ({
  token,
  callback,
}) => {
  const [address, setAddress] = useState("");
  const [value, setValue] = useState(0);
  return (
    <Flex flexDir={"column"}>
      <Input
        value={value}
        onChange={(val) => setValue(val.target.valueAsNumber)}
        type="number"
        placeholder={"Amount " + token.symbol}
      ></Input>
      <Input
        type="text"
        placeholder={"Receiver address"}
        marginTop="5vh"
        onChange={(val) => setAddress(val.target.value)}
        value={address}
      ></Input>
      <Button
        colorScheme="blue"
        onClick={() => {
          callback(value, address);
        }}
        marginTop="5vh"
      >
        Send
      </Button>
    </Flex>
  );
};
const PopUpHeader = ({
  token,
  selectToken,
  setSelectToken,
  isConfirm,
  setIsConfirm,
}) => {
  var child = (
    <Flex>
      <IconButton
        aria-label="back"
        variant="filled"
        size="sm"
        onClick={() => setIsConfirm()}
        icon={<Icon as={RiArrowLeftSLine} fontSize="5vh" />}
      ></IconButton>
      <Text>Confirm Transaction</Text>
    </Flex>
  );
  if (!isConfirm) {
    if (token == null || selectToken == true) {
      child = (
        <Text>{token == null ? "Select Token" : "Send " + token.symbol}</Text>
      );
    } else {
      child = (
        <Flex>
          <IconButton
            aria-label="back"
            variant="filled"
            size="sm"
            onClick={() => setSelectToken()}
            icon={<Icon as={RiArrowLeftSLine} fontSize="5vh" />}
          ></IconButton>
          <Text>{token == null ? "Select Token" : "Send " + token.symbol}</Text>
        </Flex>
      );
    }
  }
  return <Flex flexDir="row">{child}</Flex>;
};
const PopUpBody = ({
  account,
  onOK,
  receiver,
  token,
  value,
  selectToken,
  confirmTransaction,
  tokenListComp,
  onSubmitTokenForm,
}) => {
  var child = (
    <ConfirmTransaction
      account={account}
      onOK={onOK}
      receiver={receiver}
      token={token}
      value={value}
    ></ConfirmTransaction>
  );
  if (!confirmTransaction) {
    if (token == null || selectToken === true) {
      child = tokenListComp;
    } else {
      child = (
        <SendTokenField
          token={token}
          callback={onSubmitTokenForm}
        ></SendTokenField>
      );
    }
  }
  return child;
};
type TokenListProps = {
  tokens: any;
  wallet: any;
  onClickToken: (token, status: boolean) => void;
};
const TokenListComp: FunctionComponent<TokenListProps> = ({
  tokens,
  wallet,
  onClickToken,
}) => (
  <Flex flexDir="column" px="5" py="5" style={{ height: "50vh" }}>
    <TokenList
      item={{ tokens: tokens, wallet: wallet }}
      onClick={(token) => {
        onClickToken(token, false);
      }}
    ></TokenList>
  </Flex>
);
export const SendTokenModal = ({ show, onClose, onSendToken, tokens, wallet }) => {
  const [token, setToken] = useState(null);
  const [selectToken, setSelectToken] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [sendTokenFormValue, setSendTokenFormValue] = useState({
    address: "",
    value: {
      value : 0,
      e : 1
    },
    token : null,
  });

  return (
    <Modal
      motionPreset="slideInBottom"
      isOpen={show}
      onClose={onClose}
      closeOnOverlayClick={true}
      isCentered={true}
    >
      <ModalOverlay />
      <ModalContent bgColor={"gray.900"} color={"gray.50"}>
        <ModalHeader>
          <PopUpHeader
            key={"popUpHeader"}
            isConfirm={isConfirm}
            setIsConfirm={() => setIsConfirm(false)}
            selectToken={selectToken}
            setSelectToken={() => setSelectToken(true)}
            token={token}
          ></PopUpHeader>
        </ModalHeader>
        <ModalBody>
          <PopUpBody
            token={token}
            value={{
              smallValue: token == null ? 0 : sendTokenFormValue.value.value,
              exactValue:
                token == null
                  ? BigNumber.from(0)
                  : BigNumber.from(10).pow(token.decimals).mul(sendTokenFormValue.value.value * sendTokenFormValue.value.e).div(sendTokenFormValue.value.e) ,
            }}
            onSubmitTokenForm={(value, address) => {
              setSendTokenFormValue({
                address: address,
                value: CurrencyHandler.belowZero(value),
                token : token,
              });
              setIsConfirm(true);
              //callback(sendTokenFormValue);
            }}
            account={wallet}
            confirmTransaction={isConfirm}
            onOK={(accountTransaction) => onSendToken(sendTokenFormValue)}
            receiver={{
              address: sendTokenFormValue.address,
            }}
            selectToken={selectToken}
            tokenListComp={
              <TokenListComp
                onClickToken={(token, status) => {
                  setToken(token);
                  setSelectToken(status);
                }}
                tokens={tokens}
                wallet={wallet}
              ></TokenListComp>
            }
          ></PopUpBody>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} color={"gray.900"}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
