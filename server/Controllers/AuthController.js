const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    // Generate email verification token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const url = `${process.env.CLIENT_URL}/verify/${token}`;

    // Send verification email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Verify your email",
      html: `<p>Please click the link to verify your email:</p><a href="${url}">${url}</a>`,
    });

    res.status(200).json({ message: "Registration successful! Please check your email to verify." });
  } catch (error) {
    res.status(500).json({ error: "Registration failed!" });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(400).json({ error: "Invalid link" });

    user.isVerified = true;
    await user.save();
    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Verification failed!" });
  }
};


const login = async (req , res) =>{
    try{
        // (req.token) ; 
        const {email , password} = req.body ; 
        const user = await UserModel.findOne({email}) ; 
        const errorMsg = "Auth failed email or password is wrong"
        if(!user){
            return res.status(409)
            .json({message : errorMsg , success : false}) ; 
        }

        const val = await bcrypt.hash(password , 10) ;

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error("Error comparing password:", err);
            } else if (isMatch) {
                console.log("Password match! User is authenticated.");
            } else {
                console.log("Password does not match. Authentication failed.");
            }
        });
        const isPassEqual = await bcrypt.compare(password , user.password) ; 


        if(!isPassEqual){
            return res.status(409)
            .json({message : errorMsg , success : false}) ; 
        }

        const jwtToken = jwt.sign(
            {email : user.email , _id : user._id} ,
            process.env.JWT_SECRET , 
            {expiresIn : '24h'}
        )

        res.status(200)
        .json({
            message : "Login Success" ,
            success : true,
            jwtToken , 
            email , 
            name : user.name
        })

       
    }
    catch(err){
        res.status(500)
            .json({
                message : "Internal server error" , 
                success : false 
            })
    }
}





module.exports = {
    signup , 
    login 
}
