import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../services/apiAuth";
import { useEffect, useState } from "react";
import { useLogin } from "../components/authentication/useLogin";
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

const StyledUtils = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const StyledRemember = styled.div`
  display: flex;
  gap: 0.5rem;
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isLoading } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter your email and password");
      return;
    }

    mutate(
      { email: email.toLowerCase(), password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard/home");
    }
  }, [isAuthenticated]);

  return (
    <StyledDiv>
      <StyledFormDiv>
        <StyledBackButton to="/">
          <FontAwesomeIcon icon={faArrowLeft} />
        </StyledBackButton>
        <StyledForm onSubmit={handleSubmit}>
          <StyledHeader>
            <StyledH1>Welcome Back.</StyledH1>
            <StyledH1>Please login to your account</StyledH1>
          </StyledHeader>
          <StyledInputDiv>
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled={isLoading}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              disabled={isLoading}
            />
          </StyledInputDiv>
          <StyledUtils>
            <StyledRemember>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </StyledRemember>
            <Link to="/reset">Forget Password</Link>
          </StyledUtils>
          <StyledButton type="submit" disabled={isLoading}>
            Login
          </StyledButton>
          <StyledParaDiv>
            <p>
              Don't Have An Account? <Link to="/register">Sign Up Now</Link>
            </p>
          </StyledParaDiv>
        </StyledForm>
      </StyledFormDiv>
    </StyledDiv>
  );
}
