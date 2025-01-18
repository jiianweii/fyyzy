import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { register } from "../services/apiAuth";
import { dataTagErrorSymbol } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useUser } from "../components/authentication/useUser";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  height: 100vh;
`;

const StyledFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 60%;
  width: 40rem;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 2px 6px #00000050;
  position: relative;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  width: 70%;
`;

const StyledBackButton = styled(Link)`
  position: absolute;
  top: 30px;
  left: 30px;
  color: #000;
  font-size: 1.2rem;
`;

const StyledInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;

  & input {
    padding: 1rem;
    border: 1px solid #4a8ef3;

    border-radius: 12px;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledH1 = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 1rem 0;
  background-color: #4a8ef3;
  color: #fff;
  font-weight: 600;
  border: none;
`;

const StyledParaDiv = styled.div`
  display: flex;
  justify-content: center;

  & p {
    font-size: 0.9rem;
  }
`;

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validate = async (data) => {
    const res = await data;
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    if (res == null) {
      toast.error("The email has been taken! Please use another email.");
      return;
    }

    if (res.user.aud === "authenticated") {
      toast.success("Please check your email to activate your account.");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password || !name || !confirmPassword) {
      toast.error("Please fill in all of the fields");
      return;
    }

    if (password.length < 8) {
      toast.error("Your password must be more than 8 characters");
      return;
    }

    if (password != confirmPassword) {
      toast.error("The password and confirm password does not match!");
      return;
    }

    const data = register(name, email.toLowerCase(), password);

    validate(data);
  }

  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <StyledDiv>
      <StyledFormDiv>
        <StyledBackButton to="/">
          <FontAwesomeIcon icon={faArrowLeft} />
        </StyledBackButton>
        <StyledForm onSubmit={handleSubmit}>
          <StyledHeader>
            <StyledH1>Create An Account</StyledH1>
          </StyledHeader>
          <StyledInputDiv>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </StyledInputDiv>

          <StyledButton type="submit">Register</StyledButton>
          <StyledParaDiv>
            <p>
              Already Have An Account? <Link to="/login">Login Now</Link>
            </p>
          </StyledParaDiv>
        </StyledForm>
      </StyledFormDiv>
    </StyledDiv>
  );
}
