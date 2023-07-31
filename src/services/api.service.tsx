export interface TransactionInterface {
  createdAt: String;
  value: Number;
  hash: String;
  from: String;
  to: String;
  number: Number;
}
export class ApiService {
  async getCypheriumPrice(currency) {
    try {
      var headers = new Array();
      headers["accept"] = "application/json";
      var res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=cypherium&vs_currencies=${currency}`,
        {
          headers: headers,
        }
      );
      var data = await res.json();
      if (res.status != 200) {
        throw res.statusText;
      }
      console.log(data);
      return data.cypherium[currency];
    } catch (e) {
      throw e;
    }
  }
  async getTransaction(address, page = 1) : Promise<Array<TransactionInterface>> {
    try {
      var url = `https://explorerbackend.cypherium.io/search/${address}?pagesize=20`;
      if (page > 1) {
        url = url + `&after=${page - 1}`;
      }
      console.log(`fetching from  : ${url}`);
      var res = await fetch(url);
      if (res.status != 200) {
        throw res.statusText;
      }
      var data = await res.json();
      console.log(`data : ${data.result}`);
      return data.result == null ? [] : data.result.records  == null ? [] : data.result.records;
    } catch (e) {
      throw e;
    }
  }
}
