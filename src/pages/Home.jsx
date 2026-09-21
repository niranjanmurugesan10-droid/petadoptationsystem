import { Link } from "react-router-dom";

import dogsImage from "../assets/Dogs.jpg";
import puppiesImage from "../assets/Puppies.jpg";
import catsImage from "../assets/Cats.jpg";
import kittensImage from "../assets/kittens.jpg";

function Home() {
  return (
    <div className="page home">

      {/* ================= HERO ================= */}

      <section className="hero-section">

        <div className="hero-content">

          <p className="hero-tag">
            PET ADOPTION & ANIMAL WELFARE
          </p>

          <h1>
            Find Your Perfect Pet
            <span> and Give Them a Loving Home</span>
          </h1>

          <p className="hero-description">
            Looking for a loving companion? Explore our pet adoption
            platform to find dogs, cats, puppies, kittens, and other
            adorable pets looking for a forever home.
          </p>

          <div className="hero-buttons">

            <Link to="/pets" className="primary-btn">
              Explore Pets
            </Link>

            <Link to="/register" className="secondary-btn">
              Start Your Adoption
            </Link>

          </div>

        </div>

        <div className="hero-pet">
          <img
            src={dogsImage}
            alt="Dog available for adoption"
          />
        </div>

      </section>


      {/* ================= INTRODUCTION ================= */}

      <section className="home-section">

        <div className="section-heading">

          <p className="section-label">
            FIND • CONNECT • ADOPT
          </p>

          <h2>
            A Simple Way to Find Your New Best Friend
          </h2>

          <p>
            Our pet adoption system makes it easier for people to
            discover pets that are looking for a safe, caring, and
            permanent home.
          </p>

        </div>


        <div className="info-grid">

          <div className="info-card">

            <div className="info-image">
              <img
                src={dogsImage}
                alt="Find loving dogs"
              />
            </div>

            <div className="info-card-content">

              <h3>Find Loving Pets</h3>

              <p>
                Browse dogs, puppies, cats, kittens, and other pets
                available for adoption and discover a companion that
                matches your lifestyle.
              </p>

            </div>

          </div>


          <div className="info-card">

            <div className="info-image">
              <img
                src={catsImage}
                alt="Search and discover cats"
              />
            </div>

            <div className="info-card-content">

              <h3>Search & Discover</h3>

              <p>
                Search and filter available pets by breed, age,
                location, and other details to find the right pet
                for your family.
              </p>

            </div>

          </div>


          <div className="info-card">

            <div className="info-image">
              <img
                src={puppiesImage}
                alt="Adopt with love"
              />
            </div>

            <div className="info-card-content">

              <h3>Adopt With Love</h3>

              <p>
                Connect with pet owners and begin your pet adoption
                journey with a simple and convenient online process.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= WHY ADOPT ================= */}

      <section className="home-section adoption-section">

        <div className="adoption-content">

          <p className="section-label">
            WHY PET ADOPTION?
          </p>

          <h2>
            Give a Pet a Second Chance at Happiness
          </h2>

          <p>
            Every pet deserves a loving family and a safe place
            to call home. Pet adoption can help animals find
            caring families while giving adopters a loyal and
            loving companion.
          </p>

          <p>
            Whether you are looking to adopt a dog, cat, puppy,
            kitten, or another companion animal, take your time
            to understand the pet's needs, personality, age, and
            lifestyle before making an adoption decision.
          </p>

          <Link to="/pets" className="primary-btn">
            Browse Available Pets
          </Link>

        </div>

        <div className="adoption-image">

          <img
            src={kittensImage}
            alt="Pets waiting for adoption"
          />

        </div>

      </section>


      {/* ================= PET TYPES ================= */}

      <section className="home-section">

        <div className="section-heading">

          <p className="section-label">
            EXPLORE PETS
          </p>

          <h2>
            Find a Pet That Matches Your Family
          </h2>

          <p>
            Explore different types of pets and learn more about
            their age, breed, personality, and adoption status.
          </p>

        </div>


        <div className="pet-type-grid">

          <div className="pet-type-card">

            <img
              src={dogsImage}
              alt="Dogs"
            />

            <div className="pet-type-content">

              <h3>Dogs</h3>

              <p>
                Find friendly dogs looking for a caring forever home.
              </p>

            </div>

          </div>


          <div className="pet-type-card">

            <img
              src={catsImage}
              alt="Cats"
            />

            <div className="pet-type-content">

              <h3>Cats</h3>

              <p>
                Discover adorable cats and kittens available for adoption.
              </p>

            </div>

          </div>


          <div className="pet-type-card">

            <img
              src={puppiesImage}
              alt="Puppies"
            />

            <div className="pet-type-content">

              <h3>Puppies</h3>

              <p>
                Explore playful puppies that need loving families.
              </p>

            </div>

          </div>


          <div className="pet-type-card">

            <img
              src={kittensImage}
              alt="Kittens"
            />

            <div className="pet-type-content">

              <h3>Kittens</h3>

              <p>
                Meet cute kittens waiting for their new forever home.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section className="home-section how-section">

        <div className="section-heading">

          <p className="section-label">
            HOW IT WORKS
          </p>

          <h2>
            Start Your Pet Adoption Journey
          </h2>

          <p>
            Finding and adopting a pet can be simple. Follow these
            basic steps to begin your journey.
          </p>

        </div>


        <div className="steps-grid">

          <div className="step-card">

            <div className="step-number">
              01
            </div>

            <h3>Browse Pets</h3>

            <p>
              Explore available pets and check their breed, age,
              details, and adoption status.
            </p>

          </div>


          <div className="step-card">

            <div className="step-number">
              02
            </div>

            <h3>Choose Your Companion</h3>

            <p>
              Find a pet that suits your family, lifestyle,
              preferences, and ability to provide proper care.
            </p>

          </div>


          <div className="step-card">

            <div className="step-number">
              03
            </div>

            <h3>Send Adoption Request</h3>

            <p>
              Submit an adoption request and connect with the
              pet owner through the platform.
            </p>

          </div>


          <div className="step-card">

            <div className="step-number">
              04
            </div>

            <h3>Welcome Your New Friend</h3>

            <p>
              Complete the adoption process and give your new
              companion a safe and loving forever home.
            </p>

          </div>

        </div>

      </section>


      {/* ================= PET OWNER ================= */}

      <section className="home-section owner-section">

        <div className="owner-content">

          <p className="section-label">
            PET OWNERS
          </p>

          <h2>
            Looking for a Loving Home for Your Pet?
          </h2>

          <p>
            Pet owners can create pet profiles and share important
            information about their pets with people interested
            in adoption.
          </p>

          <p>
            Add details such as pet name, breed, age, gender,
            description, and photos to help potential adopters
            understand more about your pet.
          </p>

          <Link to="/register" className="primary-btn">
            Create Your Account
          </Link>

        </div>

      </section>


      {/* ================= RESPONSIBLE ADOPTION ================= */}

      <section className="home-section responsible-section">

        <div className="section-heading">

          <p className="section-label">
            RESPONSIBLE PET ADOPTION
          </p>

          <h2>
            Adoption Is a Long-Term Commitment
          </h2>

          <p>
            Before adopting a pet, consider the time, care,
            food, medical needs, exercise, training, and financial
            responsibility required to provide a healthy and
            comfortable life for your new companion.
          </p>

        </div>


        <div className="responsibility-grid">

          <div className="responsibility-card">

            <img
              src={puppiesImage}
              alt="Proper nutrition for pets"
            />

            <h3>Proper Nutrition</h3>

            <p>
              Provide suitable food and clean drinking water.
            </p>

          </div>


          <div className="responsibility-card">

            <img
              src={catsImage}
              alt="Healthcare for pets"
            />

            <h3>Healthcare</h3>

            <p>
              Give your pet regular veterinary care and vaccinations.
            </p>

          </div>


          <div className="responsibility-card">

            <img
              src={dogsImage}
              alt="Exercise and activity"
            />

            <h3>Exercise & Activity</h3>

            <p>
              Make sure your pet receives enough exercise and activity.
            </p>

          </div>


          <div className="responsibility-card">

            <img
              src={kittensImage}
              alt="Love and care for pets"
            />

            <h3>Love & Care</h3>

            <p>
              Give your companion patience, attention, and affection.
            </p>

          </div>

        </div>

      </section>


      {/* ================= FINAL CTA ================= */}

      <section className="cta-section">

        <p className="section-label">
          YOUR NEW BEST FRIEND IS WAITING
        </p>

        <h2>
          Ready to Start Your Pet Adoption Journey?
        </h2>

        <p>
          Explore pets available for adoption and discover a
          loving companion who could become a part of your family.
        </p>

        <Link to="/pets" className="cta-btn">
          Find Your Perfect Pet
        </Link>

      </section>

    </div>
  );
}

export default Home;