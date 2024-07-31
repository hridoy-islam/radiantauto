import GuaranteeBlock from "../components/GuranteeBlock";
import PageTitle from "../components/PageTitle";
import Testimonial from "../components/Testimonial";

export const metadata = {
  title: "BUY WITH CONFIDENCE The Radiant Auto Guarantee",
  description:
    "We offer a 10-day money-back guarantee on all vehicles, as well as a 90-day complimentary warranty, so you can buy with confidence knowing your new car is a perfect fit.",
};

export default function Guarantee() {
  return (
    <>
      <PageTitle
        slogan={"BUY WITH CONFIDENCE"}
        title={"The Radiant Auto Guarantee"}
        text={
          "We offer a 10-day money-back guarantee on all vehicles, as well as a 90-day complimentary warranty, so you can buy with confidence knowing your new car is a perfect fit."
        }
      />
      <GuaranteeBlock />
      <Testimonial />
    </>
  );
}
