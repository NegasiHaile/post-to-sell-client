const dev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;

// export const server = dev ? `http://localhost:${PORT}` : 'https://next-ecommerce-front.vercel.app';

export const server = dev
  ? `https://post-to-sell-server.herokuapp.com`
  : "https://post-to-sell-server.herokuapp.com";
