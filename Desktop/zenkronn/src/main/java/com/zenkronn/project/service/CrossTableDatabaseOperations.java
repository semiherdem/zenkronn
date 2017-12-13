package com.zenkronn.project.service;

import java.util.Date;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.zenkronn.project.datamodel.AplUser;
import com.zenkronn.project.datamodel.CrossTable;
import com.zenkronn.project.util.HibernateUtils;

@Component
public class CrossTableDatabaseOperations {

	@Autowired
	AplUserDatabaseOperations aplUserDatabaseOperations;

	public void addToFriendshipList(String memberId) {
		Session session = null;
		Transaction tx;
		try {
			session = HibernateUtils.getSessionFactory().openSession();
			tx = session.beginTransaction();
			AplUser aplUser = aplUserDatabaseOperations.findByUsername();
			CrossTable crossTable = new CrossTable();
			crossTable.setAplUserId(aplUser.getId());
			crossTable.setMembersId(new Integer(memberId));
			crossTable.setFriendshipDate(new Date());
			session.save(crossTable);
			tx.commit();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}

	}

}
