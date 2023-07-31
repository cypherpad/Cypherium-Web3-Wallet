import { Box, Flex, HStack, useBreakpointValue } from "@chakra-ui/react";
import { TokenList } from "../../components/Token/TokenList";
import { HomeHeader } from "../../components/Header/HomeHeader";
import { ReceiveButton } from "../../components/Button/ReceiveButton";
import { SettingModal } from "../../components/Modal/SettingModal";
import { BalanceSummary } from "../../components/Token/BalanceSummary";
import { SendButton } from "../../components/Button/SendButton";
import { Web3Service } from "../../services/web3.service";
import { environment } from "../../environment/environment";
import { BigNumber } from "ethers";
import { ApiService, TransactionInterface } from "../../services/api.service";
import { TabGroup } from "../../components/Button/TabGroup";
import { useEffect, useState } from "react";
import { TransactionList } from "../../components/Transaction/Transaction";
import { SendTokenModal } from "../../components/Modal/SendTokenModal";
import { WalletService } from "../../services/wallet/wallet.service";
import { WalletHandler } from "../../handlers/wallet";
import { parseCookies } from "../../services/storage.service";
import { useCookies } from "react-cookie";
import {commonTokens} from '../../constant/tokens';
import {
  TransactionSuccessModal,
  exampleTx,
} from "../../components/Modal/TransactionSuccessModal";
import { TransactionFailureModal } from "../../components/Modal/TransactionFailureModal";
import { TransactionHistory } from "../../interface/wallet";
export default function HomeBalance({ data }) {
  const [cookie, setCookie] = useCookies([
    "current_wallet_index",
    "transactions",
    "network",
  ]);
  const [currency, setCurrency] = useState(data.currency);
  const [cphBalance, setCphBalance] = useState(data.cphBalance);
  const [balanceInFiat, setBalanceInFiat] = useState(data.balanceInFiat);
  const [currentWallet, setCurrentWallet] = useState(data.currentWallet);
  const [tokens, setTokens] = useState(data.tokens);
  const [wallet, setWallet] = useState(data.wallet);
  const [activeTabs, setActiveTabs] = useState("Assets");
  const [showModal, setShowModal] = useState(false);
  const [showSendTokenModal, setShowTokenModal] = useState(false);
  const [error, setError] = useState(data.error);
  const [transactions, setTransactions] = useState(data.transactions);
  const [showQrCodeModal, setShowQrCodeModal] = useState(false)
  const [transactionSuccessModal, setTransactionSuccessModal] = useState({
    isShow: false,
    tx: null,
  });
  const [transactionFailModal, setTransactionFailModal] = useState({
    isShow: false,
    message: null,
  });
  const [network, setNetwork] = useState(data.network);

  const isMediumVersion = useBreakpointValue({
    base: false,
    md: true,
  });
  useEffect(() => {});
  const switchNetwork = async (network) => {
    await setCookie("network", network, {
      path: "/",
      maxAge: 3600 * 24 * 1000,
    });
    await setNetwork(network);
    await switchWallet(cookie.current_wallet_index, network);
  };
  const switchWallet = async (index: number, network) => {
    var cphBalance = 0;
    var balanceInFiat = 0;
    WalletHandler.switchWallet(
      data.wallets[index],
      tokens,
      (tb) => {
        setTokens(tb);
        setWallet(data.wallets[index]);
        setCurrentWallet(index);
        setCookie("current_wallet_index", index, {
          path: "/",
          maxAge: 3600 * 24 * 1000,
        });
        tb.map((e) => {
          cphBalance = cphBalance + parseFloat(e.ui_balance);
          balanceInFiat = balanceInFiat + parseFloat(e.money_balance);
          setCphBalance(cphBalance);
          setBalanceInFiat(balanceInFiat);
          console.log(`Money Balance ${e.money_balance}`);
          console.log(balanceInFiat);
        });
        WalletHandler.getTransacstionsHandler(data.wallets[index], (tx) => {
          setTransactions(tx);
        });
      },
      (tb, err) => {
        setTokens(tb);
        setWallet(data.wallets[index]);
        setError(err);
        setCurrentWallet(index);
        setCookie("current_wallet_index", index, {
          path: "/",
          maxAge: 3600 * 24 * 1000,
        });
        tb.map((e) => {
          console.log(balanceInFiat);
          cphBalance = cphBalance + parseFloat(e.ui_balance);
          balanceInFiat = balanceInFiat + parseFloat(e.money_balance);
          setCphBalance(cphBalance);
          setBalanceInFiat(balanceInFiat);
        });
        WalletHandler.getTransacstionsHandler(data.wallets[index], (tx) => {
          setTransactions(tx);
        });
      },
      network
    );
    setShowModal(false);
  };
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
        >
          <HomeHeader
            wallet={wallet}
            openSetting={() =>{
              console.log(wallet.mnemonic); setShowModal(true)
            }}
          ></HomeHeader>
          <SettingModal
            show={showModal}
            wallets={data.wallets}
            onClose={() => setShowModal(false)}
            currentWallet={wallet}
            switchWallet={switchWallet}
            currentNetwork={network}
            switchNetwork={(network) => {
              switchNetwork(network);
            }}
          ></SettingModal>
          <BalanceSummary
            valueInFiat={balanceInFiat}
            cphAmount={cphBalance}
            currency={currency}
          ></BalanceSummary>
          <Flex flexDir="row" align="center" justify="center" marginY="2">
            <HStack justifyContent="center" alignContent="center">
              <ReceiveButton onClick={()=>{
                setShowQrCodeModal(true)
              }} address={currentWallet.address} isOpen={showQrCodeModal} onClose={()=>{
                setShowQrCodeModal(false)
              }}></ReceiveButton>
              <SendButton onClick={() => setShowTokenModal(true)}></SendButton>
            </HStack>
          </Flex>
          <TabGroup
            items={environment.tabItems}
            current={activeTabs}
            onClick={(val) => {
              setActiveTabs(val);
            }}
          ></TabGroup>
          {activeTabs == "Assets" ? (
            <Flex flexDir="column" px="5" py="5" style={{ height: "50vh" }}>
              <TokenList
                item={{ tokens: tokens, wallet: wallet }}
                onClick={null}
              ></TokenList>
            </Flex>
          ) : (
            <Flex flexDir="column" px="5" py="5" style={{ height: "50vh" }}>
              <TransactionList
                item={{
                  transactions: transactions,
                  myAddress: wallet.address,
                }}
              ></TransactionList>
            </Flex>
          )}
        </Flex>
      </Flex>
      <SendTokenModal
        onSendToken={(sendTokenFormValue) => {
          new Web3Service(network).transferCph(
            wallet.address,
            sendTokenFormValue.address,
            // BigNumber.from(10)
            //   .pow(sendTokenFormValue.decimals)
            //   .mul(sendTokenFormValue.value.value * sendTokenFormValue.value.e)
            //   .div(sendTokenFormValue.value.e).toHexString(),
            sendTokenFormValue.value.value,
            "0",
            wallet.privateKey,
            null,
            wallet.mnemonic,
            sendTokenFormValue.token,
            (tx) => {
              setTransactionSuccessModal({
                isShow: true,
                tx: tx,
              });
            },
            (message) => {
              setTransactionFailModal({
                isShow: true,
                message: message,
              });
            }
          );
          setShowTokenModal(false);
        }}
        onClose={() => setShowTokenModal(false)}
        show={showSendTokenModal}
        wallet={wallet}
        tokens={tokens}
      ></SendTokenModal>
      {transactionSuccessModal.isShow === true && (
        <TransactionSuccessModal
          tx={transactionSuccessModal.tx}
          isOpen={transactionSuccessModal.isShow}
          onClose={() => {
            setTransactionSuccessModal({
              isShow: false,
              tx: null,
            });
            var txList = transactions;
            var txs = [transactionSuccessModal.tx].concat(txList);
            setCookie("transactions", txs, {
              path: "/",
              maxAge: 3600 * 24 * 1000,
            });
            switchWallet(cookie.current_wallet_index, network);
          }}
        ></TransactionSuccessModal>
      )}
      {transactionFailModal.isShow && (
        <TransactionFailureModal
          message={transactionFailModal.message}
          isOpen={transactionFailModal.isShow}
          onClose={() =>
            setTransactionFailModal({
              isShow: false,
              message: null,
            })
          }
        ></TransactionFailureModal>
      )}
    </Box>
  );
}
HomeBalance.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req);
  var balanceInFiat = 0.0;
  const apiService = new ApiService();
  var cphBalance = 0;
  var transactions: TransactionHistory[] =
    data.transactions === null || data.transactions === undefined
      ? Array()
      : JSON.parse(data.transactions);
  var error = null;
  var walletService = new WalletService();
  if (res) {
    if (data == null || data === undefined) {
      res.writeHead(301, { Location: "/" });
      res.end();
    } else {
      if (Object.keys(data).length === 0 && data.constructor === Object) {
        res.writeHead(301, { Location: "/" });
        res.end();
      }
    }
  }
  var currentWallet = data.current_wallet_index;
  if (currentWallet === null || currentWallet === undefined) {
    res.writeHead(301, { Location: "/wallet/create" });
    res.end();
  } else {
    currentWallet = data.current_wallet_index;
  }
  var wallets = walletService.getWalletsFromLocal(data);
  if (wallets.length === 0) {
    res.writeHead(301, { Location: "/wallet/create" });
    res.end();
  }
  var network =
    data.network === null || data.network === undefined
      ? {
          chainId: environment.mainnet.chainId,
          provider: environment.mainnet.provider,
          name: environment.mainnet.name,
        }
      : JSON.parse(data.network);
  var wallet = wallets[currentWallet];
  var tokens =
    data.tokens == null ? commonTokens : JSON.parse(data.tokens);
  var tokenBalance = new Array();
  await WalletHandler.switchWallet(
    wallet,
    tokens,
    (tb) => {
      tokenBalance = tb;
    },
    (tb, err) => {
      tokenBalance = tb;
      error = err;
    },
    network
  );
  for (var i = 0; i < tokenBalance.length; i++) {
    cphBalance = cphBalance + parseFloat(tokenBalance[i].ui_balance);
    balanceInFiat = balanceInFiat + parseFloat(tokenBalance[i].money_balance);
  }
  console.log({
    wallet: wallet,
    tokens: tokenBalance,
    cphBalance: cphBalance,
    balanceInFiat: balanceInFiat,
    currency: environment.currency,
    transactions: transactions,
    error: error,
    wallets: wallets,
  });
  return {
    data: {
      wallet: wallet,
      tokens: tokenBalance,
      cphBalance: cphBalance,
      balanceInFiat: balanceInFiat,
      currency: environment.currency,
      transactions: transactions,
      error: error,
      wallets: wallets,
      currentWallet: parseInt(currentWallet),
      network: network,
    },
  };
};
