import prisma from "@/lib/db";
import { GetServerSideProps } from "next";

type User = {
  id: string;
  email: string;
  approved: boolean;
};

type Props = {
  users: User[];
};

export default function Admin({ users }: Props) {
  const approveUser = async (id: string) => {
    await fetch("/api/approve-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    window.location.reload();
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.email} - {user.approved ? "Approved" : "Pending"}
            {!user.approved && (
              <button onClick={() => approveUser(user.id)}>Approve</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany();
  return { props: { users } };
};
