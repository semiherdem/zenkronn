package com.zenkronn.project.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.zenkronn.project.data.MembersDTO;
import com.zenkronn.project.datamodel.Members;
import com.zenkronn.project.service.InfrastructureManager;
import com.zenkronn.project.service.MembersDatabaseOperations;
import com.zenkronn.project.util.GeneralKeys;

@Controller
public class MembersController {

	@Autowired(required = true)
	private InfrastructureManager manager;

	@Autowired(required = true)
	private MembersDatabaseOperations membersDatabaseOperations;

	@RequestMapping(value = "/members", method = RequestMethod.GET)
	public ModelAndView membersList(HttpServletRequest request, HttpServletResponse response, Object handler) {
		ModelAndView view = new ModelAndView("ViewMembers");
		int page = ServletRequestUtils.getIntParameter(request, GeneralKeys.PAGE_COUNT, 0);
		int pageSize = ServletRequestUtils.getIntParameter(request, GeneralKeys.PAGE_SIZE, 100);
		String sortType = request.getParameter("sortType");
		String orderType = request.getParameter("orderType");
		String action = request.getParameter("act");
		if (action != null && action.equals("removeSelectedMember")) {
			String memberId = request.getParameter("memberId");
			if (memberId != null && !"".equals(memberId)) {
				membersDatabaseOperations.removeMemberFromList(memberId);
			}
		}

		List<MembersDTO> membersList = membersDatabaseOperations.getMembers(page, pageSize, sortType);

		view.addObject("membersList", membersList);
		view.addObject("page", page);
		view.addObject("pageSize", pageSize);
		view.addObject("listSize", membersDatabaseOperations.getMembersListCount());
		view.addObject("searchMenuList", manager.getMenuList("SearchMenu"));
		view.addObject("sortType", sortType);
		view.addObject("orderType", orderType);
		return view;
	}

	@RequestMapping(value = "/mutualFriends", method = RequestMethod.GET)
	public ModelAndView mutualFriendsList(HttpServletRequest request, HttpServletResponse response, Object handler) {
		ModelAndView view = new ModelAndView("ViewMutualFriends");
		String memberId = request.getParameter("memberId");
		List<MembersDTO> mutualFriendsList = membersDatabaseOperations.getMutualFriends(memberId);

		view.addObject("mutualFriendsList", mutualFriendsList);
		view.addObject("aplUserInfo", membersDatabaseOperations.getAplUserInfo());
		view.addObject("memberInfo", membersDatabaseOperations.findMemberById(memberId));
		view.addObject("searchMenuList", manager.getMenuList("SearchMenu"));
		return view;
	}

}
