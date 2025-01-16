import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { resetPassword } from "../services/apiAuth";

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

  height: 40rem;
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
  text-align: center;
  gap: 0.7rem;
`;

const StyledH1 = styled.h1`
  font-size: 1.5rem;
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

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email in order to reset");
      return;
    }
    setLoading(true);

    const data = await resetPassword(email);

    if (data) {
      toast.success(
        "Please click on the reset link on the email sent to your email address"
      );
      setLoading(false);
    }
  }
  return (
    <StyledDiv>
      <StyledFormDiv>
        <StyledBackButton to="/">
          <FontAwesomeIcon icon={faArrowLeft} />
        </StyledBackButton>
        <StyledForm onSubmit={handleSubmit}>
          <StyledHeader>
            <StyledH1>Forgot your email?</StyledH1>
            <p>
              Enter your email address and we will send a link for you to reset
              your password
            </p>
          </StyledHeader>
          <StyledInputDiv>
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              value={email}
            />
          </StyledInputDiv>
          <StyledButton type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Email"}
          </StyledButton>
        </StyledForm>
      </StyledFormDiv>
    </StyledDiv>
  );
}
