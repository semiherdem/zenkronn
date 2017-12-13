package com.zenkronn.project.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.preauth.j2ee.J2eePreAuthenticatedProcessingFilter;

public class AuthenticationListener extends J2eePreAuthenticatedProcessingFilter
{
	private Logger log = Logger.getLogger(AuthenticationListener.class.getSimpleName());

	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			Authentication authResult)
	{

		try
		{
			super.successfulAuthentication(request, response, authResult);
		}
		catch (Exception e)
		{
			log.error("EXCEPTION : ", e);
		}

	}
}
