import Cta from "../components/Cta";
import FinanceApplication from "../components/FinanceApplication";
import FinanceWork from "../components/FinanceWork";
import PageTitle from "../components/PageTitle";

export default function Finance() {
  return (
    <>
      <PageTitle
        slogan={"Finance your next car"}
        title={`Auto Financing`}
        text={`Radiant Auto and Repair has teamed up with multiple lenders to ensure you get the best rates and fast approval. Our team guides you through each step, ensuring you make informed decisions. Simply fill out the form below, and a Finance Manager will contact you shortly to assist with your auto financing needs.`}
      />
      <FinanceWork />
      <FinanceApplication />
      <Cta />
    </>
  );
}
