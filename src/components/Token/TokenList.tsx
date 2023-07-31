import { ListItem, List } from "@chakra-ui/react";
import { TokenItem } from "./Token";

export const TokenList = ({ item, onClick }) => {
  return (
    <List
      style={{
        overflowY: item.tokens.length < 5 ? "hidden" : "scroll",
        overflowX: "hidden",
      }}
    >
      {item.tokens.map((token) => (
        <ListItem key={token} marginY="2">
          <TokenItem token={token} onClick={()=>onClick(token)}></TokenItem>
        </ListItem>
      ))}
    </List>
  );
};