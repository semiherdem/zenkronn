package com.zenkronn.project.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.zenkronn.project.data.MembersDTO;
import com.zenkronn.project.datamodel.AplUser;
import com.zenkronn.project.datamodel.Members;
import com.zenkronn.project.security.UserManager;
import com.zenkronn.project.util.HibernateUtils;

@Component
public class MembersDatabaseOperations {

	@Autowired
	AplUserDatabaseOperations aplUserDatabaseOperations;

	public int getAllMembersListCount() {
		Session session = null;
		List<Long> resultList = null;
		try {
			session = HibernateUtils.getSessionFactory().openSession();
			String queryString = "SELECT COUNT(members) FROM Members members";
			Query query = session.createQuery(queryString);
			resultList = query.list();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}

		return resultList.get(0).intValue();
	}

	public List<Members> getAllMembersList(int page, int pageSize) {
		Session session = null;
		List<Members> resultList = null;
		try {
			session = HibernateUtils.getSessionFactory().openSession();
			String queryString = "SELECT members FROM Members members where members.username!=:nonMember";
			Query query = session.createQuery(queryString);
			query.setParameter("nonMember", UserManager.getUserDetails().getUsername());
			query.setFirstResult(page * pageSize);
			query.setMaxResults(pageSize);
			resultList = query.list();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}

		return resultList;
	}

	public List<MembersDTO> getAllMembersDTO(int page, int pageSize) {
		List<MembersDTO> resultList = null;
		try {
			resultList = new ArrayList<MembersDTO>();
			List<Members> membersList = getAllMembersList(page, pageSize);
			for (Members member : membersList) {
				MembersDTO dto = new MembersDTO();
				dto.setId(member.getId());
				dto.setName(member.getName());
				dto.setSurname(member.getSurname());
				dto.setUsername(member.getUsername());
				dto.setInList(isInList(member.getId()));
				resultList.add(dto);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return resultList;
	}

	private boolean isInList(Integer memberId) {
		Session session = null;
		Long result = null;
		try {
			session = HibernateUtils.getSessionFactory().openSession();
			AplUser aplUser = aplUserDatabaseOperations.findByUsername();
			String queryString = "Select count(ct.id)  from CrossTable ct where ct.membersId=:membersId and ct.aplUserId=:aplUserId";
			Query query = session.createQuery(queryString);
			query.setParameter("membersId", memberId);
			query.setParameter("aplUserId", aplUser.getId());
			result = (Long) query.list().get(0);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		if (result.intValue() > 0)
			return true;
		else
			return false;
	}

	public List<MembersDTO> getMembers(int page, int pageSize, String sortType) {
		Session session = null;
		List<MembersDTO> resultList = null;
		List<Object[]> list = null;
		try {
			resultList = new ArrayList<MembersDTO>();
			session = HibernateUtils.getSessionFactory().openSession();
			String queryString = "SELECT m.id, m.name, m.surname, m.username, ct.friendshipDate FROM  AplUser u, Members m, CrossTable ct where u.userName=:username"
					+ " and u.id = ct.aplUserId and ct.membersId = m.id";
			if (sortType != null && !"".equals(sortType)) {
				queryString = queryString + " order by ct.friendshipDate " + sortType;
			}
			Query query = session.createQuery(queryString);
			query.setParameter("username", UserManager.getUserDetails().getUsername());
			query.setFirstResult(page * pageSize);
			query.setMaxResults(pageSize);
			list = query.list();

			for (Object[] item : list) {
				MembersDTO dto = new MembersDTO();
				dto.setId((Integer) item[0]);
				dto.setName((String) item[1]);
				dto.setSurname((String) item[2]);
				dto.setUsername((String) item[3]);
				dto.setFriendshipDate((Date) item[4]);
				resultList.add(dto);
			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}

		return resultList;
	}

	public int getMembersListCount() {
		Session session = null;
		List<Long> resultList = null;
		try {

			session = HibernateUtils.getSessionFactory().openSession();
			String queryString = "SELECT COUNT(members.id) FROM Members members, CrossTable ct where members.username=:username and members.id = ct.membersId";
			Query query = session.createQuery(queryString);
			query.setParameter("username", UserManager.getUserDetails().getUsername());
			resultList = query.list();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}

		return resultList.get(0).intValue();
	}

	public void removeMemberFromList(String memberId) {
		Session session = null;
		Transaction tx;
		try {
			session = HibernateUtils.getSessionFactory().openSession();
			tx = session.beginTransaction();
			AplUser aplUser = aplUserDatabaseOperations.findByUsername();
			String queryString = "delete from CrossTable ct where ct.membersId=:membersId AND aplUserId=:aplUserId";
			Query query = session.createQuery(queryString);
			query.setParameter("membersId", new Integer(memberId));
			query.setParameter("aplUserId", aplUser.getId());
			query.executeUpdate();
			tx.commit();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}

	}

	public List<MembersDTO> getMutualFriends(String memberId) {

		Session session = null;
		Members result = null;
		List<MembersDTO> resultList = null;
		try {
			resultList = new ArrayList<MembersDTO>();
			AplUser aplUser = aplUserDatabaseOperations.findByUsername();
			Members members = findMemberById(memberId);
			session = HibernateUtils.getSessionFactory().openSession();
			String queryString = "SELECT m.id, m.name, m.surname, m.username, ct.friendshipDate FROM  AplUser u, Members m, CrossTable ct where u.userName=:aplUser"
					+ " and u.id = ct.aplUserId and ct.membersId = m.id AND m.id IN (SELECT m1.id FROM  AplUser u1, Members m1, CrossTable ct1 where u1.userName=:selectedUser and u1.id = ct1.aplUserId and ct1.membersId = m1.id )  ";
			Query query = session.createQuery(queryString);
			query.setParameter("aplUser", aplUser.getUserName());
			query.setParameter("selectedUser", members.getUsername());
			List<Object[]> list = query.list();
			
			for (Object[] item : list) {
				MembersDTO dto = new MembersDTO();
				dto.setId((Integer) item[0]);
				dto.setName((String) item[1]);
				dto.setSurname((String) item[2]);
				dto.setUsername((String) item[3]);
				dto.setFriendshipDate((Date) item[4]);
				resultList.add(dto);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		
		return resultList;
	}

	public Members getAplUserInfo() {
		Session session = null;
		Members result = null;
		try {
			AplUser aplUser = aplUserDatabaseOperations.findByUsername();
			session = HibernateUtils.getSessionFactory().openSession();
			String queryString = "SELECT m FROM Members m where m.username=:username";
			Query query = session.createQuery(queryString);
			query.setParameter("username", aplUser.getUserName());
			result = (Members) query.list().get(0);

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return result;

	}

	public Members findMemberById(String memberId) {
		Session session = null;
		Members result = null;
		try {
			session = HibernateUtils.getSessionFactory().openSession();
			result = (Members) session.get(Members.class, Integer.valueOf(memberId));
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return result;
	}

}
