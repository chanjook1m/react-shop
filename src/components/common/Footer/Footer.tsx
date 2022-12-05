import Company from "./Company";
import PaymentCards from "./PaymentCards";
import SocialNetwork from "./SocialNetwork";
import CopyRight from "./CopyRight";

type FooterProps = {
  children?: React.ReactNode;
};

export default function Footer(props: FooterProps) {
  return (
    <FooterContainer>
      <Company name="제로베이스" />
      <PaymentCards />
      <SocialNetwork />
      <CopyRight year={2023} company="제로베이스" />
    </FooterContainer>
  );
}

function FooterContainer({ children }: any) {
  return (
    <footer className="flex justify-center h-24 pt-80 ">
      <div className="w-full h-80 flex items-center flex-col pt-16 gap-10 text-lg font-bold bg-gray-300">
        {children}
      </div>
    </footer>
  );
}
