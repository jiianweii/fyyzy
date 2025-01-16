import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { updatePassword } from "../services/apiAuth";

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

export default function UpdatePassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rePassword, setRePassword] = useState("");
  const [password, setPassword] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!password || !rePassword) {
      toast.error("Please enter your password");
      return;
    }

    if (password != rePassword) {
      toast.error("The passwords you entered did not matched");
      return;
    }

    setLoading(true);

    const data = await updatePassword(password);

    if (data) {
      toast.success("Your password has been reset");
      setLoading(false);
      navigate("/login");
    }
  }

  useEffect(() => {
    if (!searchParams.get("token")) {
      navigate("/reset");
    }
  }, [searchParams.get("token")]);

  return (
    <StyledDiv>
      <StyledFormDiv>
        <StyledBackButton to="/">
          <FontAwesomeIcon icon={faArrowLeft} />
        </StyledBackButton>
        <StyledForm onSubmit={handleSubmit}>
          <StyledHeader>
            <StyledH1>Reset Password</StyledH1>
          </StyledHeader>
          <StyledInputDiv>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              value={password}
            />
            <input
              type="password"
              placeholder="Re-type Password"
              onChange={(e) => setRePassword(e.target.value)}
              disabled={loading}
              value={rePassword}
            />
          </StyledInputDiv>
          <StyledButton type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </StyledButton>
        </StyledForm>
      </StyledFormDiv>
    </StyledDiv>
  );
}
