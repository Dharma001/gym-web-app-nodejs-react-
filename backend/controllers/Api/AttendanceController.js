import Users from "../../models/User.js";
import User from "../../models/User.js";
import Attendance from "../../models/Attendance.js";

export const createAttendanceForCurrentDate = async (req, res) => {
  try {
      const { date } = req.body;
      if (!date || isNaN(Date.parse(date))) {
          return res.status(400).json({ error: 'Invalid date format' });
      }

      const users = await Users.findAll();

      for (const user of users) {
          const existingAttendance = await Attendance.findOne({ where: { user_id: user.id, date } });
          if (!existingAttendance) {
              await Attendance.create({ user_id: user.id, date, status: 'Absent' });
          }
      }

      return res.status(201).json({ message: 'Attendance records created successfully for the provided date' });
  } catch (error) {
      console.error('Error creating attendance records:', error);
      return res.status(500).json({ error: 'Failed to create attendance records' });
  }
};

export const getAllAttendanceWithUsers = async (req, res) => {
  try {
    const attendance = await Attendance.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'phone', 'memberId', 'email'] },
      ],
    });

    res.json(attendance);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to fetch attendance records" });
  }
}
export const updateAttendanceStatus = async (req, res) => {
  try {
    const { id } = req.params; 
    const { status } = req.body;

    if (!status || (status !== 'Present' && status !== 'Absent' && status !== 'Late')) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const attendance = await Attendance.findByPk(id);
    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }

    attendance.status = status;
    await attendance.save();

    return res.json({ message: 'Attendance record updated successfully' });
  } catch (error) {
    console.error('Error updating attendance record:', error);
    return res.status(500).json({ error: 'Failed to update attendance record' });
  }
};