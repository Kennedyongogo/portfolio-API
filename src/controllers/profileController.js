const Profile = require("../models/Profile");
const { uploadImage, deleteImage } = require("../utils/imageUpload");

// Get profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne().sort({ createdAt: -1 });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, title, bio, email, phone, location, skills, socialLinks } =
      req.body;

    let profile = await Profile.findOne().sort({ createdAt: -1 });
    if (!profile) {
      profile = new Profile();
    }

    // Update basic info
    profile.name = name || profile.name;
    profile.title = title || profile.title;
    profile.bio = bio || profile.bio;
    profile.email = email || profile.email;
    profile.phone = phone || profile.phone;
    profile.location = location || profile.location;
    profile.skills = skills || profile.skills;
    profile.socialLinks = socialLinks || profile.socialLinks;

    // Handle file uploads
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
    let profile = await Profile.findOne().sort({ createdAt: -1 });
    if (!profile) {
      profile = new Profile();
    }
    profile.socialLinks = socialLinks;
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
