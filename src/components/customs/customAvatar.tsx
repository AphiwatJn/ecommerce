import React from "react";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type MenuItem = {
  label: string;
  onClick?: () => void;
  variant?: "default" | "destructive";
};

type CustomAvatarProps = {
  src?: string;
  alt?: string;
  fallback?: string;
  online?: boolean;
  menuItems?: MenuItem[];
};

function CustomAvatar({
  src,
  alt = "avatar",
  fallback = "U",
  online = false,
  menuItems = [],
}: CustomAvatarProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full p-0">
          <Avatar>
            {src && <AvatarImage src={src} alt={alt} />}

            <AvatarFallback>{fallback}</AvatarFallback>

            {online && (
              <AvatarBadge className="-right-0.5 -bottom-0.5 bg-green-600 dark:bg-green-800" />
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuGroup>
          {menuItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onClick={item.onClick}
              variant={item.variant}
              className={menuItems.length === index ? 'border-b-2' : ''}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

       
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CustomAvatar;