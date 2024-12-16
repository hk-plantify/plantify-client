import FundingDetail from "./funding-detail";

interface Props {
  params: Promise<{ id: string }>;
}
export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <>
      <FundingDetail data={data!} />
    </>
  );
}
