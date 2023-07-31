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

export const PinAuthModal = ({ show, onClose, callback, currentPin }) => {
  const [pin, setPin] = useState("");
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
            <Text>Input your pin to continue</Text>
          </HStack>
        </ModalHeader>
        <ModalBody justifyContent="center" alignContent="center">
          <Flex
            flexDir="column"
            alignItems="center"
            justify="center"
            alignContent="center"
          ></Flex>
          <HStack justify="center" marginTop="5vh">
            <PinInput
              onChange={(val) => {
                setPin(val);
              }}
              onComplete={(val) => {
                setPin(val);
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
                if (currentPin == pin) {
                  callback();
                } else {
                  setError("Invalid pin");
                }
              }}
            >
              OK
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
