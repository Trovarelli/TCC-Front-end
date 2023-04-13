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
    <div className="bg-background p-4 min-h-screen">
      <h1>USER</h1>
      <h1>Usuário: {params.id}</h1>
    </div>
  );
}
