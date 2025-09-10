import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="project-title">SnapChain</h1>
        <p className="project-subtitle">
          A decentralized platform to securely store and share your memories.
        </p>
      </div>

      <div className="about-section">
        <h2>About the Project</h2>
        <p>
          SnapChain is a decentralized application that allows users to upload and share their precious memories, 
          like the birth of a newborn or other significant moments, in a secure and private way.
          Unlike other social platforms, SnapChain leverages blockchain technology and 
          IPFS to ensure that all content and metadata are securely stored and accessible only to users without centralized control.
        </p>
        <p>
          Images and descriptions can be large and detailed, so SnapChain first stores the image itself on IPFS to generate its unique hash. 
          Then, this hash along with the title and description metadata is also stored on IPFS as a metadata object. 
          Finally, the hash of this metadata object is stored immutably on the blockchain.
          This ensures immutability, privacy, and full control of data for users on a fully decentralized platform.
        </p>
        <p>
          Our vision is to provide a privacy-first, censorship-resistant social sharing experience that 
          empowers users to own their data while making it easy and intuitive to share life&rsquo;s
          special moments with friends, family, and the community.
        </p>
      </div>

      <div className="about-section">
        <h2>Mission Statement</h2>
        <p>
          Our mission is to create a trustworthy, decentralized platform where memories are stored securely and transparently. 
          We empower users to share moments without fear of data loss, censorship, or privacy invasion, using the power of blockchain and IPFS. 
          SnapChain aims to merge the best social sharing experience with cutting-edge decentralized technologies.
          <br />
          <br />
          We strive to foster a community that values privacy, user control, and accessibility, 
          delivering innovative solutions that make sharing memories seamless and secure.
        </p>
      </div>

      <div className="about-section">
        <h2>Impact & Goals</h2>
        <p>
          Our project seeks to revolutionize how personal memories are stored and shared online by eliminating centralized intermediaries. 
          SnapChain aims to promote privacy, data ownership, and transparency in social sharing, making it ideal for anyone who values control over their digital legacy.
          <br />
          We plan to extend availability to a wider audience by enhancing scalability, usability, and integration with other decentralized services.
        </p>
      </div>

      <div className="about-section how-it-works-section">
        <h2>How It Works</h2>
        <ol className="how-it-works-list">
          <li>User uploads a memory (photo, title, description) via the SnapChain app.</li>
          <li>The image file is stored on IPFS, generating a unique content hash.</li>
          <li>The title, description, and the image hash are combined into a metadata object.</li>
          <li>This metadata object is stored on IPFS, generating a metadata hash.</li>
          <li>The metadata hash is then stored on the blockchain, securely linked to the user’s account.</li>
          <li>Other users can explore shared memories, like and interact, all while data remains decentralized and censorship-resistant.</li>
        </ol>
      </div>

      <div className="about-section">
        <h2>Privacy & Decentralization Commitment</h2>
        <p>
          SnapChain is built with strong emphasis on user privacy and ownership. By using blockchain and IPFS, 
          we ensure that user data does not reside on any centralized servers and 
          is tamper-proof. We continuously work to enhance security, data integrity, and ease of use for all users.
        </p>
      </div>

      <div className="about-section">
        <h2>GitHub Repository</h2>
        <p>
          The entire project source code is open source and available on GitHub for transparency and collaboration: <a href="https://github.com/Mannan-Ali/SnapChain" target="_blank" rel="noopener noreferrer">SnapChain GitHub</a>.
        </p>
      </div>
    </div>
  );
};

export default About;
