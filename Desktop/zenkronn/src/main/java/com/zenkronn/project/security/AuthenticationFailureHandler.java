package com.zenkronn.project.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.web.context.request.RequestContextHolder;

/**
 * @author semih.erdem
 * 
 */

public class AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler
{
	private Logger log = Logger.getLogger(AuthenticationFailureHandler.class.getSimpleName());

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException
	{

		if (exception.getClass().isAssignableFrom(BadCredentialsException.class))
		{
			setDefaultFailureUrl("/login/badCredentials");
		}
		else if (exception.getClass().isAssignableFrom(CredentialsExpiredException.class))
		{
			setDefaultFailureUrl("/login/credentialsExpired");
		}
		else if (exception.getClass().isAssignableFrom(LockedException.class))
		{
			setDefaultFailureUrl("/login/accountLocked");
		}
		else if (exception.getClass().isAssignableFrom(DisabledException.class))
		{
			setDefaultFailureUrl("/login/accountDisabled");
		}
		super.onAuthenticationFailure(request, response, exception);
	}

}
