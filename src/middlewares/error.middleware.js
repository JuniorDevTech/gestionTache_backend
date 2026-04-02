export const errorHandler = (err, req, res, next) => {
  console.error("ERROR 💥:", err);

  let status = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Erreur serveur";

  // MongoDB duplicate key error (email / username unique)
  if (err.code === 11000) {
    status = 400;
    const field = Object.keys(err.keyValue)[0];

    if (field === "email") {
      message = "Cet email est déjà utilisé";
    } else if (field === "username") {
      message = "Ce nom d'utilisateur est déjà utilisé";
    } else {
      message = "Donnée déjà existante";
    }
  }

  res.status(status).json({
    success: false,
    message,
  });
};
