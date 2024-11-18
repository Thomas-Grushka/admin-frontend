import React from "react";
import { Link, useRouteError } from "react-router-dom";

type Props = {};
type RouteError = {
  message: string;
};

const ErrorPage: React.FC<Props> = () => {
  const error: RouteError = useRouteError() as RouteError;
  return (
    <>
      <div>ErrorPage</div>
      <div>{error.message}</div>
      <Link to="/">Back</Link>
    </>
  );
};

export default ErrorPage;
