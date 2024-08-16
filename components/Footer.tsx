import { logoutAccount } from "@/lib/actions/user.actions";
import Image from "next/image";
import React from "react";

const Footer = async ({ user, type = "desktop" }: FooterProps) => {
  const handleLogout = async () => {
    await logoutAccount()
  }
  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold text-gray-700">{user.name[0]}</p>
      </div>
      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h1 className="text-14 truncate font-semibold text-gray-700">
          {user.email}
        </h1>
        <p className="text-14 truncate font-normal text-gray-600"></p>
      </div>
      <div className="footer_image">
        <Image onClick={handleLogout} src={"/icons/logout.svg"} alt={"logout"} />{" "}
      </div>
    </footer>
  );
};

export default Footer;
