package com.zenkronn.project.data;

import java.util.Date;

public class MembersDTO {
	
	private Integer id;
	private String name;
	private String surname;
	private String username;
	private boolean inList;
	private Date friendshipDate;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public boolean isInList() {
		return inList;
	}
	public void setInList(boolean inList) {
		this.inList = inList;
	}
	public Date getFriendshipDate() {
		return friendshipDate;
	}
	public void setFriendshipDate(Date friendshipDate) {
		this.friendshipDate = friendshipDate;
	}

}
