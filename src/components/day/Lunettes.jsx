import { differenceInWeeks } from "date-fns";

const Lunettes = () => {
  const nbJour = differenceInWeeks(new Date(), new Date(2024, 9, 14)) % 2;

  return (
    <p style={{ textAlign: "center" }}>
      {"Cette semaine c'est "}
      {nbJour ? (
        <span style={{ color: "LightGrey" }}>lunettes grises</span>
      ) : (
        <span style={{ color: "SkyBlue" }}>lunettes bleues</span>
      )}
      .
    </p>
  );
};

export default Lunettes;
