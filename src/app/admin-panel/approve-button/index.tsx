"use client";

const ApproveButton = ({ id }: { id: string }) => {
  const approveUser = async () => {
    await fetch("/api/approve-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    window.location.reload();
  };

  return <button onClick={approveUser}>Approve</button>;
};

export default ApproveButton;
