import TeamCard from "../components/cards/TeamCard";
import {
  AboutInfo,
  AboutMain,
  AboutSection,
  AboutStuffs,
  AboutTeam,
} from "../components/sections/About";

export default function OurTeam() {
  return (
    <AboutSection>
      <AboutMain>
        <h1>About Us</h1>
      </AboutMain>
      <AboutInfo>
        <AboutStuffs>
          <h1>Our Team</h1>
          <p>
            At FadzVault, we are a dedicated team of innovators, tech
            enthusiasts, and problem-solvers, passionate about revolutionizing
            online marketplaces. We bring together a wealth of experience in
            e-commerce, technology, and customer service to create a secure and
            seamless shopping experience for buyers and sellers alike. Our team
            works tirelessly to ensure that FadzVault remains a trusted platform
            where users can confidently buy, sell, and discover products from
            all around the world. We are driven by a shared commitment to
            innovation, customer satisfaction, and empowering our community.
          </p>
        </AboutStuffs>
        <AboutStuffs align={"center"}>
          <h1>Meet Our Team</h1>
          <p>
            Our team brings together expertise from various fields to ensure
            every aspect of your experience is top-notch.
          </p>
          <AboutTeam>
            <TeamCard
              image={
                "https://mkaqsnyttxfwlrwnoeop.supabase.co/storage/v1/object/public/avatars/IMG_02381.jpg"
              }
              name={"Fadzli Basheer"}
              position={"Chief Executive Officer (CEO)"}
            />
            <TeamCard
              image={
                "https://mkaqsnyttxfwlrwnoeop.supabase.co/storage/v1/object/public/avatars/IMG_02381.jpg"
              }
              name={"Fadzli Basheer"}
              position={"Chief Finance Officer (CFO)"}
            />
            <TeamCard
              image={
                "https://mkaqsnyttxfwlrwnoeop.supabase.co/storage/v1/object/public/avatars/IMG_02381.jpg"
              }
              name={"Fadzli Basheer"}
              position={"Software Engineer (Lead)"}
            />
            <TeamCard
              image={
                "https://mkaqsnyttxfwlrwnoeop.supabase.co/storage/v1/object/public/avatars/IMG_02381.jpg"
              }
              name={"Fadzli Basheer"}
              position={"DevOps Specialist (Lead)"}
            />
            <TeamCard
              image={
                "https://mkaqsnyttxfwlrwnoeop.supabase.co/storage/v1/object/public/avatars/IMG_02381.jpg"
              }
              name={"Fadzli Basheer"}
              position={"UX/UI Designer (Lead)"}
            />
            <TeamCard
              image={
                "https://mkaqsnyttxfwlrwnoeop.supabase.co/storage/v1/object/public/avatars/IMG_02381.jpg"
              }
              name={"Fadzli Basheer"}
              position={"Marketing Manager"}
            />
          </AboutTeam>
        </AboutStuffs>
      </AboutInfo>
    </AboutSection>
  );
}
