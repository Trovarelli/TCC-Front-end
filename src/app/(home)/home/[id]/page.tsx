"use client";

interface HomeProps {
  params: {
    id: string;
  };
}

export default function Home({ params }: HomeProps) {
  //   const router = useRouter();

  //   router.refresh();
  return (
    <div>
      <h1>USER</h1>
      <h1>Usuário: {params.id}</h1>
    </div>
  );
}
