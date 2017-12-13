package com.zenkronn.project.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class UserManager
{
	public static boolean hasRole(String role)
	{
		boolean hasRole = false;
		UserDetails userDetails = getUserDetails();
		if (userDetails != null)
		{
			Collection<GrantedAuthority> authorities = (Collection<GrantedAuthority>) userDetails.getAuthorities();
			if (isRolePresent(authorities, role))
			{
				hasRole = true;
			}
		}
		return hasRole;
	}

	public static List<String> listRoles()
	{
		List<String> roles = new ArrayList<String>();

		UserDetails userDetails = getUserDetails();
		if (userDetails != null)
		{
			Collection<GrantedAuthority> authorities = (Collection<GrantedAuthority>) userDetails.getAuthorities();

			for (GrantedAuthority grantedAuthority : authorities)
			{
				roles.add(grantedAuthority.getAuthority());
			}
		}
		return roles;
	}

	/**
	 * Get info about currently logged in user
	 * 
	 * @return UserDetails if found in the context, null otherwise
	 */
	public static UserDetails getUserDetails()
	{
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		UserDetails userDetails = null;
		if (principal instanceof UserDetails)
		{
			userDetails = (UserDetails) principal;
		}
		return userDetails;
	}

	/**
	 * Check if a role is present in the authorities of current user
	 * 
	 * @param authorities all authorities assigned to current user
	 * @param role required authority
	 * @return true if role is present in list of authorities assigned to current user, false otherwise
	 */
	private static boolean isRolePresent(Collection<GrantedAuthority> authorities, String role)
	{
		boolean isRolePresent = false;
		for (GrantedAuthority grantedAuthority : authorities)
		{
			isRolePresent = grantedAuthority.getAuthority().equals(role);
			if (isRolePresent)
				break;
		}
		return isRolePresent;
	}
}