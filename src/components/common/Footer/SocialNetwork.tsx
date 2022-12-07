import React from "react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

function SocialNetwork() {
  return (
    <div>
      <ul className="flex gap-5">
        <li>
          <a href="#">
            <FaFacebook title="Facebook" size="30" />
          </a>
        </li>
        <li>
          <a href="#">
            <FaInstagram title="Instagram" size="30" />
          </a>
        </li>
        <li>
          <a href="#">
            <FaGithub title="Github" size="30" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SocialNetwork;
