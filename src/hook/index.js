import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export const useHover = () => {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);

      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, []);

  return [ref, value];
};

export const useFetching = actionCreator => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionCreator());
  }, [actionCreator, dispatch]);
};
