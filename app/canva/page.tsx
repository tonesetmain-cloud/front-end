import React from "react";
import WithAuth from "@/components/WithAuth";

const CanvaPage = () => {
  return <div>Canva Page</div>;
};

export default function ProtectedCanvas() {
  return (
    <WithAuth>
      <CanvaPage />
    </WithAuth>
  );
}
