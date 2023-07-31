import { ListItem, List, Text } from "@chakra-ui/react";
import { TransactionItem } from "./TransactionItem";

export const TransactionList = ({ item }) => {
  return (
    <List
      style={{
        overflowY: item.transactions.length < 5 ? "hidden" : "scroll",
        overflowX: "hidden",
      }}
      textAlign="center"
    >
      {item.transactions.length === 0 ? (
        <Text>You Have No Transaction</Text>
      ) : (
        item.transactions.map((transaction) => (
          <ListItem key={transaction} marginY="2">
            <TransactionItem
              transaction={transaction}
              myAddress={item.myAddress}
            ></TransactionItem>
          </ListItem>
        ))
      )}
    </List>
  );
};
