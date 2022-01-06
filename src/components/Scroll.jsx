import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 12,
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(0.5),
    color: "black",
    backgroundColor: "#DCDCDC",
    "&:hover, &.Mui-focusVisible": {
      transition: "0.3s",
      color: "#222",
      backgroundColor: "#DCDCDC",
    },
  },
}));

const Scroll = ({ showBelow }, ref) => {
  const classes = useStyles();
  const [show, setShow] = useState(showBelow ? false : true);
  useEffect(() => {
    if (showBelow) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  });
  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) {
        setShow(true);
      } else {
        if (show) {
          setShow(false);
        }
      }
    }
  };
  const handleClick = () => {
    window["scrollTo"]({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      {show && (
        <IconButton onClick={handleClick} className={classes.root}>
          <KeyboardArrowUpIcon />
        </IconButton>
      )}
    </div>
  );
};

export default Scroll;
