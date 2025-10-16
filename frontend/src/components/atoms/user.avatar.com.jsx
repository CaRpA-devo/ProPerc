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
      <p>
        {user.user?.username
          ? user.user.username.charAt(0).toUpperCase() +
            user.user.username.slice(1)
          : user.user?.firstName
          ? user.user.firstName.charAt(0).toUpperCase() +
            user.user.firstName.slice(1)
          : ""}
      </p>
    </div>
  );
}
