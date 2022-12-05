import { Link } from "react-router-dom";
import {
  FaCcMastercard,
  FaCcPaypal,
  FaCcApplePay,
  FaFacebook,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";

type FooterProps = {
  children?: React.ReactNode;
};

export default function Footer(props: FooterProps) {
  return (
    <footer className="flex justify-center h-24 pt-80 ">
      <div className="w-full h-80 flex items-center flex-col pt-16 gap-10 text-lg font-bold bg-gray-300">
        {/* Company */}
        <div>제로베이스</div>
        {/* PaymentCards */}
        <div>
          <ul className="flex gap-3">
            <li>
              <FaCcMastercard size="30" />
            </li>
            <li>
              <FaCcPaypal size="30" />
            </li>
            <li>
              <FaCcApplePay size="30" />
            </li>
          </ul>
        </div>
        {/* SocialNetwork */}
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
        {/* CopyRight */}
        <div>Copyright© 2022</div>
      </div>
    </footer>
  );
}
