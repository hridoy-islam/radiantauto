import FinanceWork from "../../components/FinanceWork";
import PageTitle from "../../components/PageTitle";
import { PaymentCalculatorForm } from "../../components/PaymentCalculatorForm";

export default function PaymentCalculator() {
  return (
    <>
      <PageTitle
        title={`Payment Calculator`}
        text={`Payment Calculator at Radiant Auto is powered by partnerships with multiple lenders, ensuring you receive the best rates and quick approvals. We guide you through each step of the process, empowering you to make informed decisions with confidence.`}
      />
      <PaymentCalculatorForm />

      <FinanceWork />
    </>
  );
}
