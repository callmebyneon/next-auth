import { getSession } from "@/libs/getSession";

export default async function Home() {
  const session = await getSession();
  return (
    <>
      <h1>Next Auth Demo</h1>
      {session && <pre>session: {JSON.stringify(session, null, 2)}</pre>}
    </>
  );
}
