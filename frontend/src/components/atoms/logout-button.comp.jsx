import { useClerk } from "@clerk/clerk-react";

export function LogoutButton() {
  const { signOut } = useClerk();

  return (
    <>
      <button
        onClick={() => signOut({ redirectUrl: "/" })}
        className="btn btn-primary"
      >
        Logout
      </button>
    </>
  );
}
