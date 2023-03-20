import { cookies, headers } from "next/headers";

export default async function User() {
  const response = await fetch(
    "http://localhost:3001/user/64044f027a17dfa4fdafb434",
    {
      //   next: { revalidate: 30 },
      cache: "no-cache",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2NDA0NGQ4YzUzYWExYTkzMGU0OGYwNGIiLCJpYXQiOjE2NzkyNDczNTQsImV4cCI6MTY3OTMzMzc1NH0.BpASnOdgFbOMsK9qQX6q1orb2R4M1KYbL6Ud0u94VzU",
      },
    }
  );
  const user = await response.json();
  const userCookies = cookies();
  const userHeaders = headers();

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>;
      <pre>{JSON.stringify(userCookies.getAll(), null, 2)}</pre>;
      <pre>{JSON.stringify(userHeaders.entries(), null, 2)}</pre>;
    </div>
  );
}
