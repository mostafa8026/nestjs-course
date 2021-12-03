import got from "got";

export interface User {
  name: string;
}

export type User2 = {
  id: number;
};

async function makeRequest() {
  try {
    const response = await got.get("http://api.divar.ir/v8/web-search/mashhad");
    var json = JSON.parse(response.body);
    json.suggestion_list.forEach((_item: string) => {
      console.log(_item);
    });
  } catch (error: any) {
    console.log(error.response.body);
  }
}

makeRequest();

const a: User = {
  name: "asfsdf",
};

console.log(a);
