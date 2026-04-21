import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";

function Profile({ user, handleUpdateProfile }) {
  const [personalEdit, setPersonalEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [mobileEdit, setMobileEdit] = useState(false);
  const [addressEdit, setAddressEdit] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      const fullName = user.name || "";
      const nameParts = fullName.trim().split(" ");
      const firstName = user.firstName || nameParts[0] || "";
      const lastName =
        user.lastName || nameParts.slice(1).join(" ") || "";

      setFormData({
        firstName,
        lastName,
        gender: user.gender || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pincode: user.pincode || "",
        password: user.password || "",
      });
    }
  }, [user]);

  const initials = useMemo(() => {
    const first = formData.firstName?.charAt(0) || "";
    const last = formData.lastName?.charAt(0) || "";
    return `${first}${last}`.toUpperCase() || "U";
  }, [formData.firstName, formData.lastName]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    handleUpdateProfile({
      ...user,
      ...formData,
      name: fullName,
    });

    setPersonalEdit(false);
    setEmailEdit(false);
    setMobileEdit(false);
    setAddressEdit(false);
  };

  return (
    <div className="profile-layout-page">
      <div className="profile-layout-container">
        <aside className="profile-sidebar">
          <div className="profile-user-card">
            <div className="profile-user-avatar">{initials}</div>
            <div className="profile-user-meta">
              <p>Hello,</p>
              <h3>{`${formData.firstName} ${formData.lastName}`.trim()}</h3>
            </div>
          </div>

          <div className="profile-side-box">
            <Link to="/orders" className="profile-orders-link">
              <div className="profile-side-heading">
                <span>MY ORDERS</span>
                <span>›</span>
              </div>
            </Link>
          </div>

          <div className="profile-side-box">
            <div className="profile-side-heading">
              <span>ACCOUNT SETTINGS</span>
            </div>

            <div className="profile-side-links">
              <span className="active-side-link">Profile Information</span>
              <span>Manage Addresses</span>
              <span>PAN Card Information</span>
            </div>
          </div>

          <div className="profile-side-box">
            <div className="profile-side-heading">
              <span>PAYMENTS</span>
            </div>

            <div className="profile-side-links">
              <span>Gift Cards</span>
              <span>Saved UPI</span>
              <span>Saved Cards</span>
            </div>
          </div>

          <div className="profile-side-box">
            <div className="profile-side-heading">
              <span>MY STUFF</span>
            </div>

            <div className="profile-side-links">
              <span>My Coupons</span>
              <span>My Reviews & Ratings</span>
              <span>All Notifications</span>
              <span>My Wishlist</span>
            </div>
          </div>

          <Link to="/" className="profile-home-link">
            Back to Home
          </Link>
        </aside>

        <main className="profile-main-content">
          <form onSubmit={handleSave}>
            <section className="profile-section-card">
              <div className="profile-section-header">
                <h2>Personal Information</h2>
                <button
                  type="button"
                  className="profile-edit-btn"
                  onClick={() => setPersonalEdit((prev) => !prev)}
                >
                  {personalEdit ? "Cancel" : "Edit"}
                </button>
              </div>

              <div className="profile-name-row">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  disabled={!personalEdit}
                />

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  disabled={!personalEdit}
                />
              </div>

              <div className="profile-gender-block">
                <p>Your Gender</p>

                <div className="profile-gender-options">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                      disabled={!personalEdit}
                    />
                    Male
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                      disabled={!personalEdit}
                    />
                    Female
                  </label>
                </div>
              </div>
            </section>

            <section className="profile-section-card">
              <div className="profile-section-header">
                <h2>Email Address</h2>
                <button
                  type="button"
                  className="profile-edit-btn"
                  onClick={() => setEmailEdit((prev) => !prev)}
                >
                  {emailEdit ? "Cancel" : "Edit"}
                </button>
              </div>

              <div className="profile-single-input">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!emailEdit}
                />
              </div>
            </section>

            <section className="profile-section-card">
              <div className="profile-section-header">
                <h2>Mobile Number</h2>
                <button
                  type="button"
                  className="profile-edit-btn"
                  onClick={() => setMobileEdit((prev) => !prev)}
                >
                  {mobileEdit ? "Cancel" : "Edit"}
                </button>
              </div>

              <div className="profile-single-input">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  disabled={!mobileEdit}
                />
              </div>
            </section>

            <section className="profile-section-card">
              <div className="profile-section-header">
                <h2>Address</h2>
                <button
                  type="button"
                  className="profile-edit-btn"
                  onClick={() => setAddressEdit((prev) => !prev)}
                >
                  {addressEdit ? "Cancel" : "Edit"}
                </button>
              </div>

              <div className="profile-address-grid">
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter full address"
                  rows="4"
                  disabled={!addressEdit}
                  className="profile-address-full"
                />

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  disabled={!addressEdit}
                />

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  disabled={!addressEdit}
                />

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  disabled={!addressEdit}
                />
              </div>
            </section>

            <section className="profile-section-card">
              <div className="profile-section-header">
                <h2>FAQs</h2>
              </div>

              <div className="profile-faq-box">
                <h4>
                  What happens when I update my email address or mobile number?
                </h4>
                <p>
                  Your account details will be updated and future communication
                  will be sent to the latest saved email address or mobile
                  number.
                </p>

                <h4>When will my account be updated with the new details?</h4>
                <p>
                  It updates immediately after you save your profile changes.
                </p>

                <h4>Will my saved cart and profile remain the same?</h4>
                <p>
                  Yes, your updated profile information is stored in your browser
                  storage and loaded again after refresh.
                </p>
              </div>
            </section>

            <button type="submit" className="profile-save-main-btn">
              Save All Changes
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default Profile;