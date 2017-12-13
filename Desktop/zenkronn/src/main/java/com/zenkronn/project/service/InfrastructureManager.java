package com.zenkronn.project.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import javax.naming.Context;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.zenkronn.project.data.MenuDO;


/**
 * @author ugur.gemici, semih.erdem
 * 
 */

@org.springframework.stereotype.Component
public class InfrastructureManager
{

	public List<MenuDO> getMenuList(String menuName)
	{
		
		List<MenuDO> menuList = new ArrayList<MenuDO>();

		String[] menuLabelsList = {"Users", "Members"};
		String[] menuLinksList = {"", "members"};

		for (int i = 0; i < menuLabelsList.length; i++)
		{
			String menuLabel = menuLabelsList[i];
			String menuLink = menuLinksList[i];
			MenuDO menuData = new MenuDO();
			menuData.setDisplayName(menuLabel.trim());
			menuData.setLink(menuLink.trim());
			menuList.add(menuData);

		}
		return menuList;
	}

	
	

}
