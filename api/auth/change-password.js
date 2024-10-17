app.post('/api/auth/change-password', async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user.id;
  
    try {
      const user = await User.findById(userId);
      
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Old password is incorrect' });
      }
  
      
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();
  
      return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  });
  