import { Link } from "react-router-dom";

type FooterProps = {
  children?: React.ReactNode;
};

export default function Footer(props: FooterProps) {
  return (
    <footer className="w-full flex justify-center h-24">
      <div className="w-11/12 max-w-screen-xl h-full flex items-center flex-col justify-between">
        <div>제로베이스</div>
        <div>Card</div>
        <div>SNS</div>
        <div>Copyright© 2022</div>
      </div>
    </footer>
  );
}
