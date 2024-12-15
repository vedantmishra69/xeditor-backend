const supabase = require("./supabase");

exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
  next();
};
