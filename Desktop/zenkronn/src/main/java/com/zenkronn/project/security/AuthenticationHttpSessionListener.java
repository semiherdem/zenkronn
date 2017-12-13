package com.zenkronn.project.security;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import org.apache.log4j.Logger;

/**
 * @author semih.erdem
 * 
 */

public class AuthenticationHttpSessionListener implements HttpSessionListener
{
	private Logger log = Logger.getLogger(AuthenticationHttpSessionListener.class.getSimpleName());

	public AuthenticationHttpSessionListener()
	{
		// TODO Auto-generated constructor stub
	}

	@Override
	public void sessionCreated(HttpSessionEvent se)
	{
		HttpSession httpSession = se.getSession();
		log.info("start.");
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent se)
	{
		HttpSession httpSession = se.getSession();
		log.info("start.");
	}
}
