import { UserButton, useUser } from "@clerk/clerk-react";

export function UserAvatar({ collapsed = false }) {
  const user = useUser();

  return (
    <div
      className={`avatar text-base font-medium text-center gap-2 items-center ${
        collapsed ? "flex-col" : "flex-row"
      }`}
    >
      <UserButton
        appearance={{
          elements: {
            avatarBox: {
              width: collapsed ? "32px" : "40px",
              height: collapsed ? "32px" : "40px",
            },
          },
        }}
      />

      {/* Username oder Vorname anzeigen - nur wenn nicht eingeklappt */}
      {!collapsed && (
        <p>
          {user.user?.username
            ? user.user.username.charAt(0).toUpperCase() +
              user.user.username.slice(1)
            : user.user?.firstName
            ? user.user.firstName.charAt(0).toUpperCase() +
              user.user.firstName.slice(1)
            : ""}
        </p>
      )}
    </div>
  );
}
