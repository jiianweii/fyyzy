import styled, { css } from "styled-components";
import { Div, H1 } from "../../styles/GlobalStyled";
import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../../services/apiSettings";
import toast from "react-hot-toast";

const SettingsDiv = styled.div`
  display: flex;
  align-items: center;
  color: #3c3c3c;
  justify-content: ${(props) => props.jc || "space-between"};
  padding: ${(props) => props.padding};
  gap: ${(props) => props.gap};
  width: ${(props) => props.width || "100%"};

  & h1 {
    font-size: 1.5rem;
  }

  & div {
    width: 85%;
    background-color: #3c3c3c50;
    height: 2px;
  }

  & label {
    font-weight: 500;
  }

  & input[type="text"] {
    padding: 0.5rem;
    border: 1px solid #3c3c3c;
  }
`;

const SettingButton = styled.button`
  padding: 1rem;
  color: #fff;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  ${(props) =>
    props.btnType == "reset" &&
    css`
      background-color: #4a8ef3;
    `}
  ${(props) =>
    props.btnType == "submit" &&
    css`
      background-color: #ff0000;
    `}
`;

const SettingsLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;
  background-color: #fff;
`;

export default function Settings() {
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");
  const [bio, setBio] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  useEffect(() => {
    const initialData = async () => {
      const data = await getSettings();

      setName(data.name);
      setBio(data.bio);
    };

    initialData();
  }, []);

  async function handleSubmit() {
    if ((currPassword || rePassword) && currPassword != rePassword) {
      toast.error("Your password does not match.");
      return;
    }
    try {
      await updateSettings(name, profile, bio, currPassword);
      toast.success("Your information has been updated!");
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <Div>
      <H1>Settings</H1>
      <SettingsLayout>
        <SettingsDiv>
          <h1>Basic Information</h1>
          <div></div>
        </SettingsDiv>
        <SettingsDiv jc="space-between" padding="0 1rem" width="40%">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </SettingsDiv>
        <SettingsDiv jc="space-between" padding="0 1rem" width="46%">
          <label htmlFor="picture">Profile Picture:</label>
          <input
            type="file"
            id="picture"
            accept="image/png, image/jpeg"
            defaultValue={profile}
            onChange={(e) => setProfile(e.target.files[0])}
          />
        </SettingsDiv>
        <SettingsDiv jc="space-between" padding="0 1rem" width="40%">
          <label htmlFor="bio">Bio:</label>
          <input
            type="text"
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </SettingsDiv>
        <SettingsDiv>
          <h1>Password</h1>
          <div></div>
        </SettingsDiv>
        <SettingsDiv jc="space-between" padding="0 1rem" width="40%">
          <label htmlFor="password">Enter Your New Password:</label>
          <input
            type="text"
            id="password"
            value={currPassword}
            onChange={(e) => setCurrPassword(e.target.value)}
          />
        </SettingsDiv>
        <SettingsDiv jc="space-between" padding="0 1rem" width="40%">
          <label htmlFor="repassword">Re-Enter Your New Password:</label>
          <input
            type="text"
            id="repassword"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </SettingsDiv>
        <SettingsDiv jc="flex-end" width="100%" gap="1rem">
          <SettingButton btnType="submit" onClick={handleSubmit}>
            Update
          </SettingButton>
        </SettingsDiv>
      </SettingsLayout>
    </Div>
  );
}
