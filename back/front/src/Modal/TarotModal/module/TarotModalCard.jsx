import Card from "../../../UI/Card";
export const TarotModalCard = ({ styles, ...props }) => {
  return (
    <>
      <Card className={`${styles['tarot-modal']} ${props.className}`}>
        {props.children}
      </Card>
    </>
  );
};
