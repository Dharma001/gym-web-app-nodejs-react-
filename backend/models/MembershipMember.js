import { Sequelize } from 'sequelize';
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const MembershipMember = db.define('membership_members', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: { 
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  membership_id: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  pay_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  due_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  tableName: 'membership_members',
  timestamps: true,
  underscored: true
});


export default MembershipMember;
