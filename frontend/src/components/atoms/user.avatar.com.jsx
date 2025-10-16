import { UserButton, useUser } from "@clerk/clerk-react";

export function UserAvatar() {
  const user = useUser();

  return (
    <div className="avatar text-base font-medium text-center gap-2 items-center">
      <UserButton
        appearance={{
          elements: {
            avatarBox: {
              width: "40px",
              height: "40px",
            },
          },
        }}
      />

      {/* Username oder Vorname anzeigen */}
      <p>{user.user?.username || user.user?.firstName}</p>
    </div>
  );
}
