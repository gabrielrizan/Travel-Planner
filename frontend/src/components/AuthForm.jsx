import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography, Grid, Alert } from "@mui/material";
import { signInWithGoogle, auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleAuth = async () => {
    setMessage("");
    setError("");
    try {
      let userCredential;
      if (isSignUp) {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setMessage("Sign Up Successful");
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        setMessage("Log In Successful");
      }
      login(userCredential.user); // Log in the user
      navigate("/");
    } catch (error) {
      setError("Authentication error: " + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setMessage("");
    setError("");
    try {
      const userCredential = await signInWithGoogle();
      setMessage("Google Sign In Successful");
      login(userCredential.user); // Log in the user
      navigate("/");
    } catch (error) {
      setError("Google Sign In error: " + error.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5} p={3} border={1} borderRadius={8} boxShadow={3}>
        <Typography variant="h5" mb={3}>
          {isSignUp ? "Sign Up" : "Log In"}
        </Typography>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="Email" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        {isSignUp && <TextField label="Confirm Password" type="password" variant="outlined" fullWidth margin="normal" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />}
        <Button variant="contained" color="primary" fullWidth onClick={handleAuth} sx={{ mt: 2 }}>
          {isSignUp ? "Sign Up" : "Log In"}
        </Button>
        <Button variant="contained" color="secondary" fullWidth onClick={handleGoogleSignIn} sx={{ mt: 2 }}>
          Sign In with Google
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button onClick={() => setIsSignUp(!isSignUp)} sx={{ mt: 2 }}>
              {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AuthForm;
