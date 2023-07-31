import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  HStack,
  Button,
  Text,
  PinInput,
  PinInputField,
  Flex,
  Link,
} from "@chakra-ui/react";
import { useCookies } from "react-cookie";

export const PinModal = ({ show, onClose, callback }) => {
  const [cookie, setCookie] = useCookies(["pin"]);
  const [confirmPin, setConfirmPin] = useState(false);
  const [pin, setPin] = useState("");
  const [confirmPinValue, setConfirmPinValue] = useState("");
  const [error, setError] = useState(null);
  return (
    <Modal
      motionPreset="slideInBottom"
      isOpen={show}
      onClose={onClose}
      closeOnOverlayClick={true}
      isCentered={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack justifyContent="center">
            <Text>Secure Your Wallet with Pin</Text>
          </HStack>
        </ModalHeader>
        <ModalBody justifyContent="center" alignContent="center">
          <Flex
            flexDir="column"
            alignItems="center"
            justify="center"
            alignContent="center"
          >
            <Text>{confirmPin ? "Confirm Pin" : "Set New Pin"}</Text>
          </Flex>
          <HStack justify="center" marginTop="5vh">
            <PinInput
              value={confirmPin ? confirmPinValue : pin}
              onChange={(val) => {
                if (confirmPin) {
                  setConfirmPinValue(val);
                } else {
                  setPin(val);
                }
              }}
              onComplete={(val) => {
                if (confirmPin) {
                  setConfirmPinValue(val);
                } else {
                  setPin(val);
                }
              }}
              otp
              mask
            >
              <PinInputField></PinInputField>
              <PinInputField></PinInputField>
              <PinInputField></PinInputField>
              <PinInputField></PinInputField>
              <PinInputField></PinInputField>
              <PinInputField></PinInputField>
            </PinInput>
          </HStack>
          <Flex marginTop="5vh" flexDir="column" alignItems="center">
            <Text color="red">{error == null ? "" : error}</Text>
            <Button
              colorScheme="blue"
              onClick={() => {
                if (confirmPin) {
                  if (confirmPinValue == pin) {
                    setError(null);
                    setCookie("pin", pin, {
                      path: "/",
                      maxAge: 3600 * 24 * 1000,
                    });
                    callback();
                  } else {
                    setError("Pin and confirmation pin must same");
                  }
                } else {
                  setConfirmPin(true);
                }
              }}
            >
              {confirmPin ? "Next" : "Confirm Pin"}
            </Button>
            <Link
              onClick={() => {
                setCookie("pin", null, {
                  path: "/",
                  maxAge: 3600 * 24 * 1000,
                });
                callback();
              }}
              marginTop="5vh"
            >
              <Text colorScheme="blue">Skip</Text>
            </Link>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
