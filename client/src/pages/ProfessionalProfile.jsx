import React, { useEffect, useState } from "react";
import Services from "../components/Services";
import Reviews from "../components/Reviews";
import Layout from "../components/Layout";

function ProfessionalProfile() {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    fetch("/api/provider/1")
      .then((response) => response.json())
      .then((data) => setProvider(data));
  }, []);

  return (
    <Layout>
      {provider ? (
        <div className="professional-profile">
          <h1>{provider.name}'s Profile</h1>
          <p>{provider.bio}</p>
          <Services services={provider.services} />
          <Reviews reviews={provider.reviews} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
}

export default ProfessionalProfile;
