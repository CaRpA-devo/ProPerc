import { UserButton, useUser } from "@clerk/clerk-react";
import { Icon } from "@iconify/react/dist/iconify.js";

export function UserAvatar() {
  const user = useUser();

  return (
    // TODO Styling noch anpassen
    <div className="avatar flex  gap-2 text-xl items-center">
      <UserButton
        appearance={{
          elements: {
            avatarBox: {
              width: "48px",
              height: "48px",
            },
          },
        }}
      />
      <div className="relative top-8">
        <p>{user.user?.username || user.user?.firstName}</p>
        <div className="text-xs flex items-center gap-1">
          <Icon
            icon="fluent-color:agents-48"
            className="text-primary inline-block"
          />
          Pro
        </div>
      </div>
    </div>
  );
}
