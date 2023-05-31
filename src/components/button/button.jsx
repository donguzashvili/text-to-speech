import classes from "./button.module.css";

const Button = ({ text, Icon, onClick }) => {
  return (
    <button className={classes.btn} onClick={onClick}>
      {Icon && <Icon />}
      <p>{text}</p>
    </button>
  );
};

export default Button;
