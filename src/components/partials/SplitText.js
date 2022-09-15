const SplitText = ({ classType, text, role }) => {
  return (
    <span className={classType} aria-label={text} role={role}>
      {text
        .toString()
        .split("")
        .map((char, index) => {
          return char === " " ? (
            <span aria-hidden={true} key={index}>
              &nbsp;
            </span>
          ) : (
            <span aria-hidden={true} key={index}>
              {char}
            </span>
          );
          // <span aria-hidden={true} key={index}>
          //   {char}
          // </span>
        })}
    </span>
  );
};

export default SplitText;
