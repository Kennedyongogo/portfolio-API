const Profile = require("../models/Profile");
const { uploadImage, deleteImage } = require("../utils/imageUpload");

// Get profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      order: [["createdAt", "DESC"]],
    });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update just the bio
exports.updateBio = async (req, res) => {
  try {
    const { bio } = req.body;

    if (!bio) {
      return res.status(400).json({ message: "Bio field is required" });
    }

    let profile = await Profile.findOne({ order: [["createdAt", "DESC"]] });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    profile.bio = bio;
    await profile.save();

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      title,
      bio,
      email,
      phone,
      location,
      skills,
      socialLinks,
    } = req.body;

    let profile = await Profile.findOne({ order: [["createdAt", "DESC"]] });
    if (!profile) {
      if (!fullName || !title || !email) {
        return res.status(400).json({
          message:
            "Missing required fields (fullName, title, email) for new profile creation.",
        });
      }
      profile = new Profile({ fullName, title, email });
    }

    profile.fullName = fullName || profile.fullName;
    profile.title = title || profile.title;
    profile.bio = bio || profile.bio;
    profile.email = email || profile.email;
    profile.phone = phone || profile.phone;
    profile.location = location || profile.location;
    profile.skills = skills || profile.skills;
    profile.socialLinks = socialLinks || profile.socialLinks;

    if (req.files) {
      if (req.files.profileImage) {
        if (profile.profileImage) {
          await deleteImage(profile.profileImage);
        }
        profile.profileImage = await uploadImage(req.files.profileImage[0]);
      }
      if (req.files.coverImage) {
        if (profile.coverImage) {
          await deleteImage(profile.coverImage);
        }
        profile.coverImage = await uploadImage(req.files.coverImage[0]);
      }
      if (req.files.resume) {
        if (profile.resume) {
          await deleteImage(profile.resume);
        }
        profile.resume = await uploadImage(req.files.resume[0]);
      }
    }

    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update social links
exports.updateSocialLinks = async (req, res) => {
  try {
    const { socialLinks } = req.body;
    console.log("Received social links:", socialLinks);

    let profile = await Profile.findOne({ order: [["createdAt", "DESC"]] });

    if (!profile) {
      return res
        .status(404)
        .json({ message: "Profile not found to update social links." });
    }

    // Get current social links and ensure it's an object
    let currentSocialLinks = profile.socialLinks || {};
    if (typeof currentSocialLinks !== "object" || currentSocialLinks === null) {
      currentSocialLinks = {};
    }
    console.log("Current social links:", currentSocialLinks);

    // Create a completely new object to avoid reference issues
    const newSocialLinks = JSON.parse(JSON.stringify(currentSocialLinks));

    // Explicitly update each provided social link
    if (socialLinks) {
      Object.keys(socialLinks).forEach((platform) => {
        newSocialLinks[platform] = socialLinks[platform];
      });
    }

    console.log("Final social links:", newSocialLinks);

    // Update the profile instance
    profile.socialLinks = newSocialLinks;
    await profile.save();

    // Fetch the updated profile to confirm changes
    const updatedProfile = await Profile.findByPk(profile.id);
    console.log("Updated profile social links:", updatedProfile.socialLinks);

    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating social links:", error);
    res.status(500).json({ message: error.message });
  }
};
