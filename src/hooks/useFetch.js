import { useState, useEffect, useRef } from "react";

export const useFetch = (
  url,
  method = "get",
  body,
  headers = { "Content-Type": "application/json" },
  dependency
) => {
  const isMounted = useRef(true);

  const [state, setState] = useState({
    loading: true,
  });

  useEffect(() => {
    fetch(url, { method, headers, body })
      .then(response => response.json())
      .then(data => {
        if (isMounted.current) setState({ loading: false, data });
      })
      .catch(err => {
        if (isMounted.current) setState({ loading: false, data: err });
      });

    return () => (isMounted.current = false);
  }, [url, dependency, method, headers, body]);

  return state;
};
