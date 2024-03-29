import Sequelize from 'sequelize';
import db from "../config/Database.js";

const Attendance = db.define('Attendance', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: { 
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('Present', 'Absent', 'Late'), 
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  tableName: 'attendance',
  timestamps: true,
  underscored: true
});

export default Attendance;
