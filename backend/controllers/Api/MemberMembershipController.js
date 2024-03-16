import MembershipMember from '../../models/MembershipMember.js';
import User from '../../models/User.js'
import Membership from '../../models/Membership.js';
export const createMembershipMember = async (req, res) => {
  try {
    const { user_id, membership_id, start_date, pay_amount } = req.body;
    const membership = await Membership.findByPk(membership_id);

    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    const durationInDays = membership.duration;
    const end_date = new Date(start_date);
    end_date.setDate(end_date.getDate() + durationInDays);

    const due_amount = membership.price - pay_amount;

    const membershipMember = await MembershipMember.create({
      user_id, 
      start_date,
      end_date,
      membership_id,
      pay_amount,
      due_amount
    });

    res.status(201).json({ message: 'Membership member created successfully', membershipMember });
  } catch (error) {
    console.error('Error creating membership member:', error);
    res.status(500).json({ message: 'Failed to create membership member' });
  }
};

export const getAllMembershipMembers = async (req, res) => {
  try {
    const membershipMembers = await MembershipMember.findAll({
      include: [
        { model: User, attributes: ['id', 'name'] },
        { model: Membership, attributes: ['id', 'name'] }
      ]
    });

    res.json(membershipMembers);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to fetch membership members" });
  }
};


export const getMembershipMemberById = async (req, res) => {
  const { id } = req.params;
  try {
    const membershipMember = await MembershipMember.findByPk(id, {
      include: [User, Membership]
    });

    if (!membershipMember) {
      return res.status(404).json({ message: 'Membership member not found' });
    }

    res.json(membershipMember);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to fetch membership member' });
  }
};

export const updateMembershipMemberById = async (req, res) => {
  const { id } = req.params;
  const { pay_amount } = req.body;

  try {
    const membershipMember = await MembershipMember.findByPk(id);

    if (!membershipMember) {
      return res.status(404).json({ message: 'Membership member not found' });
    }

    const due_amount = membershipMember.Membership.price - pay_amount;

    await membershipMember.update({ pay_amount, due_amount });

    res.json({ message: 'Membership member updated successfully', membershipMember });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to update membership member' });
  }
};

export const deleteMembershipMemberById = async (req, res) => {
  const { id } = req.params;
  try {
    const membershipMember = await MembershipMember.findByPk(id);

    if (!membershipMember) {
      return res.status(404).json({ message: 'Membership member not found' });
    }

    await membershipMember.destroy();

    res.json({ message: 'Membership member deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to delete membership member' });
  }
};
