import Users from "../../models/User.js";
import Attendance from "../../models/Attendance.js";


// Controller function to mark attendance
export const markAttendance = async (req, res) => {
    const { userId, status } = req.body;
    const currentDate = new Date(); // Get current date and time
  
    try {
        // Check if the user exists
        const user = await Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
  
        // Extract date in 'YYYY-MM-DD' format
        const date = currentDate.toISOString().split('T')[0];
  
        // Create attendance record
        const attendance = await Attendance.create({ userId, date, status });
  
        // Send success response
        return res.status(201).json({ message: 'Attendance marked successfully', attendance });
    } catch (error) {
        // Handle Sequelize validation errors
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => err.message);
            return res.status(400).json({ error: 'Validation error', validationErrors });
        }
      
        // Handle other errors
        console.error('Error marking attendance:', error);
        return res.status(500).json({ error: 'Failed to mark attendance' });
    }
};


// Controller function to get attendance for a user
export const getUserAttendance = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find all attendance records for the user
    const userAttendance = await Attendance.findAll({ where: { userId } });

    // Send success response with the user's attendance records
    return res.status(200).json({ userAttendance });
  } catch (error) {
    // Handle errors
    console.error('Error fetching user attendance:', error);
    return res.status(500).json({ error: 'Failed to fetch user attendance' });
  }
};

