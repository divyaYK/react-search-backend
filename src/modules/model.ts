import deepFreeze from "utils/deepFreeze";
export const HttpResponses = deepFreeze({
  ok: {
    statusCode: 200,
    message: "200 OK",
  },
  created: {
    statusCode: 201,
    message: "201 Created",
  },
  noContent: {
    statusCode: 204,
    message: "204 No Content",
  },
  badRequest: {
    statusCode: 400,
    message: "400 Bad Request",
  },
  unauthorized: {
    statusCode: 401,
    message: "401 Unauthorized",
  },
  forbidden: {
    statusCode: 403,
    message: "403 Forbidden",
  },
  notFound: {
    statusCode: 404,
    message: "404 Not Found",
  },
  internalServerError: {
    statusCode: 500,
    message: "500 Internal Server Error",
  },
});
