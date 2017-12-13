package com.zenkronn.project.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.zenkronn.project.data.MembersDTO;
import com.zenkronn.project.datamodel.Members;
import com.zenkronn.project.service.CrossTableDatabaseOperations;
import com.zenkronn.project.service.InfrastructureManager;
import com.zenkronn.project.service.MembersDatabaseOperations;
import com.zenkronn.project.util.GeneralKeys;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	@Autowired(required = true)
	private InfrastructureManager manager;
	
	@Autowired(required = true)
	private MembersDatabaseOperations membersDatabaseOperations;
	
	@Autowired(required = true)
	private CrossTableDatabaseOperations crossTableDatabaseOperations;
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public ModelAndView login()
	{
		ModelAndView modelAndView = new ModelAndView("Login");
		return modelAndView;
	}
	
	@RequestMapping(value = "/views/logout", method = RequestMethod.GET)
	public String logout(HttpServletRequest request, HttpServletResponse response)
	{
		request.getSession().invalidate();
		return "redirect:/";
	}
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView home(HttpServletRequest request, HttpServletResponse response, Object handler)
	{
		ModelAndView view = new ModelAndView("ViewMainFrame");
		int page = ServletRequestUtils.getIntParameter(request, GeneralKeys.PAGE_COUNT, 0);
		int pageSize = ServletRequestUtils.getIntParameter(request, GeneralKeys.PAGE_SIZE, 100);
		
		String action = request.getParameter("act");
		if(action != null && action.equals("removeSelectedMember")) {
			String memberId = request.getParameter("memberId");
			if(memberId != null && !"".equals(memberId))
			{
				membersDatabaseOperations.removeMemberFromList(memberId);
			}
		}
		else if(action != null && action.equals("addToFriendshipList"))
		{
			String memberId = request.getParameter("memberId");
			if (memberId != null && !"".equals(memberId)) {
				crossTableDatabaseOperations.addToFriendshipList(memberId);
			}
		}
		
		List<MembersDTO> membersList = membersDatabaseOperations.getAllMembersDTO(page, pageSize);
		
		view.addObject("membersList", membersList);
		view.addObject("page", page);
		view.addObject("pageSize", pageSize);
		view.addObject("listSize", membersDatabaseOperations.getAllMembersListCount());
		view.addObject("searchMenuList", manager.getMenuList("SearchMenu"));		
		return view;
	}
	
	@RequestMapping(value = "/help", method = RequestMethod.GET)
	public ModelAndView help()
	{
		ModelAndView modelAndView = new ModelAndView("Help");
		return modelAndView;
	}
	
	@RequestMapping(value = "/login/{error}", method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView loginForm(@PathVariable String error)
	{
		ModelAndView modelAndView = new ModelAndView("Login");
		modelAndView.addObject("error", error);
		return modelAndView;
	}
	
}
