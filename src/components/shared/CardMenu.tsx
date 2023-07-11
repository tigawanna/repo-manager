import React from "react";
import { MoreVertical } from "lucide-react";
import { Paper, Box, Menu, ClickAwayListener } from "@mui/material";
interface CardMenuProps {
  children: React.ReactNode;
}

export function CardMenu({ children }: CardMenuProps) {
  const [menuopen, setMenuOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  const handleMenuClose = () => {
    setMenuOpen(false);
  };
  return (
    <ClickAwayListener onClickAway={handleMenuClose}>
      <div className="flex items-center justify-center hover:brightness-110 hover:text-purple-600">
        <MoreVertical
          aria-controls={"basic-menu"}
          onAuxClickCapture={handleMenuClose}
          aria-haspopup="true"
          aria-expanded={menuopen ? "true" : undefined}
          ref={buttonRef}
          onClick={() => {
            setMenuOpen((prev) => !prev);
          }}
        />

        <Menu
          id="basic-menu"
          anchorEl={buttonRef.current}
          open={menuopen}
          onClose={handleMenuClose}
          aria-labelledby="menu-items"
        >
          {children}
        </Menu>
      </div>
    </ClickAwayListener>
  );
}
