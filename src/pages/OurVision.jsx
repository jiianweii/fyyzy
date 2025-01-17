import {
  AboutInfo,
  AboutMain,
  AboutSection,
  AboutStuffs,
} from "../components/sections/About";

export default function OurVision() {
  return (
    <AboutSection>
      <AboutMain>
        <h1>About Us</h1>
      </AboutMain>
      <AboutInfo>
        <AboutStuffs>
          <h1>Our Vision</h1>
          <p>
            At FadzVault, our vision is to create the premier destination for
            collectors and enthusiasts of trading cards and memorabilia, where
            passion meets opportunity. We aim to build a dynamic and accessible
            marketplace that connects buyers, sellers, and traders from around
            the world, fostering a community centered around the love of
            collecting.
          </p>
          <p>
            We envision a platform that offers more than just transactions — a
            place where rare collectibles are discovered, valued, and exchanged
            through both fixed-price listings and competitive auctions. From our
            Buy Now Marketplace to our Weekly Auctions and exclusive Premier
            Auctions, we provide a wide range of ways for collectors to buy,
            sell, and trade items they love, all while ensuring transparency,
            security, and ease of use.
          </p>
          <p>
            We are committed to delivering exceptional value to both buyers and
            sellers, with some of the lowest fees in the industry, and
            empowering sellers to connect with a global audience. By
            continuously innovating and expanding our offerings, we aim to be
            the go-to platform for both new and seasoned collectors, helping
            them grow their collections and make meaningful connections within a
            vibrant community.
          </p>
          <p>
            At FadzVault, we don’t just deal in collectibles — we bring people
            together, enabling them to share their passion, engage in exciting
            auctions, and build the collection of their dreams.
          </p>
        </AboutStuffs>
      </AboutInfo>
    </AboutSection>
  );
}
