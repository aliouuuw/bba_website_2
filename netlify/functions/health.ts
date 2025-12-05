import type { Handler } from "@netlify/functions";

const handler: Handler = async () => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "ok", timestamp: new Date().toISOString() }),
  };
};

export { handler };
