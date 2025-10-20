import WithAuth from "@/components/WithAuth";

const QuestionsPage = () => {
  return <div></div>;
};

export default function ProtectedCanvas() {
  return (
    <WithAuth>
      <QuestionsPage />
    </WithAuth>
  );
}
