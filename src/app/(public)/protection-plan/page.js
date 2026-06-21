import GapCoverage from "../../components/GapCoverage";
import GuaranteeBlock from "../../components/GuranteeBlock";
import PageTitle from "../../components/PageTitle";
import ProtectionPlanSteps from "../../components/ProtectionPlanSteps";
import WarentyOption from "../../components/WarentyOption";

export const metadata = {
  title: "BUY WITH CONFIDENCE Vehicle Protection",
  description:
    "We offer a variety of protection plans beyond the 90-day Complimentary Warranty included on all vehicles. Our warranties cover your car by extending its original warranty, covering costs should something break down. Gap Coverage covers what you still owe on the car should it be totaled or stolen.",
};

export default function Protection() {
  return (
    <>
      <PageTitle
        slogan={"BUY WITH CONFIDENCE"}
        title={"Vehicle Protection"}
        text={
          "We offer a variety of protection plans beyond the 90-day Complimentary Warranty included on all vehicles. Our warranties cover your car by extending its original warranty, covering costs should something break down. Gap Coverage covers what you still owe on the car should it be totaled or stolen."
        }
      />

      <ProtectionPlanSteps />
      <GuaranteeBlock />
      <WarentyOption />
      <GapCoverage />
    </>
  );
}
