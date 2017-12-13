package com.zenkronn.project.service;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.stereotype.Component;

import com.zenkronn.project.datamodel.AplUser;
import com.zenkronn.project.security.UserManager;
import com.zenkronn.project.util.HibernateUtils;

@Component
public class AplUserDatabaseOperations {

	public AplUser findByUsername() {
		Session session = null;
		List<AplUser> resultList = null;
		try {
			session = HibernateUtils.getSessionFactory().openSession();
			String queryString = "SELECT aplUser FROM AplUser aplUser where aplUser.userName=:userName";
			Query query = session.createQuery(queryString);
			query.setParameter("userName", UserManager.getUserDetails().getUsername());
			resultList = query.list();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}

		return resultList.get(0);
	}

}
